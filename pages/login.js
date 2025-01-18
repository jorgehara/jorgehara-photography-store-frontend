// jorgehara-photography-store-frontend/pages/login.js
import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push('/gallery'); // Redirige a la galería después del login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Bienvenido a StarFotto! 👋
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Por favor, inicia sesión en tu cuenta y comienza la aventura
        </p>
        
        <LoginForm onLoginSuccess={handleLoginSuccess} />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Recuérdame
            </label>
          </div>
          <a href="/recover-password" className="text-sm font-medium text-purple-600 hover:text-purple-500">
            Olvidé mi contraseña?
          </a>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            No tienes una cuenta?{' '}
            <a href="/register" className="text-purple-600 hover:text-purple-500 font-medium">
              Crea una cuenta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;