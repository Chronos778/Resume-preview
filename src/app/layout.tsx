import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'ResumeForge - Build Your Professional Resume',
  description: 'Create a modern, professional resume with real-time preview. Free online resume builder with AI-powered suggestions.',
  keywords: ['resume builder', 'cv maker', 'professional resume', 'job application'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
