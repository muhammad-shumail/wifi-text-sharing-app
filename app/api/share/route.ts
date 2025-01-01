import { NextRequest, NextResponse } from 'next/server';

// Initialize an empty array to store shared texts
const sharedTexts: unknown[] = [];

// Define a function to handle GET requests
export async function GET() {
    // Return the shared texts as JSON
    return NextResponse.json({ sharedTexts });
}

// Define a function to handle POST requests
export async function POST(request: NextRequest) {
    // Get the request body as JSON
    const body = await request.json();

    // Add the new text to the shared texts array
    sharedTexts.push(body.text);

    // Return the updated shared texts as JSON
    return NextResponse.json({ sharedTexts });
}