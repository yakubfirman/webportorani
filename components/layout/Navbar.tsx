'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from '../../lib/i18n';
import Button from '../ui/Button';
import { HeroData } from '../../types';
import { api } from '../../lib/api';


interface NavbarProps {
  heroName?: string;
  heroData?: HeroData;

}

interface TranslationKeys {
  nav: {
    about: string;
    experience: string;
    skills: string;
    portfolio: string;
    testimonials: string;
    contact: string;
    hireMe: string;
  };
}

function getNavLinks(t: TranslationKeys) {
  return [
    { href: '#about',        label: t.nav.about },
    { href: '#experience',   label: t.nav.experience },
    { href: '#skills',       label: t.nav.skills },
    { href: '#portfolio',    label: t.nav.portfolio },
    { href: '#testimonials', label: t.nav.testimonials },
    { href: '#contact',      label: t.nav.contact },
  ];
}

export default function Navbar({ heroName, heroData }: NavbarProps) {
  const getFullUrl = (url: string) =>
  url?.startsWith('/api/uploads/') ? 'http://localhost:5000' + url : url;
  const { t } = useI18n();
  const navLinks = getNavLinks(t);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const photoUrl    = getFullUrl(heroData?.photo_url || '');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

const firstTwoWords = heroName ? heroName.split(' ').slice(0, 2).join(' ') : 'Portfolio';
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? 'bg-gradient-to-b from-white/99 to-white/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(190,24,93,0.08)]'
            : 'bg-gradient-to-b backdrop-blur-md'
        }`}
      >
        <div className={`max-w-6xl mx-auto flex items-center justify-between px-6  transition-all ${
          scrolled ? 'py-3' : 'py-5'
        }`}>

          {/* Logo */}
          <a
            href="#hero"
            className="group flex items-center gap-1.5 select-none"
            aria-label="Home"
          >
            <div className="relative h-9 w-9 scale-100 overflow-hidden rounded-full ring-1 ring-red-800/60 transition-all duration-300 group-hover:scale-105 group-hover:ring-red-500/80">
              {photoUrl ? (
                // Use plain img to avoid requiring next/image remote config for localhost backend
                <img src={photoUrl} alt={`${firstTwoWords}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold">
                  {firstTwoWords.split(' ').map((s) => s[0]).filter(Boolean).join('')}
                </div>
              )}
            </div>
            <span
              className={`text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent font-black`}
            >
              <span className=""></span>
              {firstTwoWords}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative px-4 py-1 text-sm font-semibold rounded-xs transition-all duration-200 flex items-center gap-2 ${
                      scrolled
                        ? isActive
                          ? 'text-pink-600 font-bold'
                          : 'text-slate-700 hover:text-pink-600'
                        : isActive
                        ? 'text-pink-600 bg-white/20 font-bold backdrop-blur-sm'
                        : 'text-slate-700 hover:text-pink-600'
                    }`}
                  >
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-pink-500 flex-shrink-0 animate-pulse" />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 text-sm font-bold px-3 py-1 rounded-sm transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-gradient-to-r from-pink-600 to-rose-500 text-white hover:from-pink-700 hover:to-rose-600 hover:scale-105"
            >
              <span className="relative z-10">{t.nav.hireMe}</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <Button
            className={`md:hidden w-9 h-9 rounded-xs flex items-center justify-center transition-all duration-200 ${
              scrolled
                ? 'text-slate-700 hover:bg-slate-100 active:scale-95'
                : 'text-pink-500 hover:bg-white/15 active:scale-95'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            variant="ghost"
          >
            <FontAwesomeIcon
              icon={menuOpen ? faXmark : faBars}
              className={`w-[18px] h-[18px] transition-transform duration-200 ${menuOpen ? 'rotate-90' : 'rotate-0'}`}
            />
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white backdrop-blur-xl border-t border-pink-100 px-4 pt-4 pb-5 shadow-xl">
            <ul className="flex flex-col gap-0.5 mb-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xs text-sm font-semibold transition-all duration-150 ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-pink-600 to-rose-500 font-bold shadow-md'
                          : 'text-slate-700 hover:text-pink-600 hover:bg-pink-50'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {isActive && <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" />}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-600 to-rose-500 text-white font-semibold text-sm px-4 py-3 rounded-xs hover:from-pink-700 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl active:scale-95"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.hireMe}

            </a>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}