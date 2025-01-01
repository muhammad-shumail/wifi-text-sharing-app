"use client"
import { useState } from 'react';
import { useWebSocket } from './hooks/useWebSocket';

const Home = () => {
  const { message, sendMessage } = useWebSocket('ws://localhost:8080');
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    sendMessage(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Share Text</h1>
      <textarea
        className="w-full p-2 border rounded"
        rows={10}
        value={text}
        onChange={handleChange}
      />
      <div className="mt-4 p-2 border rounded">
        <h2 className="text-xl font-bold">Shared Text:</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Home;
