// components/Photos/PhotoList.js
import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import Image from 'next/image';

const PhotoList = ({ albumId }) => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map(photo => (
                <div key={photo.id} className="border rounded-lg p-4">
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
                </div>
            ))}
        </div>
    );
};

export default PhotoList;