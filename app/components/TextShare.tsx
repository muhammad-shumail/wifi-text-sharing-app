import React, { useState, useEffect } from 'react';

const TextShare: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [sharedText, setSharedText] = useState<string | null>(null);

    const handleShare = async () => {
        if (text) {
            await fetch('/api/share', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            setText('');
            fetchSharedText();
        }
    };

    const fetchSharedText = async () => {
        const response = await fetch('/api/share');
        const data = await response.json();
        setSharedText(data.text);
    };

    useEffect(() => {
        fetchSharedText();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <textarea
                className="border p-2 w-full h-32"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text here..."
            />
            <button
                className="mt-2 bg-blue-500 text-white p-2 rounded"
                onClick={handleShare}
            >
                Share Text
            </button>
            {sharedText && (
                <div className="mt-4 p-2 border">
                    <h2 className="font-bold">Shared Text:</h2>
                    <p>{sharedText}</p>
                </div>
            )}
        </div>
    );
};

export default TextShare;