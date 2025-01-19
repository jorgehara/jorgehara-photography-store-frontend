import React, { useState, useEffect } from 'react';
import axios from '../../lib/axios';

const EditPhotoForm = ({ photoId, onClose }) => {
    const [photo, setPhoto] = useState({ title: '', url: '' });

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await axios.get(`/photos/${photoId}`);
                setPhoto(response.data);
            } catch (error) {
                console.error('Error al cargar la foto', error);
            }
        };

        fetchPhoto();
    }, [photoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPhoto({ ...photo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/photos/${photoId}`, photo);
            onClose(); // Cierra el formulario después de guardar
        } catch (error) {
            console.error('Error al actualizar la foto', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Editar Foto</h2>
                <label>
                    Título:
                    <input
                        type="text"
                        name="title"
                        value={photo.title}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                    />
                </label>
                <label>
                    URL:
                    <input
                        type="text"
                        name="url"
                        value={photo.url}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                    Guardar
                </button>
                <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2">
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default EditPhotoForm; 