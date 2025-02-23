'use client';

import { use } from 'react';
import LoadingState from '@/app/components/LoadingState';
import Layout from '@/app/components/Layout';
import { usePaperMetadata } from '@/app/hooks/usePaperMetadata';
import PaperView from '@/app/components/PaperView';

export default function AbstractPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { paper, loading, error, plainTextMetadata } = usePaperMetadata(id);

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

  return (
    <>
      <PaperView
        paper={paper}
        plainText={plainTextMetadata}
        buttonText="Abstract"
        type="abs"
      />
      <Layout />
    </>
  );
}
