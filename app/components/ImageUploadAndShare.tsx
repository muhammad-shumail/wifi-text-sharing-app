'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ImageUploadAndShare: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Fetch the list of images when the component loads
  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await fetch('/api/upload', { method: 'GET' });
        const data = await response.json();
        setImageUrls(data.imageUrls);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchImageUrls();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShareableLink(null); // Reset shareable link when selecting a new file
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Image uploaded successfully');
        setShareableLink(data.localUrl);
        setImageUrls([data.publicUrl, ...imageUrls]);
      } else {
        toast.error(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload and Share Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload and Share
      </button>
      {shareableLink && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Shareable Link:</h2>
          <a href={shareableLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {shareableLink}
          </a>
          <Image src={shareableLink} alt="Uploaded Image" width={300} height={200} className="mt-4" />
        </div>
      )}
      {imageUrls.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Most Recent Image:</h2>
          <Image
            src={imageUrls[0]}
            alt="Most Recent Image"
            width={300}
            height={200}
            className="mt-4"
          />
          {/* <h3 className="text-lg mt-4">All Images:</h3>
          <ul>
            {imageUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {url}
                </a>
              </li>
            ))}
          </ul> */}
        </div>
      )}


    </div>
  );
};

export default ImageUploadAndShare;
