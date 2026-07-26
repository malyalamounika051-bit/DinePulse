import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DinePulse AI - Full-Stack SaaS Restaurant Operations & Customer Experience Platform',
  description: 'AI-Powered SaaS platform transforming restaurant dining, live KDS order tracking, smart table reservations, inventory forecasting, and manager intelligence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
