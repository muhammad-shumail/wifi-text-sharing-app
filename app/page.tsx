"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import LoadingFallback from './components/Loading-fallback';
import TextShareClient from './components/TextShare';

const queryClient = new QueryClient()
const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingFallback />}>
        <TextShareClient initialSharedTexts={[]} />
      </Suspense>
    </QueryClientProvider>
  );
};

export default Home;
