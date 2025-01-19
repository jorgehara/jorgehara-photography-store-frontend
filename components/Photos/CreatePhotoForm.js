// components/Photos/CreatePhotoForm.js
import React, { useState } from 'react';
import axios from '../../lib/axios';
import { useDropzone } from 'react-dropzone';

const CreatePhotoForm = ({ albumId, onClose, onPhotoAdded }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Estado de carga

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !title || !description || !price) {
            setError('Por favor, completa todos los campos requeridos');
            return;
        }

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('albumId', albumId.toString());
        formData.append('userId', '1'); // Ajusta esto según tu sistema de autenticación
        formData.append('price', price);

        setLoading(true); // Iniciar carga
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
            setError(err.response?.data?.message || 'Error al crear la foto');
        } finally {
            setLoading(false); // Finalizar carga
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                placeholder="Precio" 
                required 
                className="border rounded p-2 w-full"
            />
            <div {...getRootProps()} className="border-dashed border-2 border-gray-400 rounded p-4 text-center">
                <input {...getInputProps()} />
                <p>{file ? file.name : 'Arrastra y suelta una imagen aquí, o haz clic para seleccionar'}</p>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700" disabled={loading}>
                {loading ? 'Cargando...' : 'Agregar Foto'}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                Cancelar
            </button>
        </form>
    );
};

export default CreatePhotoForm;