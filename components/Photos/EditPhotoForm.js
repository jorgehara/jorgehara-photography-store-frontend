import React, { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const EditPhotoForm = ({ photo, onClose, onPhotoUpdated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [albumId, setAlbumId] = useState(null);

    useEffect(() => {
        if (photo) {
            setTitle(photo.title || '');
            setDescription(photo.description || '');
            setAlbumId(photo.albumId);
            setPrice(photo.price?.toString() || '');
        }
    }, [photo]);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        
        // Agregar solo los campos modificados
        if (title !== photo.title) formData.append('title', title);
        if (description !== photo.description) formData.append('description', description);
        if (price !== photo.price?.toString()) formData.append('price', price);
        if (file) formData.append('photo', file);

        if (formData.entries().next().done) {
            setError('No se han realizado cambios');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.put(`/photos/${photo.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            // Mostrar notificación de éxito
            toast.success('¡Foto actualizada exitosamente!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'bg-green-500',
            });

            if (onPhotoUpdated) {
                onPhotoUpdated(response.data);
            }
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al actualizar la foto', {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Editar Foto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className="border rounded p-2 w-full focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border rounded p-2 w-full focus:ring-2 focus:ring-purple-500"
                            rows={3}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Precio</label>
                        <input 
                            type="number" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            className="border rounded p-2 w-full focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div {...getRootProps()} className="border-dashed border-2 border-gray-400 rounded p-4 text-center hover:border-purple-500 transition-colors">
                        <input {...getInputProps()} />
                        <p>{file ? file.name : 'Arrastra y suelta una imagen aquí, o haz clic para seleccionar'}</p>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Actualizando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPhotoForm; 