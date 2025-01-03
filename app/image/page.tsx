'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

interface UploadResponse {
  filename: string;
}

const ImageUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['imageUrls', 'shareableLink'],
    queryFn: async () => {
      const res = await fetch('/api/upload');
      if (!res.ok) throw new Error('Failed to fetch image URLs');
      return res.json();
    },
    initialData: { imageUrls: [], shareableLink: [] },
  });

  const uploadImageMutation = useMutation<UploadResponse, Error, FormData>({
    mutationFn: async (formData) => {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success('Image uploaded successfully');
      queryClient.invalidateQueries({ queryKey: ['imageUrls'] });
      setSelectedFile(null);
    },
    onError: (error) => {
      toast.error(error.message || 'An error occurred during upload');
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleDelete = () => {
    setSelectedFile(null);
    toast.info('File removed');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    uploadImageMutation.mutate(formData);
  };

  if (isLoading) return <Loader />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex justify-between items-center mx-20 my-5">
      <section className=''>
        <h1 className="text-2xl font-bold mb-4">Image Upload Example</h1>
        <div
          className={`p-10 border-2 border-dashed rounded-lg ${dragging ? 'bg-gray-100 border-blue-500' : 'border-gray-400'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-lg font-bold mb-2">Drag and drop an image or click to upload</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="block text-sm text-gray-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          >
            Click to select a file
          </label>
          <p className="text-sm text-gray-500 mt-2">
            Supported file types: JPEG, PNG, GIF, BMP
            <br />
            Maximum file size: 10MB
          </p>
        </div>
        {selectedFile && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm font-semibold">{selectedFile.name}</p>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
              aria-label="Delete file"
            >
              <MdDelete size={20} />
            </button>
          </div>
        )}

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          onClick={handleUpload}
          disabled={uploadImageMutation.isSuccess}
        >
          {uploadImageMutation.isSuccess ? 'Uploading...' : 'Upload Image'}
        </button>
      </section>

      {data && (
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Shareable Link:</h2>
          <Link
            href={data.shareableLink[0] || ''}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {data.shareableLink[0]}
          </Link>
          <div className="relative mt-4 w-full max-w-[500px] h-[200px]">
            {
              data.imageUrls[0] && <Image
                src={data.imageUrls[0]}
                alt="Uploaded Image"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            }
          </div>
        </div>
      )}

    </div>
  );
};

export default ImageUpload;