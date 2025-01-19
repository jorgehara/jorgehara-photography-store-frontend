// components/Albums/AlbumDetails.js
import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import PhotoUploadPopup from '../Photos/PhotoUploadPopup';

const AlbumDetails = ({ albumId, onClose }) => {
    const [album, setAlbum] = useState(null);
    const [showUploadPopup, setShowUploadPopup] = useState(false);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await axios.get(`/albums/${albumId}`);
                setAlbum(response.data);
            } catch (error) {
                console.error('Error al cargar el álbum', error);
            }
        };

        fetchAlbum();
    }, [albumId]);

    const handlePhotoAdded = (newPhoto) => {
        setAlbum(prev => ({
            ...prev,
            photos: [...(prev.photos || []), newPhoto]
        }));
        setShowUploadPopup(false);
    };

    return (
        <div className="p-4">
            {album ? (
                <>
                    <h2 className="text-2xl font-bold">{album.title}</h2>
                    <p>{album.eventName}</p>
                    <p>Fecha del evento: {album.eventDate}</p>
                    <p>Descripción: {album.description}</p>
                    <button 
                        onClick={() => setShowUploadPopup(true)} 
                        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                        Agregar Foto
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {album.photos && album.photos.length > 0 ? (
                            album.photos.map(photo => (
                                <img key={photo.id} src={photo.url} alt={photo.title} className="rounded-lg" />
                            ))
                        ) : (
                            <p>Sin fotos</p>
                        )}
                    </div>
                    {showUploadPopup && (
                        <PhotoUploadPopup 
                            albumId={albumId} 
                            onClose={() => setShowUploadPopup(false)}
                            onPhotoAdded={handlePhotoAdded}
                        />
                    )}
                </>
            ) : (
                <p>Cargando álbum...</p>
            )}
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                Cerrar
            </button>
        </div>
    );
};

export default AlbumDetails;