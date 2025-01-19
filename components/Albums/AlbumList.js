// components/Albums/AlbumList.js
import React from 'react';
import AlbumCard from './AlbumCard';

const AlbumList = ({ albums, onEdit, onDelete, onSelectAlbum }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map(album => (
                <AlbumCard 
                    key={album.id} 
                    album={album} 
                    onEdit={onEdit} // Asegúrate de pasar onEdit aquí
                    onDelete={onDelete} 
                />
            ))}
        </div>
    );
};

export default AlbumList;