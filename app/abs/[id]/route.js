import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import { getArxivApiUrl, normalizePaperId } from '@/app/lib/arxiv';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return new NextResponse('Paper ID is required', {
        status: 400,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    const normalizedId = normalizePaperId(id);
    const arxivUrl = getArxivApiUrl(normalizedId);
    const apiResponse = await fetch(arxivUrl, {
      headers: {
        'Accept': 'application/xml',
        'User-Agent': 'arXiv-txt.org (https://arxiv-txt.org; mailto:contact@arxiv-txt.org)'
      },
    });

    if (!apiResponse.ok) {
      return new NextResponse(
        `Error fetching paper data: ${apiResponse.status} ${apiResponse.statusText}`,
        {
          status: apiResponse.status,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        }
      );
    }

    // Get the XML data
    const xmlData = await apiResponse.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_'
    });
    const result = parser.parse(xmlData);
    const entry = result.feed.entry;

    // Extract data more reliably
    const title = entry.title;
    const abstract = entry.summary;
    const authors = Array.isArray(entry.author)
      ? entry.author.map(a => a.name)
      : [entry.author.name];
    const categories = Array.isArray(entry.category)
      ? entry.category.map(c => c['@_term'])
      : [entry.category['@_term']];
    const published = entry.published;
    const arxivId = entry.id.split('/').pop();
    const doi = entry['arxiv:doi'];
    const journalRef = entry['arxiv:journal_ref'];

    // Format dates if present
    const publishedDate = formatDate(published);

    // Fetch BibTeX from arXiv
    const bibtexUrl = `https://arxiv.org/bibtex/${normalizedId}`;
    const bibtexResponse = await fetch(bibtexUrl, {
      headers: {
        'User-Agent': 'arXiv-txt.org (https://arxiv-txt.org; mailto:contact@arxiv-txt.org)'
      },
    });

    let bibtexContent = '';
    if (bibtexResponse.ok) {
      bibtexContent = await bibtexResponse.text();
    } else {
      console.error(`Failed to fetch BibTeX: ${bibtexResponse.status} ${bibtexResponse.statusText}`);
      // Continue even if BibTeX fetch fails
    }

    // Generate plain text format
    const plainTextContent = `# Title
${title}

# Authors
${authors.join(', ')}

# Abstract
${abstract}

# Categories
${categories.join(', ')}

# Publication Details
- Published: ${publishedDate}
- arXiv ID: ${arxivId}
${doi ? `- DOI: ${doi}` : ''}
${journalRef ? `- Journal Reference: ${journalRef}` : ''}

${bibtexContent ? `# BibTeX
${bibtexContent}
` : ''}
`;

    return new NextResponse(plainTextContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400' // Cache for 1 day
      }
    });

  } catch (error) {
    console.error('Error processing paper data:', error);
    return new NextResponse(
      `Failed to process paper data: ${error.message}`,
      {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      }
    );
  }
}

function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export const revalidate = 86400; // 24 hours in seconds