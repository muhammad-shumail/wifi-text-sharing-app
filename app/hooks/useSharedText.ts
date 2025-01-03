// hooks/useSharedText.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchSharedText = async (id: any) => {
  const response = await fetch(`/api/share?id=${id}`);
  if (!response.ok) {
    throw new Error('Text not found');
  }
  return response.json();
};

const shareText = async (text: string): Promise<{ message: string }> => {
  const response = await fetch('/api/share', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error('Failed to share text');
  }
  return response.json();
};

export const useSharedText = (id: any) => {
  return useQuery({
    queryKey: ['sharedText', id],
    queryFn: () => fetchSharedText(id),
    enabled: !!id, // Only run the query if id is defined
  });
};

export const useShareText = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string, unknown>({
    mutationFn: shareText,
    onSuccess: (data) => {
      console.log(data.message);
      queryClient.invalidateQueries({ queryKey: ['sharedTexts'] });
    },
  });
};