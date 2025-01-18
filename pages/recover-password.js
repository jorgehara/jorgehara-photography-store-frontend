// jorgehara-photography-store-frontend/pages/recover-password.js
import React, { useState } from 'react';
import axios from '../lib/axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const RecoverPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/recover-password', { email });
      setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar el enlace de recuperación.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Recuperar Contraseña
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Ingresa tu correo electrónico para recibir un enlace de recuperación.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Enviar enlace de recuperación
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Regresar a{' '}
            <Link href="/login" className="text-purple-600 hover:text-purple-500 font-medium">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;