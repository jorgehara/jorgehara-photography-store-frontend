// components/Photos/PhotoList.js
import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import Image from 'next/image';

const PhotoList = ({ albumId, onEdit, onDelete, addToCart }) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            if (!albumId) return;
            
            try {
                const response = await axios.get(`/photos/album/${albumId}`);
                setPhotos(response.data);
            } catch (err) {
                console.error('Error fetching photos:', err);
                setError('Error al cargar las fotos');
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [albumId]);

    if (loading) return <div>Cargando fotos...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!photos.length) return <div>No hay fotos en este álbum</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map(photo => (
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
                    <p className="text-gray-500">Precio: {photo.price} $</p>
                    <p className="text-gray-500">Fecha de vencimiento: {new Date(photo.expirationDate).toLocaleDateString()}</p>
                    <div className="mt-2 flex justify-between">
                        <button onClick={() => onEdit(photo.id)} className="text-blue-500">Editar</button>
                        <button onClick={() => onDelete(photo.id)} className="text-red-500">Eliminar</button>
                        <button onClick={() => addToCart(photo.id)} className="text-green-500">Agregar al Carrito</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PhotoList;