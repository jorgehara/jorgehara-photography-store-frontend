import React from 'react';
import axios from '../../lib/axios';

const DeleteAlbumButton = ({ albumId, onAlbumDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/albums/${albumId}`);
      onAlbumDeleted(albumId);
    } catch (err) {
      console.error('Error al eliminar el álbum', err);
    }
  };

  return (
    <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
      Eliminar Álbum
    </button>
  );
};

export default DeleteAlbumButton; 