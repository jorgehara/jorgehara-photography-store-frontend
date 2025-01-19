// components/Albums/CreateAlbumForm.js
import React, { useState } from 'react';
import axios from '../../lib/axios';

const CreateAlbumForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        eventName: '',
        description: '',
        eventDate: '',
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
            await axios.post('/albums', formData);
            onClose(); // Cerrar el formulario después de crear el álbum
        } catch (err) {
            setError(err.response?.data?.message || 'Error al crear el álbum');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Título" required />
            <input name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Nombre del Evento" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" />
            <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
            <button type="submit">Crear Álbum</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default CreateAlbumForm;