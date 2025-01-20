// components/Photos/PhotoList.js
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const PhotoList = ({ photos, onEdit, onDelete, addToCart }) => {
    const router = useRouter();

  

    if (!photos || photos.length === 0) return <div>No hay fotos en este álbum</div>;

    return (
        <div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map(photo => {
                    console.log("Foto individual:", photo);
                    return (
                        <div key={photo.id} className="border rounded p-4">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={photo.url}
                                    alt={photo.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded"
                                />
                            </div>
                            <h3 className="mt-2 font-bold">{photo.title}</h3>
                            {photo.description && (
                                <p className="text-gray-600">{photo.description}</p>
                            )}
                            <p className="text-gray-500">Tamaño: {photo.fileSize} MB</p>
                            <p className="text-gray-500">Fecha de carga: {new Date(photo.uploadDate).toLocaleDateString()}</p>
                            <p className="text-gray-500">Precio: ${photo.price || 0}</p>
                            {photo.expirationDate && (
                                <p className="text-gray-500">
                                    Fecha de vencimiento: {new Date(photo.expirationDate).toLocaleDateString()}
                                </p>
                            )}
                            <div className="mt-2 flex justify-between">
                                <button onClick={() => onEdit(photo)} className="text-blue-500 hover:text-blue-700">
                                    Editar
                                </button>
                                <button onClick={() => onDelete(photo.id)} className="text-red-500 hover:text-red-700">
                                    Eliminar
                                </button>
                                <button onClick={() => addToCart(photo.id)} className="text-green-500 hover:text-green-700">
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PhotoList;