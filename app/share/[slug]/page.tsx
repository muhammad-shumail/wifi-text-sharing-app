'use client'
import Loader from '@/app/components/Loader';
import { useQuery } from '@tanstack/react-query';
import { use } from 'react';

const fetchSharedText = async (slug: string) => {
  const response = await fetch(`/api/share?id=${slug}`);
  if (!response.ok) {
    throw new Error('Text not found');
  }
  return response.json();
};

const SharePage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const paramsValue = use(params);
  const { slug } = paramsValue;

  const { data, error, isLoading } = useQuery({
    queryKey: ['sharedText', slug],
    queryFn: () => fetchSharedText(slug),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 w-full h-screen">
        <div className="border-2 border-blue-200 border-dotted rounded-lg p-10 w-1/2 h-1/2 flex items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 w-full h-screen">
        <div className="border-2 border-blue-200 border-dotted rounded-lg p-10 w-1/2 h-1/2 flex items-center justify-center">
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 w-full h-screen">
      <div className="border-2 border-blue-200 border-dotted rounded-lg p-10 w-1/2 h-1/2 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Your Shared Content</h1>
        <h2 className="text-lg font-medium text-gray-600 mb-2">View the content shared with you, securely and easily</h2>
        <p className="border p-5 border-gray-400 w-full">{data.text}</p>
      </div>
    </div>
  );
};

export default SharePage;
