import React, { useState } from 'react';
import axios from '../../lib/axios';

const UploadPhotoForm = ({ albumId, onPhotoUploaded }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Por favor, selecciona un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axios.post(`/albums/${albumId}/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onPhotoUploaded(response.data);
      setFile(null);
    } catch (err) {
      setError('Error al subir la foto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Selecciona una foto</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-1 block w-full"
          accept="image/*"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
        Subir Foto
      </button>
    </form>
  );
};

export default UploadPhotoForm; 