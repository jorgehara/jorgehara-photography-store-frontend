// components/Albums/CreateAlbumForm.js
import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';

const CreateAlbumForm = ({ albumId, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        eventName: '',
        description: '',
        eventDate: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (albumId) {
            const fetchAlbum = async () => {
                try {
                    const response = await axios.get(`/albums/${albumId}`);
                    setFormData(response.data);
                } catch (err) {
                    setError('Error al cargar el álbum');
                }
            };
            fetchAlbum();
        }
    }, [albumId]);

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
            if (albumId) {
                await axios.patch(`/albums/${albumId}`, formData);
            } else {
                await axios.post('/albums', formData);
            }
            onClose(); // Cerrar el formulario después de crear o editar
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el álbum');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Título" required />
            <input name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Nombre del Evento" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" />
            <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
            <button type="submit">{albumId ? 'Actualizar Álbum' : 'Crear Álbum'}</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default CreateAlbumForm;