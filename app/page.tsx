'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import SkillsSection from '../components/sections/SkillsSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';

import { api } from '../lib/api';
import {
  HeroData, AboutData, ExperienceData, SkillData,
  PortfolioItemData, TestimonialData, ContactInfoData,
} from '../types';

interface PageData {
  hero: HeroData | null;
  about: AboutData | null;
  experiences: ExperienceData[];
  skills: SkillData[];
  portfolio: PortfolioItemData[];
  testimonials: TestimonialData[];
  contact: ContactInfoData | null;
}

export default function Home() {
  const [data, setData] = useState<PageData>({
    hero: null, about: null,
    experiences: [], skills: [],
    portfolio: [], testimonials: [],
    contact: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getHero(),
      api.getAbout(),
      api.getExperiences(),
      api.getSkills(),
      api.getPortfolio(),
      api.getTestimonials(),
      api.getContactInfo(),
    ]).then(([hero, about, experiences, skills, portfolio, testimonials, contact]) => {
      setData({
        hero: hero as HeroData,
        about: about as AboutData,
        experiences: experiences as ExperienceData[],
        skills: skills as SkillData[],
        portfolio: portfolio as PortfolioItemData[],
        testimonials: testimonials as TestimonialData[],
        contact: contact as ContactInfoData,
      });
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0f3460, #0a2442)' }}>
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Memuat portfolio...</p>
        </div>
      </div>
    );
  }

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
      <Footer />
    </>
  );
}
