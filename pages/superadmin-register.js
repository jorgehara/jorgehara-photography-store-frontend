// jorgehara-photography-store-frontend/pages/superadmin-register.js
import React, { useState } from 'react';
import axios from '../lib/axios';
import { useRouter } from 'next/router';

const SuperAdminRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', {
        ...formData,
        roles: ['superadmin'], // Asignar el rol de superadministrador
      });
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        router.push('/'); // Redirigir a la página principal o donde desees
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el superadministrador');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Crear Superadministrador
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Superadministrador creado exitosamente!</p>}
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre de usuario</label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">País</label>
            <input
              name="country"
              type="text"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Crear Superadministrador
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminRegister;