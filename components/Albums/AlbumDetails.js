// components/Albums/AlbumDetails.js
import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import PhotoUploadPopup from '../Photos/PhotoUploadPopup';
import PhotoList from '../Photos/PhotoList'; // Importa el nuevo componente
import Image from 'next/image'; 

const AlbumDetails = ({ albumId, onClose }) => {
    const [album, setAlbum] = useState(null);
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [showPhotoList, setShowPhotoList] = useState(false); // Estado para mostrar la lista de fotos

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
                    <button 
                        onClick={() => setShowPhotoList(!showPhotoList)} // Alternar la lista de fotos
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        {showPhotoList ? 'Ocultar Fotos' : 'Ver Fotos'}
                    </button>
                    {showPhotoList && <PhotoList albumId={albumId} />} {/* Mostrar la lista de fotos */}
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