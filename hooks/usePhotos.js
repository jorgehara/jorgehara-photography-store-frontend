import { useState, useEffect } from 'react';
import axiosInstance from '../lib/axios';

export const usePhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/photos');
      setPhotos(response.data);
      setError(null);
    } catch (error) {
      setError('Error al cargar las fotos');
      console.error('Error fetching photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return { photos, isLoading, error, refreshPhotos: fetchPhotos };
};