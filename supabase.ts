
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bqxeivsnqmbfdrbxkjwj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxeGVpdnNucW1iZmRyYnhrandqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1Nzc5MDQsImV4cCI6MjA4MjE1MzkwNH0.u1rPFSgoV4fsKWWvMMjVTH3bliM9OX3QIenvJ1S6aC0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
