import type { Metadata } from 'next';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import SkillsSection from '../components/sections/SkillsSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';

import { resolveUrl } from '../lib/api';
import {
  HeroData, AboutData, ExperienceData, SkillData,
  PortfolioItemData, TestimonialData, ContactInfoData,
} from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apiportomaharani.pythonanywhere.com';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

async function fetchJson(path: string) {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error('fetch error', e);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const hero = (await fetchJson('/api/hero')) as HeroData | null;
  const name = hero?.name || 'Maharani Rizka Ramadhani Wijaya';
  const headline = hero?.headline || 'English Educator & Curriculum Specialist';
  const description = hero?.subheadline || 'Portfolio profesional lulusan Pendidikan Bahasa Inggris';
  const image = hero?.photo_url ? resolveUrl(hero.photo_url) : `${SITE_URL}/favicon.svg`;

  return {
    title: `${name} — ${headline}`,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: `${name} — ${headline}`,
      description,
      url: SITE_URL,
      siteName: name,
      images: [
        { url: image, alt: `${name} — Profile`, width: 1200, height: 630 },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} — ${headline}`,
      description,
      images: [image],
    },
    icons: {
      icon: image,
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
    },
    alternates: {
      canonical: SITE_URL,
      languages: {
        'en': SITE_URL,
        'id': `${SITE_URL}/id`,
      },
    },
  } as Metadata;
}

export default async function Home() {
  const [hero, about, experiences, skills, portfolio, testimonials, contact] = await Promise.all([
    fetchJson('/api/hero') as Promise<HeroData | null>,
    fetchJson('/api/about') as Promise<AboutData | null>,
    fetchJson('/api/experiences') as Promise<ExperienceData[] | null>,
    fetchJson('/api/skills') as Promise<SkillData[] | null>,
    fetchJson('/api/portfolio') as Promise<PortfolioItemData[] | null>,
    fetchJson('/api/testimonials') as Promise<TestimonialData[] | null>,
    fetchJson('/api/contact-info') as Promise<ContactInfoData | null>,
  ]);

  const data = {
    hero: hero as HeroData | null,
    about: about as AboutData | null,
    experiences: (experiences || []) as ExperienceData[],
    skills: (skills || []) as SkillData[],
    portfolio: (portfolio || []) as PortfolioItemData[],
    testimonials: (testimonials || []) as TestimonialData[],
    contact: contact as ContactInfoData | null,
  };

  return (
    <>
      <Navbar heroName={data.hero?.name} heroData={data.hero ?? undefined} />
      <main>
        <HeroSection data={data.hero} />
        <AboutSection data={data.about} />
        <ExperienceSection data={data.experiences} />
        <SkillsSection data={data.skills} />
        <PortfolioSection data={data.portfolio} />
        <TestimonialsSection data={data.testimonials} />
        <ContactSection data={data.contact} />
      </main>
      <Footer contactData={data.contact} />
      {/* Structured data (JSON-LD) for Person and WebSite to help search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: data.hero?.name || 'Maharani Rizka Ramadhani Wijaya',
          jobTitle: data.hero?.headline || 'English Educator & Curriculum Specialist',
          url: SITE_URL,
          image: data.hero?.photo_url ? resolveUrl(data.hero.photo_url) : `${SITE_URL}/favicon.svg`,
          description: data.hero?.subheadline || undefined,
        }) }}
      />
    </>
  );
}
