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
                console.log("Fotos recibidas:", response.data); // Para debug
                setPhotos(response.data);
            } catch (error) {
                console.error('Error al cargar las fotos:', error);
                setError('Error al cargar las fotos');
            }
        };

        fetchPhotos();
    }, [id]);

    const handleEditPhoto = (photo) => {
        setEditingPhoto(photo);
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
        setPhotos(prevPhotos => [...prevPhotos, newPhoto]);
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

    const handleBack = () => {
        router.push('/gallery');
    };

    return (
        <>
            <Head>
                <title>{album ? album.title : 'Cargando...'}</title>
            </Head>
            <ToastContainer />
            <TopBar />
            <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <button onClick={handleBack} className="flex items-center mb-4 text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l6-6m-6 6l6 6" />
                        </svg>
                        Volver a Álbumes
                    </button>
                    <h1 className="text-3xl font-bold mb-4">{album ? album.title : 'Cargando...'}</h1>
                    <button
                        onClick={() => setShowUploadPopup(true)}
                        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        Agregar Foto
                    </button>
                    <PhotoList 
                        photos={photos} 
                        onEdit={handleEditPhoto} 
                        onDelete={handleDeletePhoto}
                        addToCart={addToCart}
                    />
                    {editingPhoto && (
                        <EditPhotoForm 
                            photo={editingPhoto} 
                            onClose={() => setEditingPhoto(null)} 
                            onPhotoUpdated={handlePhotoUpdated} 
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