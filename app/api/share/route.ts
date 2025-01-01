import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Initialize an empty array to store shared texts
const sharedTexts: { id: string; text: string }[] = [];

// Define a function to handle GET requests
export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (id) {
        const sharedText = sharedTexts.find((text) => text.id === id);
        if (sharedText) {
            const completeUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/share?id=${id}`;
            return NextResponse.json({ id: id, text: sharedText.text, url: completeUrl });
        } else {
            return NextResponse.json({ error: 'Text not found' }, { status: 404 });
        }
    } else {
        // Return the shared texts as JSON
        const sharedTextsWithUrl = sharedTexts.map((text) => ({
            id: text.id,
            text: text.text,
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/share?id=${text.id}`,
        }));
        return NextResponse.json({ sharedTexts: sharedTextsWithUrl });
    }
}

// Define a function to handle POST requests
export async function POST(request: NextRequest) {
    // Get the request body as JSON
    const body = await request.json();

    // Generate a unique ID
    const id = uuidv4();

    // Add the new text to the shared texts array
    sharedTexts.push({ id, text: body.text });

    // Generate the complete URL
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/share?id=${id}`;

    // Return the updated shared texts as JSON
    return NextResponse.json({ url, text: body.text, message: 'Text shared successfully' });
}