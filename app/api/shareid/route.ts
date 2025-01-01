import { NextApiRequest, NextApiResponse } from 'next';

const shareText = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { text } = req.body;
    const uniqueId = Math.random().toString(36).substr(2, 9);
    const shareUrl = `http://localhost:3000/share/${uniqueId}`;

    // Save the text and uniqueId to a database or cache
    // For simplicity, we'll just store it in memory
    const sharedTexts = {
      [uniqueId]: text,
    };

    res.status(201).json({ shareUrl });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default shareText;