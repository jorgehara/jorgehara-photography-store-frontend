// components/Photos/PhotoList.js
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaEye, FaThLarge, FaList, FaEdit, FaDownload, FaTrash } from 'react-icons/fa';

const PhotoList = ({ photos, onEdit, onDelete, addToCart }) => {
    const router = useRouter();
    const [viewMode, setViewMode] = useState('grid');
    const [hoveredPhoto, setHoveredPhoto] = useState(null);

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
                <div className="flex flex-wrap -mx-2">
                    {photos.map(photo => (
                        <div 
                            key={photo.id} 
                            className="w-60 h-50 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4 relative"
                            onMouseEnter={() => setHoveredPhoto(photo)}
                            onMouseLeave={() => setHoveredPhoto(null)}
                        >
                            <div className="border rounded-lg overflow-hidden shadow-md h-50">
                                <div className="relative h-40">
                                    <Image
                                        src={photo.url}
                                        alt={photo.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-t"
                                    />
                                    <div className="absolute top-2 right-2 flex space-x-2">
                                        <button 
                                            onClick={() => window.open(photo.url, '_blank')} 
                                            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                        >
                                            <FaEye className="text-gray-600" />
                                        </button>
                                        <button 
                                            onClick={() => onEdit(photo)} 
                                            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                        >
                                            <FaEdit className="text-gray-600" />
                                        </button>
                                        <button 
                                            onClick={() => {
                                                // Implementar la lógica de descarga aquí
                                            }} 
                                            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                        >
                                            <FaDownload className="text-gray-600" />
                                        </button>
                                        <button 
                                            onClick={() => onDelete(photo.id)} 
                                            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                        >
                                            <FaTrash className="text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2 truncate">{photo.title}</h3>
                                    {photo.description && (
                                        <p className="text-gray-600 mb-2 text-sm line-clamp-2">{photo.description}</p>
                                    )}
                                    <div className="text-sm text-gray-500 space-y-1">
                                        <p>Tamaño: {photo.fileSize.toFixed(1)} MB</p>
                                        <p>Precio: ${photo.price || 0}</p>
                                    </div>
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