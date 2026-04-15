import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { I18nProvider } from '../lib/i18n';
import { resolveUrl } from '../lib/api';
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultMetadata: Metadata = {
  title: "Maharani Rizka Ramadhani Wijaya",
  description: "Portfolio profesional lulusan Pendidikan Bahasa Inggris",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://maharanirizka.vercel.app/'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maharanirizka.vercel.app/';
  const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://apiportomaharani.pythonanywhere.com').replace(/\/+$/g, '');
  try {
    const res = await fetch(`${API_URL}/api/hero`, { next: { revalidate: 60 } });
    if (!res.ok) return defaultMetadata;
    const hero = await res.json();
    const img = hero?.photo_url ? resolveUrl(hero.photo_url) : '/favicon.svg';

    return {
      title: defaultMetadata.title,
      description: defaultMetadata.description,
      metadataBase: new URL(SITE_URL),
      icons: {
        icon: img,
        shortcut: '/favicon.svg',
        apple: '/favicon.svg',
      },
      openGraph: {
        title: defaultMetadata.title,
        description: defaultMetadata.description,
        images: [{ url: img, alt: 'Profile image' }],
      },
      twitter: {
        card: 'summary_large_image',
        images: [img],
      },
    } as Metadata;
  } catch (e) {
    return defaultMetadata;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/api/favicon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon-32.png" />
      </head>
      <body className="min-h-full flex flex-col">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
