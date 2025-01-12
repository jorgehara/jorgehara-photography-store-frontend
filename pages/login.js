import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push('/gallery'); // Redirige a la galería después del login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Iniciar Sesión
        </h2>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default LoginPage; 