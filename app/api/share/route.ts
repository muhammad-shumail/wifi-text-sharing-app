import { NextApiRequest, NextApiResponse } from 'next';

let sharedTexts: any[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { text } = req.body;

        // Here you would typically save the text to a database or in-memory store
        // For simplicity, we'll just return the text as a response
        res.status(200).json({ sharedText: text });
    } else if (req.method === 'GET') {
        // Here you would typically retrieve the shared text from a database or in-memory store
        // For simplicity, we'll return a static response
        res.status(200).json({ sharedText: "Sample shared text" });
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}