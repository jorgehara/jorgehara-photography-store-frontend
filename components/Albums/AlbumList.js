// components/Albums/AlbumList.js
import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import AlbumCard from './AlbumCard';

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('/albums');
                setAlbums(response.data);
            } catch (err) {
                setError('Error al cargar los álbumes');
            }
        };

        fetchAlbums();
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map(album => (
                <AlbumCard key={album.id} album={album} />
            ))}
        </div>
    );
};

export default AlbumList;