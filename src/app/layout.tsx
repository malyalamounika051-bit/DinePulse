import type { Metadata } from 'next';
import './globals.css';
import ClickArrowEffect from '@/components/ClickArrowEffect';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'DinePulse — Royal Gastronomy & Hospitality Platform',
  description: 'AI-Powered restaurant platform — live kitchen display, QR ordering, smart table reservations, inventory forecasting, and manager intelligence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600;700;900&family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-gold selection:text-rama-bg">
        <AuthProvider>
          {/* Click-triggered shooting golden arrow effect */}
          <ClickArrowEffect />

          {/* Ember particle field — battlefield fire */}
          <div className="ember-field" aria-hidden="true">
            <div className="ember" />
            <div className="ember" />
            <div className="ember" />
            <div className="ember" />
            <div className="ember" />
            <div className="ember" />
            <div className="ember" />
            <div className="ember" />
            <div className="ember" />
            <div className="ember" />
            <div className="ember" />
            <div className="ember" />
          </div>

          {/* Arrow streak overlay */}
          <div className="arrow-streak" aria-hidden="true" />

          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
