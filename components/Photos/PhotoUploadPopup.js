// components/Photos/PhotoUploadPopup.js
import React, { useState } from 'react';
import axios from '../../lib/axios';
import { toast } from 'react-toastify';

const PhotoUploadPopup = ({ albumId, onClose, onPhotoAdded }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('albumId', albumId);
        formData.append('price', price);

        try {
            const response = await axios.post('/photos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('¡Foto agregada exitosamente!');
            onPhotoAdded(response.data); // Llama a la función para agregar la foto
            onClose(); // Cierra el popup
        } catch (error) {
            toast.error('Error al agregar la foto');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Agregar Foto</h2>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                    <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Agregar</button>
                    <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default PhotoUploadPopup;