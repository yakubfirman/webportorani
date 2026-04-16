import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { resolveUrl } from '@/lib/api';
import { TestimonialData, ContactInfoData } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

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
  title: 'Semua Testimoni — Maharani Rizka Ramadhani Wijaya',
  description: 'Kumpulan lengkap testimoni dari dosen pembimbing, guru pamong, dan mantan siswa.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Semua Testimoni — Maharani Rizka Ramadhani Wijaya',
    description: 'Kumpulan lengkap testimoni dari dosen pembimbing, guru pamong, dan mantan siswa.',
    url: `${SITE_URL}/testimonials`,
    type: 'website',
  },
};

export default async function TestimonialsPage() {
  const [testimonials, contact] = await Promise.all([
    fetchJson('/api/testimonials') as Promise<TestimonialData[] | null>,
    fetchJson('/api/contact-info') as Promise<ContactInfoData | null>,
  ]);
  
  // Sort testimonials by order (descending - latest first)
  const sortedTestimonials = testimonials?.sort((a, b) => (b.order ?? 0) - (a.order ?? 0)) ?? [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-6">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 right-0 w-72 h-72 rounded-xs opacity-20 animate-pulse-slow"
              style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(70px)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-xs opacity-20 animate-pulse-slower"
              style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(60px)' }} />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(190,24,93,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(190,24,93,0.02)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Semua Testimoni
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Kesan dan pengalaman dari dosen pembimbing PKL, guru pamong, dan mantan siswa
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto relative z-10">
            {sortedTestimonials && sortedTestimonials.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {sortedTestimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id ?? index}
                    className="bg-white bg-opacity-90 border-2 border-pink-100/50 rounded-xs p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group/card"
                  >
                    {/* Left accent bar */}
                    <div className="absolute -left-0.5 top-8 bottom-8 w-1 bg-gradient-to-b from-pink-500 to-purple-400 rounded-r-full opacity-70 group-hover/card:opacity-100 transition-opacity"></div>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                      <div className="absolute top-0 right-0 w-full h-full bg-pink-50 opacity-50 transform rotate-45 translate-x-1/2 -translate-y-1/2 group-hover/card:bg-purple-50 transition-colors"></div>
                    </div>

                    {/* Hover sparkle effect */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

                    <div>
                      {/* Quote icon & Stars Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xs bg-pink-50 border border-pink-100 flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300">
                          <FontAwesomeIcon icon={faQuoteLeft} className="w-4 h-4 text-pink-500" />
                        </div>

                        <div className="flex gap-1 mt-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="w-3.5 h-3.5 text-yellow-400" />
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <p className="text-slate-700 text-base md:text-lg leading-relaxed italic relative z-10 pl-2 border-l-2 border-transparent group-hover/card:border-pink-200 transition-colors mb-4">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pt-3 border-t border-pink-100 mt-3 relative">
                      <div className="w-12 h-12 rounded-xs bg-pink-50 flex items-center justify-center overflow-hidden shrink-0 border border-pink-100 group-hover/card:border-pink-300 transition-colors">
                        {testimonial.photo_url ? (
                          <img src={resolveUrl(testimonial.photo_url)} alt={testimonial.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-300" />
                        ) : (
                          <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-pink-300" />
                        )}
                      </div>
                      <div>
                        <p className="text-slate-800 font-bold text-sm md:text-base leading-tight group-hover/card:text-pink-600 transition-colors">{testimonial.name}</p>
                        {testimonial.role && (
                          <p className="text-pink-500 text-xs mt-0.5 font-medium">{testimonial.role}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-xs border-2 border-dashed border-pink-200 max-w-3xl mx-auto">
                <FontAwesomeIcon icon={faQuoteLeft} className="w-12 h-12 mx-auto mb-4 text-pink-300 opacity-50" />
                <p className="text-lg text-slate-500 font-medium">Belum ada testimoni.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer contactData={contact} />
    </>
  );
}
