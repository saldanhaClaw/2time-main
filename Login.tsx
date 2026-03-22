
'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from './supabase';
import {
  Ripple,
  AuthTabs,
  TechOrbitDisplay
} from './components/ui/modern-animated-sign-in';
import { ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const iconsArray = [
  {
    component: () => (
      <img
        width={30}
        height={30}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg'
        alt='HTML5'
      />
    ),
    className: 'size-[30px] border-none bg-transparent',
    duration: 20,
    delay: 20,
    radius: 100,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={30}
        height={30}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg'
        alt='CSS3'
      />
    ),
    className: 'size-[30px] border-none bg-transparent',
    duration: 20,
    delay: 10,
    radius: 100,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={50}
        height={50}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg'
        alt='TypeScript'
      />
    ),
    className: 'size-[50px] border-none bg-transparent',
    radius: 210,
    duration: 20,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={50}
        height={50}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'
        alt='JavaScript'
      />
    ),
    className: 'size-[50px] border-none bg-transparent',
    radius: 210,
    duration: 20,
    delay: 20,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={30}
        height={30}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'
        alt='TailwindCSS'
      />
    ),
    className: 'size-[30px] border-none bg-transparent',
    duration: 20,
    delay: 20,
    radius: 150,
    path: false,
    reverse: true,
  },
  {
    component: () => (
      <img
        width={30}
        height={30}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'
        alt='React'
      />
    ),
    className: 'size-[30px] border-none bg-transparent',
    duration: 20,
    delay: 10,
    radius: 150,
    path: false,
    reverse: true,
  },
  {
    component: () => (
      <img
        width={50}
        height={50}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg'
        alt='Supabase'
      />
    ),
    className: 'size-[50px] border-none bg-transparent',
    radius: 270,
    duration: 20,
    path: false,
    reverse: true,
  },
  {
    component: () => (
      <img
        width={50}
        height={50}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg'
        alt='Figma'
      />
    ),
    className: 'size-[50px] border-none bg-transparent',
    radius: 270,
    duration: 20,
    delay: 60,
    path: false,
    reverse: true,
  },
  {
    component: () => (
      <img
        width={50}
        height={50}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg'
        alt='Git'
      />
    ),
    className: 'size-[50px] border-none bg-transparent',
    radius: 320,
    duration: 20,
    delay: 20,
    path: false,
    reverse: false,
  },
];

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      onLoginSuccess();
    }
    setLoading(false);
  };

  const formFields = {
    header: 'Bem-vindo de volta',
    subHeader: 'Acesse o painel de controle da 2TimeWeb',
    fields: [
      {
        label: 'Email',
        required: true,
        type: 'email' as const,
        placeholder: 'seu@email.com',
        onChange: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      },
      {
        label: 'Senha',
        required: true,
        type: 'password' as const,
        placeholder: '••••••••',
        onChange: (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
      },
    ],
    submitButton: loading ? 'Carregando...' : 'Entrar no Sistema',
    textVariantButton: 'Esqueceu sua senha?',
    errorField: error || undefined
  };

  return (
    <div className="dark min-h-screen bg-background overflow-hidden relative">
      <button
        onClick={() => window.location.href = '/'}
        className="absolute top-8 left-8 z-[100] flex items-center gap-2 text-gray-500 hover:text-white transition-all text-sm font-bold"
      >
        <ArrowLeft size={16} /> Voltar ao Site
      </button>

      <section className='flex h-screen items-center justify-center'>
        {/* Left Side - Orbiting Icons */}
        <div className='hidden lg:flex flex-col justify-center w-1/2 h-full relative border-r border-white/5'>
          <Ripple mainCircleSize={120} className="w-full h-full opacity-50" />
          <TechOrbitDisplay iconsArray={iconsArray} text="2TIMEWEB" />
        </div>

        {/* Right Side - Login Form */}
        <div className='w-full lg:w-1/2 h-full flex flex-col justify-center items-center px-6'>
          <AuthTabs
            formFields={formFields}
            goTo={() => alert('Recuperação de senha não configurada.')}
            handleSubmit={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default Login;
