'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import { parseArxivResponse, generatePlainTextFormat } from '@/app/lib/arxiv';
import Metadata from '@/app/components/Metadata';
import LoadingState from '@/app/components/LoadingState';
import { Toaster, toast } from 'react-hot-toast';

export default function PaperPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPaper() {
      setLoading(true);
      setError(null);

      try {
        // Fetch paper data from our API route
        const response = await fetch(`/api/arxiv/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch paper: ${response.status} ${response.statusText}`);
        }

        const xmlData = await response.text();
        const paperData = parseArxivResponse(xmlData);
        setPaper(paperData);
      } catch (err) {
        console.error('Error loading paper:', err);
        setError(err.message || 'Failed to load paper information');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPaper();
    }
  }, [id]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <h2 className="card-title text-error justify-center">Error</h2>
          <p>{error}</p>
          <p className="text-base-content/70">
            Please check that you have entered a valid arXiv paper ID.
          </p>
        </div>
      </div>
    );
  }

  if (!paper) {
    return null;
  }

  // Generate the plain text format
  const plainTextContent = generatePlainTextFormat(paper);

  // Move the function inside the component to access plainTextContent
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(plainTextContent);
      toast.success('Copied to clipboard!', {
        duration: 2000,
        style: {
          background: '#4ade80',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10b981',
        }
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error('Failed to copy text', {
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center gap-4">
            <h1 className="card-title text-2xl">{paper.title}</h1>
            <button
              onClick={copyToClipboard}
              className="btn btn-primary btn-sm gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy
            </button>
          </div>

          <Metadata paper={paper} />

          <div className="divider"></div>

          <section>
            <h2 className="text-xl font-semibold mb-4">Abstract</h2>
            <p className="text-base-content/80 leading-relaxed">{paper.abstract}</p>
          </section>

          <div className="divider"></div>

          <section>
            <h2 className="text-xl font-semibold mb-4">Links</h2>
            <ul className="menu bg-base-200 w-fit rounded-box">
              <li>
                <a
                  href={`https://arxiv.org/abs/${paper.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on arXiv
                </a>
              </li>
              <li>
                <a
                  href={`https://arxiv.org/pdf/${paper.id}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download PDF
                </a>
              </li>
              {paper.doi && (
                <li>
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DOI: {paper.doi}
                  </a>
                </li>
              )}
            </ul>
          </section>

          <div className="divider"></div>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Machine-Readable Format</h2>
              <button
                onClick={copyToClipboard}
                className="btn btn-primary btn-sm gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy
              </button>
            </div>
            <pre className="bg-base-200 p-4 rounded-box overflow-auto text-sm font-mono whitespace-pre-wrap">
              {plainTextContent}
            </pre>
          </section>
        </div>
      </div>
    </>
  );
}