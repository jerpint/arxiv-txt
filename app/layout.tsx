import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ReactNode } from 'react';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'arXiv-txt.org - LLM-friendly arXiv papers',
  description: 'Convert arXiv papers into LLM-friendly formats',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" >
      <body className={inter.className}>
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar bg-base-300">
              <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </label>
              </div>
              <div className="flex-1 px-2 mx-2">
                <Link href="/" className="text-xl font-bold">arXiv-txt.org</Link>
                <span className="ml-4 text-sm opacity-70">LLM-friendly arXiv papers</span>
                <a href="https://github.com/jerpint/arxiv-txt" className="ml-4 link inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  GitHub
                  <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            {/* Page content */}
            <main className="container mx-auto px-4 py-8 max-w-3xl">
              {children}
              <Analytics />
            </main>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200">
              <li><Link href="/">Home</Link></li>
              {/* Add more menu items here */}
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
}