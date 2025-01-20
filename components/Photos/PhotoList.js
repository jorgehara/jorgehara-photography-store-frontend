// components/Photos/PhotoList.js
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaEye } from 'react-icons/fa';

const PhotoList = ({ photos, onEdit, onDelete, addToCart }) => {
    const router = useRouter();
    const [viewMode, setViewMode] = useState('grid');

    const handleViewChange = (mode) => {
        setViewMode(mode);
    };

    if (!photos || photos.length === 0) return <div>No hay fotos en este álbum</div>;

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={() => handleViewChange('grid')} className={`mr-2 ${viewMode === 'grid' ? 'font-bold' : ''}`}>
                    Cuadrícula
                </button>
                <button onClick={() => handleViewChange('list')} className={`${viewMode === 'list' ? 'font-bold' : ''}`}>
                    Lista
                </button>
            </div>
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col"}>
                {photos.map(photo => (
                    <div key={photo.id} className={`border rounded-lg overflow-hidden shadow-md ${viewMode === 'list' ? 'flex items-center' : ''}`}>
                        <div className={`relative ${viewMode === 'list' ? 'h-24 w-24' : 'h-64 w-full'}`}>
                            <Image
                                src={photo.url}
                                alt={photo.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded"
                            />
                        </div>
                        <div className={`${viewMode === 'list' ? 'ml-4' : 'p-4'}`}>
                            <h3 className="mt-2 font-bold">{photo.title}</h3>
                            {photo.description && (
                                <p className="text-gray-600">{photo.description}</p>
                            )}
                            <p className="text-gray-500">Tamaño: {photo.fileSize.toFixed(1)} MB</p>
                            <p className="text-gray-500">Fecha de carga: {new Date(photo.uploadDate).toLocaleDateString()}</p>
                            <p className="text-gray-500">Precio: ${photo.price || 0}</p>
                            <div className="mt-2 flex justify-between">
                                <button onClick={() => onEdit(photo)} className="text-blue-500">Editar</button>
                                <button onClick={() => onDelete(photo.id)} className="text-red-500">Eliminar</button>
                                <button onClick={() => addToCart(photo.id)} className="text-green-500">Agregar al Carrito</button>
                                <button onClick={() => window.open(photo.url, '_blank')} className="text-gray-500">
                                    <FaEye />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoList;