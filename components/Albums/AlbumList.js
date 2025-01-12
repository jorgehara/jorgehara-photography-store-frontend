import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';

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
    <div className="space-y-4">
      {albums.map((album) => (
        <div key={album.id} className="p-4 border rounded-md">
          <h2 className="text-xl font-bold">{album.title}</h2>
          <p>{album.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AlbumList; 