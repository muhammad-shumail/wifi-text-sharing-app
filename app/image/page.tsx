'use client'
import Image from 'next/image';
import { useState } from 'react';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const uploadedImage = await response.json();
      setUploadedImage(uploadedImage);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {uploadedImage && (
        <Image src={`/images/${uploadedImage.name}`} width={300} height={300} alt=''/>
      )}
    </div>
  );
};

export default ImageUploader;