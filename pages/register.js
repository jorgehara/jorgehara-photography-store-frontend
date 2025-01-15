import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from '../lib/axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    userType: '', // 'photographer' o 'buyer'
    acceptTerms: false
  });
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Estado para el popup

  // Prellenar datos si el usuario se registra con Google
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        fullName: session.user.name || '',
        email: session.user.email || '',
      }));
    }
  }, [session]);
  
  const countries = [
    { value: 'AR', label: 'Argentina' },
    { value: 'BR', label: 'Brasil' },
    { value: 'CL', label: 'Chile' },
    { value: 'UY', label: 'Uruguay' },
    // Añade más países según necesites
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await axios.post('/auth/register', {
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        country: formData.country,
        role: formData.userType === 'photographer' ? 'fotografo' : 'comprador'
      });
      setShowPopup(true); // Mostrar el popup
      setError(null);
      setTimeout(() => {
        router.push('/gallery'); // Redirige a la galería después de 2 segundos
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la cuenta');
    }
  };

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/register' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-purple-600 hover:text-purple-500">
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* Mensajes de error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {/* Botón de Google */}
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Continuar con Google
          </button>
        </div>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O regístrate con email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Campos del formulario */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                País
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              >
                <option value="">Selecciona un país</option>
                {countries.map(country => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                ¿Qué deseas hacer?
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="photographer">Quiero vender fotos</option>
                <option value="buyer">Quiero comprar fotos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  required
                />
                <span className="ml-2 text-sm text-gray-600">
                  Acepto los{' '}
                  <Link href="/terms" className="text-purple-600 hover:text-purple-500">
                    términos y condiciones
                  </Link>
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Crear cuenta
          </button>
        </form>

        {/* Popup de éxito */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold">Registro exitoso</h3>
              <p>Usuario registrado exitosamente. Serás redirigido a la galería.</p>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;