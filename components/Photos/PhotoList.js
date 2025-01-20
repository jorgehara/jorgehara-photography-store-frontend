// components/Photos/PhotoList.js
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaEye, FaThLarge, FaList } from 'react-icons/fa';

const PhotoList = ({ photos, onEdit, onDelete, addToCart }) => {
    const router = useRouter();
    const [viewMode, setViewMode] = useState('grid');

    if (!photos || photos.length === 0) return <div>No hay fotos en este álbum</div>;

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-end mb-4 space-x-2">
                <button 
                    onClick={() => setViewMode('grid')} 
                    className={`flex items-center px-3 py-2 rounded ${
                        viewMode === 'grid' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    <FaThLarge className="mr-2" /> Cuadrícula
                </button>
                <button 
                    onClick={() => setViewMode('list')} 
                    className={`flex items-center px-3 py-2 rounded ${
                        viewMode === 'list' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    <FaList className="mr-2" /> Lista
                </button>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {photos.map(photo => (
                        <div key={photo.id} className="border rounded-lg overflow-hidden shadow-md">
                            <div className="relative h-64 w-full">
                                <Image
                                    src={photo.url}
                                    alt={photo.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2">{photo.title}</h3>
                                {photo.description && (
                                    <p className="text-gray-600 mb-2">{photo.description}</p>
                                )}
                                <p className="text-gray-500">Tamaño: {photo.fileSize.toFixed(1)} MB</p>
                                <p className="text-gray-500">Precio: ${photo.price || 0}</p>
                                <div className="mt-4 flex justify-between">
                                    <button onClick={() => onEdit(photo)} className="text-blue-500 hover:text-blue-700">
                                        Editar
                                    </button>
                                    <button onClick={() => onDelete(photo.id)} className="text-red-500 hover:text-red-700">
                                        Eliminar
                                    </button>
                                    <button onClick={() => addToCart(photo.id)} className="text-green-500 hover:text-green-700">
                                        Agregar al Carrito
                                    </button>
                                    <button onClick={() => window.open(photo.url, '_blank')} className="text-gray-500 hover:text-gray-700">
                                        <FaEye />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Imagen
                                </th>
                                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Título
                                </th>
                                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Descripción
                                </th>
                                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tamaño
                                </th>
                                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Precio
                                </th>
                                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {photos.map(photo => (
                                <tr key={photo.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="relative h-16 w-16">
                                            <Image
                                                src={photo.url}
                                                alt={photo.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{photo.title}</td>
                                    <td className="px-6 py-4">{photo.description}</td>
                                    <td className="px-6 py-4">{photo.fileSize.toFixed(1)} MB</td>
                                    <td className="px-6 py-4">${photo.price || 0}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button onClick={() => onEdit(photo)} className="text-blue-500 hover:text-blue-700">
                                                Editar
                                            </button>
                                            <button onClick={() => onDelete(photo.id)} className="text-red-500 hover:text-red-700">
                                                Eliminar
                                            </button>
                                            <button onClick={() => addToCart(photo.id)} className="text-green-500 hover:text-green-700">
                                                Agregar
                                            </button>
                                            <button onClick={() => window.open(photo.url, '_blank')} className="text-gray-500 hover:text-gray-700">
                                                <FaEye />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PhotoList;