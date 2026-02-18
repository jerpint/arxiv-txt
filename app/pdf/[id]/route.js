// app/raw/pdf/[id]/route.js
import { fetchArxivHtml, convertHtmlToText, ArxivError } from '@/app/lib/arxiv';

export async function GET(request, { params }) {
  try {
    // Extract paper ID from params
    const { id } = params;

    if (!id) {
      return new Response('Paper ID is required', { status: 400 });
    }

    // Fetch HTML from arXiv
    const html = await fetchArxivHtml(id);

    // Convert to plain text
    const text = convertHtmlToText(html);

    // Return plain text response
    return new Response(text, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, s-maxage=86400', // Cache for 24 hours
      }
    });

  } catch (error) {
    console.error(`Error processing paper:`, error);

    if (error instanceof ArxivError) {
      return new Response(error.message, {
        status: error.statusCode
      });
    }

    return new Response('Internal server error', {
      status: 500
    });
  }
}