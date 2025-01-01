"use client"
import { useEffect, useState } from 'react';
import TextShare from '../components/TextShare';

const ShareTextPage = () => {
  const [sharedText, setSharedText] = useState<string | null>(null);

  const fetchSharedText = async () => {
    const response = await fetch('/api/share');
    if (response.ok) {
      const data = await response.json();
      setSharedText(data.text);
    }
  };

  useEffect(() => {
    fetchSharedText();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Share Text App</h1>
      <TextShare />
      {sharedText && (
        <div className="mt-4 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold">Shared Text:</h2>
          <p>{sharedText}</p>
        </div>
      )}
    </div>
  );
};

export default ShareTextPage;