// components/Photos/CreatePhotoForm.js
import React, { useState } from 'react';
import axios from '../../lib/axios';

const CreatePhotoForm = ({ albumId, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        fileSize: 0,
        description: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/photos', {
                ...formData,
                albumId, // ID del álbum al que pertenece
            });
            onClose(); // Cerrar el formulario después de crear la foto
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar la foto');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Título" required />
            <input name="url" value={formData.url} onChange={handleChange} placeholder="URL de la foto" required />
            <input name="fileSize" type="number" value={formData.fileSize} onChange={handleChange} placeholder="Tamaño del archivo (MB)" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" />
            <button type="submit">Cargar Foto</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default CreatePhotoForm;