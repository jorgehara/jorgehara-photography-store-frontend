import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import TopBar from '../../components/TopBar';
import Head from 'next/head';
import PhotoList from '../../components/Photos/PhotoList';
import EditPhotoForm from '../../components/Photos/EditPhotoForm';
import PhotoUploadPopup from '../../components/Photos/PhotoUploadPopup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlbumPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [album, setAlbum] = useState(null);
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [editingPhotoId, setEditingPhotoId] = useState(null);
    const [editingPhoto, setEditingPhoto] = useState(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            if (!id) return;
            try {
                const response = await axios.get(`/albums/${id}`);
                setAlbum(response.data);
            } catch (err) {
                setError('Error al cargar el álbum');
            } finally {
                setLoading(false);
            }
        };

        fetchAlbum();
    }, [id]);

    useEffect(() => {
        const fetchPhotos = async () => {
            if (!id) return;

            try {
                const response = await axios.get(`/photos/album/${id}`);
                setPhotos(response.data);
            } catch (error) {
                console.error('Error al cargar las fotos:', error);
                setError('Error al cargar las fotos');
            }
        };

        fetchPhotos();
    }, [id]);

    const handleEditPhoto = (photoId) => {
        const photoToEdit = photos.find(photo => photo.id === photoId);
        setEditingPhoto(photoToEdit);
    };

    const handleDeletePhoto = async (photoId) => {
        try {
            await axios.delete(`/photos/${photoId}`);
            setPhotos(photos.filter(photo => photo.id !== photoId));
        } catch (error) {
            console.error('Error al eliminar la foto', error);
        }
    };

    const handlePhotoAdded = (newPhoto) => {
        setAlbum(prev => ({
            ...prev,
            photos: [...(prev.photos || []), newPhoto]
        }));
        setShowUploadPopup(false);
    };

    const addToCart = (photoId) => {
        console.log(`Agregando foto con ID ${photoId} al carrito`);
    };

    const handlePhotoUpdated = (updatedPhoto) => {
        setPhotos(photos.map(photo => (photo.id === updatedPhoto.id ? updatedPhoto : photo)));
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Head>
                <title>Fotos del Álbum</title>
            </Head>
            <ToastContainer />
            <TopBar />
            <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold">Fotos del Álbum {id}</h1>
                    <button
                        onClick={() => setShowUploadPopup(true)}
                        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        Agregar Foto
                    </button>
                    <PhotoList albumId={id} photos={photos} onEdit={handleEditPhoto} onDelete={handleDeletePhoto} />
                    {editingPhoto && (
                        <EditPhotoForm 
                            photo={editingPhoto} 
                            onClose={() => {
                                setEditingPhoto(null);
                                fetchPhotos();
                            }}
                            onPhotoUpdated={(updatedPhoto) => {
                                setPhotos(photos.map(p => p.id === updatedPhoto.id ? updatedPhoto : p));
                            }}
                        />
                    )}
                    {showUploadPopup && (
                        <PhotoUploadPopup
                            albumId={id}
                            onClose={() => setShowUploadPopup(false)}
                            onPhotoAdded={handlePhotoAdded}
                        />
                    )}
                </div>
            </main>
        </>
    );
};

export default AlbumPage; 