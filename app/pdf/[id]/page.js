'use client';

import { use } from 'react';
import LoadingState from '@/app/components/LoadingState';
import Layout from '@/app/components/Layout';
import { usePaperContent } from '@/app/hooks/usePaperContent';
import { usePaperMetadata } from '@/app/hooks/usePaperMetadata';
import PaperView from '@/app/components/PaperView';

export default function HTMLPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { paper, loading: paperLoading, error: paperError } = usePaperMetadata(id);
  const { paperContent, loading: paperContentLoading, error: paperContentError } = usePaperContent(id);

  if (paperLoading || paperContentLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <div className="text-sm border-l-4 border-base-content/20 pl-4 py-1 mb-4 text-base-content/80">
        The PDF extraction is experimental. Please report any issues on <a href="https://github.com/jerpint/arxiv-txt/issues" className="underline">GitHub</a>.
      </div>
      {paperError || paperContentError ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title text-error justify-center">Error</h2>
            <p>{paperError || paperContentError}</p>
            <p className="text-base-content/70">
              Please check that you have entered a valid arXiv paper ID.
            </p>
          </div>
        </div>
      ) : !paperContent ? null : (
        <>
          <PaperView
            paper={paper}
            plainText={paperContent}
            buttonText="PDF Text"
            type="html"
          />
          <Layout />
        </>
      )}
    </>
  );
}
