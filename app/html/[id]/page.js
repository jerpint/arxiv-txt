'use client';

import { use } from 'react';
import LoadingState from '@/app/components/LoadingState';
import { Toaster, toast } from 'react-hot-toast';
import Layout from '@/app/components/Layout';
import { usePaperContent } from '@/app/hooks/usePaperContent';
import { usePaperMetadata } from '@/app/hooks/usePaperMetadata';

export default function PaperPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { paperContent, loading, error } = usePaperContent(id);
  const { paper, loading: metadataLoading, error: metadataError, plainTextMetadata } = usePaperMetadata(id);

  if (loading || metadataLoading) {
    return <LoadingState />;
  }

  if (error || metadataError) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <h2 className="card-title text-error justify-center">Error</h2>
          <p>{error || metadataError}</p>
          <p className="text-base-content/70">
            Please check that you have entered a valid arXiv paper ID.
          </p>
        </div>
      </div>
    );
  }

  if (!paperContent) {
    return null;
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(paperContent);
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
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-4">
              <h1 className="card-title text-2xl">{paper.title}</h1>
              <details className="dropdown">
                <summary className="btn btn-ghost btn-sm">
                  View paper
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </summary>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
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
                </ul>
              </details>
            </div>
            <div className="flex gap-2">
              <a
                href={`/raw/abs/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Raw
              </a>
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
          </div>

          <pre className="bg-base-200 p-4 rounded-box overflow-auto text-sm font-mono whitespace-pre-wrap">
            {paperContent}
          </pre>
        </div>
      </div>
      <Layout></Layout>
    </>
  );
}