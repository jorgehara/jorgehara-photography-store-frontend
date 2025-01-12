// components/TopBar/index.js
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../ThemeToggle";
import { HomeIcon, PhotoIcon, UserGroupIcon, CameraIcon, ArrowRightOnRectangleIcon as LoginIcon, ArrowLeftOnRectangleIcon as LogoutIcon } from "@heroicons/react/24/outline";

const TopBar = ({ handleWorkScroll, handleAboutScroll, handleServicesScroll }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleGalleryClick = () => {
    router.push('/gallery');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={`w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm 
        border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10">
                <Image
                  src={theme === 'dark' ? "/images/logo-dark.png" : "/images/logo.png"}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-lg object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 
                text-transparent bg-clip-text">
                Star Fotto
              </span>
            </Link>

            <nav className="border-t border-gray-100 dark:border-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center py-3 space-x-8">
                  <Link href="/" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium 
                    transition-colors hover:bg-gray-100 dark:hover:bg-gray-800
                    ${theme === 'dark' ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                    <HomeIcon className="h-5 w-5" />
                    <span>Inicio</span>
                  </Link>
                  
                  <button
                    onClick={handleGalleryClick}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium 
                      transition-colors hover:bg-gray-100 dark:hover:bg-gray-800
                      ${theme === 'dark' ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                    <PhotoIcon className="h-5 w-5" />
                    <span>Galería</span>
                  </button>
                  
                  <button
                    onClick={handleServicesScroll}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium 
                      transition-colors hover:bg-gray-100 dark:hover:bg-gray-800
                      ${theme === 'dark' ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                    <CameraIcon className="h-5 w-5" />
                    <span>Servicios</span>
                  </button>
                  
                  <button
                    onClick={handleAboutScroll}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium 
                      transition-colors hover:bg-gray-100 dark:hover:bg-gray-800
                      ${theme === 'dark' ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                    <UserGroupIcon className="h-5 w-5" />
                    <span>Contacto</span>
                  </button>

                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium 
                        transition-colors hover:bg-gray-100 dark:hover:bg-gray-800
                        ${theme === 'dark' ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                      <LogoutIcon className="h-5 w-5" />
                      <span>Cerrar Sesión</span>
                    </button>
                  ) : (
                    <Link href="/login" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium 
                      transition-colors hover:bg-gray-100 dark:hover:bg-gray-800
                      ${theme === 'dark' ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                      <LoginIcon className="h-5 w-5" />
                      <span>Login</span>
                    </Link>
                  )}

                  <div className="flex items-center">
                    <ThemeToggle theme={theme} setTheme={setTheme} />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;