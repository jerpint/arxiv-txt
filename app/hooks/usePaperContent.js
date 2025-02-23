import { useState, useEffect } from 'react';

export function usePaperContent(id) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paperContent, setPaperContent] = useState('');

  useEffect(() => {
    console.log('0. Starting fetch for ID:', id);

    async function fetchPaper() {
      setLoading(true);
      setError(null);


      try {
        const response = await fetch(`/raw/pdf/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch paper: ${response.status} ${response.statusText}`);
        }

        const content = await response.text();

        console.log('Fetched content:', content);
        setPaperContent(content);
      } catch (err) {
        console.error('Error loading paper content:', err);
        setError(err.message || 'Failed to load paper content');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPaper();
    }
  }, [id]);

  return { paperContent, loading, error };
}