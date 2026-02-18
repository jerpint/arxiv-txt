"use client";

import { useState } from 'react';

export default function ArxivInput() {
  const [arxivId, setArxivId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input (basic validation)
    if (!arxivId.trim()) {
      return;
    }

    // Extract arXiv ID from different possible formats
    let cleanId = arxivId.trim();

    // Handle URLs like arxiv.org/abs/[id] or arxiv.org/pdf/[id]
    if (cleanId.includes('arxiv.org/')) {
      // Extract ID from URL
      const matches = cleanId.match(/arxiv\.org\/(abs|pdf)\/([^\/\s]+)/);
      if (matches && matches[2]) {
        cleanId = matches[2];
      }
    }

    // Remove version suffix if present (e.g., 1706.03762v1 -> 1706.03762)
    cleanId = cleanId.replace(/v\d+$/, '');

    // Create the URL
    const arxivTxtUrl = `https://arxiv-txt.org/abs/${cleanId}`;

    // Open the URL in a new tab
    window.open(arxivTxtUrl, '_blank');
  };

  return (
    <div className="card bg-base-100 w-full max-w-2xl shadow-xl mb-6">
      <div className="card-body py-6">
        <h2 className="card-title mb-2">How it works</h2>
        <p className="mb-4">
        Replace <code className="badge badge-ghost">arxiv.org</code> to
        <code className="badge badge-ghost ml-2">arxiv-txt.org</code>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="arxiv-id" className="block text-sm font-medium mb-1">
              Enter arXiv ID or URL:
            </label>
            <div className="flex gap-2">
              <input
                id="arxiv-id"
                type="text"
                value={arxivId}
                onChange={(e) => setArxivId(e.target.value)}
                placeholder="e.g., 1706.03762 or https://arxiv.org/abs/1706.03762"
                className="input input-bordered flex-grow"
              />
              <button type="submit" className="btn btn-primary">
                Open
              </button>
            </div>
          </div>
          <div className="text-sm mt-1">
            Example:&nbsp;
            <a
              href="/abs/1706.03762"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              https://arxiv-txt.org/abs/1706.03762
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}