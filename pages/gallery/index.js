// pages/gallery/index.js
import React, { useState, useEffect } from 'react';
import TopBar from '../../components/TopBar';
import Head from 'next/head';
import CreateAlbumForm from '../../components/Albums/CreateAlbumForm';
import AlbumList from '../../components/Albums/AlbumList';
import CreatePhotoForm from '../../components/Photos/CreatePhotoForm';
import axios from '../../lib/axios';

const GalleryPage = () => {
    const [albums, setAlbums] = useState([]);
    const [showCreateAlbum, setShowCreateAlbum] = useState(false);
    const [showCreatePhoto, setShowCreatePhoto] = useState(false);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [showEditAlbum, setShowEditAlbum] = useState(false);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('/albums');
                setAlbums(response.data);
            } catch (error) {
                console.error('Error al cargar los álbumes', error);
            }
        };

        fetchAlbums();
    }, []);

    const handleEditAlbum = (id) => {
        setSelectedAlbumId(id);
        setShowEditAlbum(true); // Mostrar el formulario de edición
    };

    const handleDeleteAlbum = async (id) => {
        try {
            await axios.delete(`/albums/${id}`);
            setAlbums(albums.filter(album => album.id !== id));
        } catch (error) {
            console.error('Error al eliminar el álbum', error);
        }
    };

    return (
        <>
            <Head>
                <title>Dashboard - Star Fotto</title>
            </Head>
            <TopBar />
            <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold">Dashboard del Fotógrafo</h1>
                    <button onClick={() => setShowCreateAlbum(true)}>Crear Nuevo Álbum</button>
                    <AlbumList 
                        albums={albums} 
                        onEdit={handleEditAlbum} // Asegúrate de pasar la función aquí
                        onDelete={handleDeleteAlbum} 
                        onSelectAlbum={(id) => { setSelectedAlbumId(id); setShowCreatePhoto(true); }} 
                    />
                    {showCreateAlbum && <CreateAlbumForm onClose={() => setShowCreateAlbum(false)} />}
                    {showCreatePhoto && <CreatePhotoForm albumId={selectedAlbumId} onClose={() => setShowCreatePhoto(false)} />}
                    {showEditAlbum && <CreateAlbumForm albumId={selectedAlbumId} onClose={() => setShowEditAlbum(false)} />} {/* Formulario de edición */}
                </div>
            </main>
        </>
    );
};

export default GalleryPage;