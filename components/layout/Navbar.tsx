'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {
  heroName?: string;
}

const navLinks = [
  { href: '#about',        label: 'Tentang Saya' },
  { href: '#experience',   label: 'Pengalaman'   },
  { href: '#skills',       label: 'Keahlian'     },
  { href: '#portfolio',    label: 'Portofolio'   },
  { href: '#testimonials', label: 'Testimoni'    },
  { href: '#contact',      label: 'Kontak'       },
];

export default function Navbar({ heroName }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-max flex items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#hero"
          className={`text-lg font-bold tracking-tight transition-colors ${
            scrolled ? 'text-navy' : 'text-white'
          }`}
        >
          <span className="text-gold">/</span>
          {heroName ? heroName.split(' ')[0] : 'Portfolio'}
          <span className="text-gold">.</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors relative group ${
                  scrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gold rounded-full transition-all duration-300 group-hover:w-full`} />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className={`hidden md:inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${
            scrolled
              ? 'bg-navy text-white hover:bg-navy/90'
              : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
          }`}
        >
          Hubungi Saya
        </a>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
            scrolled ? 'text-navy hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t border-gray-100 px-6 transition-all duration-300 overflow-hidden ${
        menuOpen ? 'max-h-80 py-4 shadow-xl' : 'max-h-0'
      }`}>
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-gray-700 font-medium hover:text-navy hover:bg-gray-50 block px-3 py-2.5 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2 pt-2 border-t border-gray-100">
            <a
              href="#contact"
              className="block text-center bg-navy text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-navy/90 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Hubungi Saya
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
