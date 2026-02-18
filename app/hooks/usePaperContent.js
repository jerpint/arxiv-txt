import { useState, useEffect } from 'react';

export function usePaperContent(id) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paperContent, setPaperContent] = useState({ text: '', error: null });

  useEffect(() => {
    async function fetchPaper() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/raw/pdf/${id}`);

        if (!response.ok) {
          setPaperContent({
            error: `Failed to fetch paper: ${response.status} ${response.statusText}`,
            text: null
          });
          setError(`Failed to fetch paper: ${response.status} ${response.statusText}`);
          setLoading(false);
          return;
        }

        const content = await response.text();

        setPaperContent({ text: content, error: null });
      } catch (err) {
        console.error('Error loading paper content:', err);
        setError(err.message || 'Failed to load paper content');
        setPaperContent({ text: null, error: err.message || 'Failed to load paper content' });
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