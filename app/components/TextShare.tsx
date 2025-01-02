'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { SharedTextItems } from '../types';
import Loader from './Loader';
import LoadingFallback from './Loading-fallback';

interface TextShareClientProps {
    initialSharedTexts?: string[]
}

export default function TextShareClient({ initialSharedTexts = [] }: TextShareClientProps) {
    const [text, setText] = useState('')
    const queryClient = useQueryClient()

    const { data, isLoading: isLoadingTexts } = useQuery({
        queryKey: ['sharedTexts'],
        queryFn: async () => {
            const res = await fetch('/api/share')
            if (!res.ok) throw new Error('Failed to fetch shared texts')
            return res.json()
        },
        initialData: { sharedTexts: initialSharedTexts },
    })

    const { mutate: shareText, isPending } = useMutation({
        mutationFn: async (newText: string) => {
            const res = await fetch('/api/share', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newText }),
            })
            if (!res.ok) throw new Error('Failed to share text')
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sharedTexts'] })
            setText('')
        },
    })

    const handleShare = () => {
        if (text) {
            shareText(text)
        }
    }

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success('URL copied to clipboard');
    };


    if (isLoadingTexts) {
        return <LoadingFallback />
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold mb-2">WiFi Share</h1>
            <p className="text-gray-600 mb-4">
                <span className="font-bold text-blue-600">Share text with devices on the same network!</span>
            </p>
            <p className="text-gray-600 mb-4">
                This app allows you to <span className="font-bold text-blue-600">share text</span> with other devices connected to the <span className="font-bold text-blue-600">same WiFi network</span>. Simply type in the text you want to share, and it will be available to other devices on the network.
            </p>
            <p className="text-gray-600 mb-4">
                <span className="font-bold text-red-600">Important:</span> This app only works on devices connected to the <span className="font-bold text-blue-600">same WiFi network</span>. Make sure your device is connected to the same network as the device you want to share with.
            </p>
            <div className="mb-4">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="appearance-none rounded-full nm-inset-gray-200 leading-5 px-8 py-4 flex-grow w-full"
                    placeholder="Enter text to share"
                />
            </div>
            <div className="w-full h-12 flex items-center justify-center">
                {isPending ? (
                    <Loader />
                ) : (
                    <button onClick={handleShare} className="bg-blue-500 text-white w-full h-full rounded-md">
                        Share
                    </button>
                )}
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Shared Texts</h2>
                <div className="nm-flat-gray-200-lg rounded-lg overflow-y-auto h-80 smooth-scroll">
                    <ul className="space-y-2 p-4 flex flex-col">
                        {data.sharedTexts.slice().reverse().map((sharedText: SharedTextItems) => (
                            <li key={sharedText.id} className="flex justify-between items-center w-full">
                                <Link href={`/share/${sharedText.id}`} className="bg-gray-100 p-2 rounded-md flex-grow">
                                    <span>{sharedText.text}</span>
                                </Link>
                                <button
                                    className="text-blue-500 hover:text-blue-700 ml-4"
                                    onClick={() => handleCopyUrl(`${process.env.NEXT_PUBLIC_API_URL}/share/${sharedText.id}`)}
                                >
                                    Share Link
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    )
}