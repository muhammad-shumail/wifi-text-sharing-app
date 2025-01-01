// app/page.js
'use client';

import React, { useState } from 'react';

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUploadedImage(`/uploads/${data.filename}`); // Set the uploaded image path for display
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Upload Example</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
          Upload Image
        </button>
      </form>
      {uploadedImage && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Uploaded Image:</h2>
          <img src={uploadedImage} alt="Uploaded" className="mt-2" />
        </div>
      )}
    </div>
  );
};

export default HomePage;
