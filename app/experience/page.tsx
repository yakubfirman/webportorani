import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ExperienceData, ContactInfoData, HeroData } from '@/types';
import ExperienceGrid from './ExperienceGrid';

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

export const metadata: Metadata = {
  title: 'Semua Pengalaman — Maharani Rizka Ramadhani Wijaya',
  description: 'Riwayat lengkap pengalaman pendidikan formal dan praktik kerja lapangan (PKL).',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Semua Pengalaman — Maharani Rizka Ramadhani Wijaya',
    description: 'Riwayat lengkap pengalaman pendidikan formal dan praktik kerja lapangan (PKL).',
    url: `${SITE_URL}/experience`,
    type: 'website',
  },
};

export default async function ExperiencePage() {
  const [experiences, contact, hero] = await Promise.all([
    fetchJson('/api/experiences') as Promise<ExperienceData[] | null>,
    fetchJson('/api/contact-info') as Promise<ContactInfoData | null>,
    fetchJson('/api/hero') as Promise<HeroData | null>,
  ]);
  
  // Sort experiences by order (descending - latest first)
  const sortedExperiences = experiences?.sort((a, b) => (b.order ?? 0) - (a.order ?? 0)) ?? [];

  return (
    <>
      <Navbar heroName={hero?.name} heroData={hero ?? undefined} />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-6">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-xs opacity-20 animate-pulse-slow"
              style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(70px)' }} />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-xs opacity-20 animate-pulse-slower"
              style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(60px)' }} />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(190,24,93,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(190,24,93,0.02)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Semua Pengalaman
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Riwayat lengkap pengalaman pendidikan formal dan praktik kerja lapangan (PKL)
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto relative z-10">
            {sortedExperiences && sortedExperiences.length > 0 ? (
              <ExperienceGrid items={sortedExperiences} />
            ) : (
              <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-xs border-2 border-dashed border-pink-200 max-w-3xl mx-auto">
                <p className="text-lg text-slate-500 font-medium">Belum ada data pengalaman.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer contactData={contact} />
    </>
  );
}
