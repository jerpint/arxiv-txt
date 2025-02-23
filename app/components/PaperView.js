'use client';

import { Toaster, toast } from 'react-hot-toast';
import Metadata from '@/app/components/Metadata';

export default function PaperView({ paper, plainText, buttonText, type }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
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
              <div className="flex gap-2 text-sm">
                {/* <a href={`/raw/abs/${paper.id}`} className="link link-primary">raw/abs/</a>
                <span>•</span>
                <a href={`/raw/pdf/${paper.id}`} className="link link-primary">raw/pdf/</a>
                <span>•</span> */}
                <a href={`/pdf/${paper.id}`} className="link link-primary">arxiv-txt: pdf</a>
                <span>|</span>
                <a href={`/abs/${paper.id}`} className="link link-primary">arxiv-txt: abs</a>
              </div>
              <details className="dropdown">
                <summary className="btn btn-ghost btn-sm">
                  View on arXiv
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </summary>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <a href={`https://arxiv.org/abs/${paper.id}`} target="_blank" rel="noopener noreferrer">
                      Paper Page
                    </a>
                  </li>
                  <li>
                    <a href={`https://arxiv.org/pdf/${paper.id}.pdf`} target="_blank" rel="noopener noreferrer">
                      Download PDF
                    </a>
                  </li>
                </ul>
              </details>
            </div>
            <div className="flex gap-2">
              <a
                href={`/raw/${type}/${paper.id}`}
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
                {buttonText}
              </button>
            </div>
          </div>

          <Metadata paper={paper} />
          {paper.doi && (
            <div className="text-sm text-base-content/70">
              DOI: <a
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                {paper.doi}
              </a>
            </div>
          )}

          <div className="divider"></div>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Machine-Readable Format</h2>
              <div className="flex gap-2">
                <a
                  href={`/raw/${type}/${paper.id}`}
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
                  {buttonText}
                </button>
              </div>
            </div>
            <pre className="bg-base-200 p-4 rounded-box overflow-auto text-sm font-mono whitespace-pre-wrap">
              {plainText}
            </pre>
          </section>
        </div>
      </div>
    </>
  );
}
