import React from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const MobileMenu = ({ isOpen, menuItems, theme, handleClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className={`fixed top-16 sm:top-20 left-0 right-0 border-t z-50 max-h-[calc(100vh-4rem)] overflow-y-auto
        ${theme === 'dark' 
          ? 'bg-gray-900/95 border-gray-800' 
          : 'bg-white/95 border-gray-100'}
        backdrop-blur-md`}
    >
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar eventos o fotos..."
              className={`w-full px-4 py-3 rounded-full text-base
                ${theme === 'dark' 
                  ? 'bg-gray-800 text-white placeholder-gray-400' 
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500'}
                focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            <MagnifyingGlassIcon className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            item.show && (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  item.action();
                  handleClose();
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-base font-medium
                  transition-colors duration-300
                  ${item.highlight 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg' 
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </motion.button>
            )
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default MobileMenu; 