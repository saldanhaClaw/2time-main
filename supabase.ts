// Neon-powered data layer — compatible with Supabase query patterns
// Drop-in replacement: import { supabase } from './supabase' → import { supabase } from './supabase'
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:npg_6CuNlkeVUrD9@ep-cool-morning-ac6lqq9i-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(DATABASE_URL);

// Helper: run a query and return rows array
// IMPORTANT: Use sql.query() for raw SQL strings, NOT tagged template literals.
// Tagged templates (sql`...`) treat interpolated values as parameters, not SQL.
async function runQuery(query: string, params: any[] = []): Promise<any[]> {
  try {
    const result: any = await (sql as any).query(query, params);
    return result?.rows ?? result ?? [];
  } catch (e: any) {
    console.error('[Neon runQuery] Error:', e.message, '| Query:', query.substring(0, 100));
    return [];
  }
}

// --- Admin credentials ---
const ADMIN_EMAIL = 'admin@2timeweb.com';
const ADMIN_PASSWORD = '2Time@Adm2026';

const SESSION_KEY = '2tw_session';

function getStoredSession() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function setStoredSession(session: any) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearStoredSession() {
  localStorage.removeItem(SESSION_KEY);
}

// --- Auth with real credential validation ---
const authStub = {
  getSession: () => {
    const session = getStoredSession();
    return Promise.resolve({ data: { session } });
  },
  onAuthStateChange: (_event: string, callback: any) => {
    const session = getStoredSession();
    if (session) {
      setTimeout(() => callback('SIGNED_IN', session), 0);
    } else {
      setTimeout(() => callback('SIGNED_OUT', null), 0);
    }
    return { data: { subscription: { unsubscribe: () => {} } } };
  },
  signInWithPassword: (creds: { email: string; password: string }) => {
    if (creds.email === ADMIN_EMAIL && creds.password === ADMIN_PASSWORD) {
      const session = { user: { email: ADMIN_EMAIL } };
      setStoredSession(session);
      return Promise.resolve({ data: { session }, error: null });
    }
    return Promise.resolve({ data: { session: null }, error: { message: 'Invalid email or password.' } });
  },
  signOut: () => {
    clearStoredSession();
    return Promise.resolve({ error: null });
  },
};

// --- Query builder that mimics Supabase's .from().select().insert().update().delete() ---
class QueryBuilder {
  private table: string;
  private operation: 'select' | 'insert' | 'update' | 'delete' | 'upsert' = 'select';
  private selectCols = '*';
  private filters: string[] = [];
  private filterValues: any[] = [];
  private orderCol?: string;
  private orderAsc = true;
  private insertData: any = null;
  private updateData: any = null;
  private upsertData: any = null;
  private isSingle = false;
  private returnData = false;

  constructor(table: string) {
    this.table = table;
  }

  select(cols = '*') {
    this.operation = 'select';
    this.selectCols = cols;
    return this;
  }

  insert(data: any | any[]) {
    this.operation = 'insert';
    this.insertData = Array.isArray(data) ? data : [data];
    this.returnData = true;
    return this;
  }

  update(data: any) {
    this.operation = 'update';
    this.updateData = data;
    this.returnData = true;
    return this;
  }

  delete() {
    this.operation = 'delete';
    return this;
  }

  upsert(data: any | any[]) {
    this.operation = 'upsert';
    this.upsertData = Array.isArray(data) ? data : [data];
    this.returnData = true;
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push(`"${column}" = $${this.filterValues.length + 1}`);
    this.filterValues.push(value);
    return this;
  }

  order(column: string, opts?: { ascending?: boolean }) {
    this.orderCol = column;
    this.orderAsc = opts?.ascending ?? true;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  // Chainable .select() after .insert()/.update()
  private buildWhere(): string {
    return this.filters.length > 0 ? ` WHERE ${this.filters.join(' AND ')}` : '';
  }

  async then(resolve: (v: any) => void, reject?: (e: any) => void) {
    try {
      const result = await this.execute();
      resolve(result);
    } catch (e) {
      if (reject) reject(e);
      else resolve({ data: null, error: e });
    }
  }

  private async execute(): Promise<{ data: any; error: any }> {
    try {
      let rows: any[];

      switch (this.operation) {
        case 'select': {
          const orderStr = this.orderCol ? ` ORDER BY "${this.orderCol}" ${this.orderAsc ? 'ASC' : 'DESC'}` : '';
          const query = `SELECT ${this.selectCols} FROM "${this.table}"${this.buildWhere()}${orderStr}`;
          rows = await runQuery(query, this.filterValues);
          if (this.isSingle) return { data: rows[0] || null, error: null };
          return { data: rows, error: null };
        }

        case 'insert': {
          const allRows: any[] = [];
          for (const item of this.insertData!) {
            const keys = Object.keys(item);
            const cols = keys.map(k => `"${k}"`).join(', ');
            const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
            const vals = keys.map(k => k === 'value' && typeof item[k] === 'object' ? JSON.stringify(item[k]) : item[k]);
            const q = `INSERT INTO "${this.table}" (${cols}) VALUES (${placeholders}) RETURNING *`;
            const r = await runQuery(q, vals);
            allRows.push(...r);
          }
          if (this.isSingle) return { data: allRows[0] || null, error: null };
          return { data: allRows, error: null };
        }

        case 'update': {
          const keys = Object.keys(this.updateData!);
          const setClauses = keys.map((k, i) => `"${k}" = $${i + 1}`).join(', ');
          const vals = keys.map(k => k === 'value' && typeof this.updateData![k] === 'object' ? JSON.stringify(this.updateData![k]) : this.updateData![k]);
          // Offset filter placeholders
          const whereStr = this.filters.map((f, i) => {
            const original = `$${i + 1}`;
            const newPlaceholder = `$${keys.length + i + 1}`;
            return f.replace(original, newPlaceholder);
          }).join(' AND ');
          const allVals = [...vals, ...this.filterValues];
          const whereClause = whereStr ? ` WHERE ${whereStr}` : '';
          const q = `UPDATE "${this.table}" SET ${setClauses}${whereClause} RETURNING *`;
          rows = await runQuery(q, allVals);
          if (this.isSingle) return { data: rows[0] || null, error: null };
          return { data: rows, error: null };
        }

        case 'upsert': {
          const allRows: any[] = [];
          for (const item of this.upsertData!) {
            const keys = Object.keys(item);
            const cols = keys.map(k => `"${k}"`).join(', ');
            const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
            const updateSet = keys.filter(k => k !== 'id').map((k, i) => `"${k}" = EXCLUDED."${k}"`).join(', ');
            const vals = keys.map(k => k === 'value' && typeof item[k] === 'object' ? JSON.stringify(item[k]) : item[k]);
            const q = `INSERT INTO "${this.table}" (${cols}) VALUES (${placeholders}) ON CONFLICT (id) DO UPDATE SET ${updateSet} RETURNING *`;
            const r = await runQuery(q, vals);
            allRows.push(...r);
          }
          return { data: allRows, error: null };
        }

        case 'delete': {
          const q = `DELETE FROM "${this.table}"${this.buildWhere()} RETURNING *`;
          rows = await runQuery(q, this.filterValues);
          return { data: rows, error: null };
        }

        default:
          return { data: null, error: 'Unknown operation' };
      }
    } catch (error: any) {
      console.error(`[Neon] Error on ${this.operation} ${this.table}:`, error.message);
      return { data: null, error };
    }
  }
}

// --- Main export: same shape as Supabase client ---
export const supabase = {
  auth: authStub,
  from: (table: string) => new QueryBuilder(table),
};
