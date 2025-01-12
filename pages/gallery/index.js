import React from 'react';
import TopBar from '../../components/TopBar';
import Head from 'next/head';
import CreateAlbumForm from '../../components/Albums/CreateAlbumForm';
import AlbumList from '../../components/Albums/AlbumList';

const GalleryPage = () => {
  return (
    <>
      <Head>
        <title>Galería - Star Fotto</title>
      </Head>
      <TopBar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold">Galería de Fotos</h1>
          <CreateAlbumForm />
          <AlbumList />
        </div>
      </main>
    </>
  );
};

export default GalleryPage; 