// pages/gallery/index.js
import React, { useState } from 'react';
import TopBar from '../../components/TopBar';
import Head from 'next/head';
import CreateAlbumForm from '../../components/Albums/CreateAlbumForm';
import AlbumList from '../../components/Albums/AlbumList';
import { useSession } from 'next-auth/react';

const GalleryPage = () => {
  const { data: session } = useSession();
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);

  return (
    <>
      <Head>
        <title>Dashboard - Star Fotto</title>
      </Head>
      <TopBar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard del Fotógrafo
            </h1>
            <button
              onClick={() => setShowCreateAlbum(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Crear Nuevo Álbum
            </button>
          </div>

          {showCreateAlbum && (
            <CreateAlbumForm onClose={() => setShowCreateAlbum(false)} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AlbumList />
          </div>
        </div>
      </main>
    </>
  );
};

export default GalleryPage;