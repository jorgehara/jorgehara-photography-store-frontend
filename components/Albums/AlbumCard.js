// components/Albums/AlbumCard.js
import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AlbumCard = ({ album, onEdit, onDelete, onSelect }) => {
  const handleCardClick = (e) => {
    // Evitar que el clic en los botones de editar/eliminar active onSelect
    if (!e.target.closest('button')) {
      onSelect(album.id);
    }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <div className="relative h-48">
        {album.photos && album.photos.length > 0 ? (
          <Image
            src={album.photos[0].url}
            alt={album.title}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">Sin fotos</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {album.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {album.eventName}
            </p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(album.id);
              }} 
              className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"
            >
              <FaEdit />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(album.id);
              }} 
              className="p-2 text-red-500 hover:bg-red-100 rounded-full"
            >
              <FaTrash />
            </button>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          <p>Fecha del evento: {format(new Date(album.eventDate), 'PPP', { locale: es })}</p>
          <p>Fotos: {album.photos?.length || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;