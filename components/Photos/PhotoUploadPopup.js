// components/Photos/PhotoUploadPopup.js
import React from 'react';
import CreatePhotoForm from './CreatePhotoForm';

const PhotoUploadPopup = ({ albumId, onClose, onPhotoAdded }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Agregar Foto</h2>
                <CreatePhotoForm albumId={albumId} onClose={onClose} onPhotoAdded={onPhotoAdded} />
                <button 
                    onClick={onClose} 
                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default PhotoUploadPopup;