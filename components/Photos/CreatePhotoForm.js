// components/Photos/CreatePhotoForm.js
import React, { useState } from 'react';
import axios from '../../lib/axios';

const CreatePhotoForm = ({ albumId, onClose, onPhotoAdded }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !title) {
            setError('Por favor, completa todos los campos requeridos');
            return;
        }

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('albumId', albumId.toString());
        formData.append('userId', '1'); // Ajusta esto según tu sistema de autenticación

        try {
            const response = await axios.post('/photos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (onPhotoAdded) {
                onPhotoAdded(response.data);
            }
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar la foto');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Título" 
                required 
                className="border rounded p-2 w-full"
            />
            <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción"
                className="border rounded p-2 w-full"
            />
            <input 
                type="file" 
                onChange={handleFileChange} 
                className="border rounded p-2 w-full" 
                accept="image/*" 
                required
            />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Cargar Foto
            </button>
        </form>
    );
};

export default CreatePhotoForm;