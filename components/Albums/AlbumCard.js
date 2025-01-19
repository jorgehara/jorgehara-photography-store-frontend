// components/Albums/AlbumCard.js
import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const AlbumCard = ({ album }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        {album.photos && album.photos[0] ? (
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {album.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {album.eventName}
        </p>
        <div className="mt-2 text-sm text-gray-500">
          <p>Fecha del evento: {format(new Date(album.eventDate), 'PPP', { locale: es })}</p>
          <p>Fotos: {album.photoCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;