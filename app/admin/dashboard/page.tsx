'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../../lib/api';

import HeroEditor from '../../../components/admin/HeroEditor';
import AboutEditor from '../../../components/admin/AboutEditor';
import ExperienceEditor from '../../../components/admin/ExperienceEditor';
import SkillsEditor from '../../../components/admin/SkillsEditor';
import PortfolioEditor from '../../../components/admin/PortfolioEditor';
import TestimonialsEditor from '../../../components/admin/TestimonialsEditor';
import ContactEditor from '../../../components/admin/ContactEditor';
import MessagesViewer from '../../../components/admin/MessagesViewer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse, faUser, faBriefcase, faGears, faFolderOpen,
  faComments, faPhone, faEnvelope, faBars, faArrowUpRightFromSquare,
  faRightFromBracket, type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

type Section =
  | 'hero' | 'about' | 'experience' | 'skills'
  | 'portfolio' | 'testimonials' | 'contact' | 'messages';

const menuItems: { id: Section; label: string; icon: IconDefinition }[] = [
  { id: 'hero',         label: 'Hero',         icon: faHouse },
  { id: 'about',        label: 'Tentang Saya', icon: faUser },
  { id: 'experience',   label: 'Pengalaman',   icon: faBriefcase },
  { id: 'skills',       label: 'Keahlian',     icon: faGears },
  { id: 'portfolio',    label: 'Portofolio',   icon: faFolderOpen },
  { id: 'testimonials', label: 'Testimoni',    icon: faComments },
  { id: 'contact',      label: 'Kontak',       icon: faPhone },
  { id: 'messages',     label: 'Pesan Masuk',  icon: faEnvelope },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const [username, setUsername] = useState('');
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.replace('/admin'); return; }
    try {
      const res = await api.verify();
      setUsername(res.username);
    } catch {
      localStorage.removeItem('admin_token');
      router.replace('/admin');
    } finally {
      setChecking(false);
    }
  }, [router]);

  const fetchUnread = useCallback(async () => {
    try {
      const msgs = await api.getMessages() as { is_read: boolean }[];
      setUnreadCount(msgs.filter((m) => !m.is_read).length);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    checkAuth();
    fetchUnread();
    const interval = setInterval(fetchUnread, 60_000);
    return () => clearInterval(interval);
  }, [checkAuth, fetchUnread]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.replace('/admin');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'hero':         return <HeroEditor />;
      case 'about':        return <AboutEditor />;
      case 'experience':   return <ExperienceEditor />;
      case 'skills':       return <SkillsEditor />;
      case 'portfolio':    return <PortfolioEditor />;
      case 'testimonials': return <TestimonialsEditor />;
      case 'contact':      return <ContactEditor />;
      case 'messages':     return <MessagesViewer />;
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: '#f0f4f8' }}>
        <div className="w-8 h-8 border-4 border-gray-200 border-t-navy rounded-full animate-spin"
          style={{ borderTopColor: '#0f3460' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate" style={{ backgroundColor: '#f0f4f8' }}>
      {/* ─── Sidebar ─────────────────────────────────────────────── */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`fixed inset-y-0 left-0 z-30 w-64 flex flex-col transition-transform duration-300
          md:sticky md:top-0 md:h-screen md:translate-x-0 md:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ background: 'linear-gradient(180deg, #1e1b4b 0%, #12104a 100%)' }}>

          {/* Brand */}
          <div className="p-5 border-b border-white/10">
            <p className="text-white font-bold text-lg">Admin Panel</p>
            <p className="text-white/50 text-xs mt-0.5">Portfolio Management</p>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl mb-1
                             text-sm font-medium transition-colors text-left relative
                             ${activeSection === item.id
                               ? 'bg-white/15 text-white'
                               : 'text-white/60 hover:bg-white/8 hover:text-white'}`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                {item.label}
                {item.id === 'messages' && unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold
                                   px-1.5 py-0.5 rounded-full leading-none">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <a href="/" target="_blank"
              className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-white/60
                         hover:text-white hover:bg-white/8 text-sm transition-colors">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-4 h-4" />
              Lihat Portfolio
            </a>
            <button onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-red-400
                         hover:text-red-300 hover:bg-red-400/10 text-sm transition-colors">
              <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>
      </>

      {/* ─── Main Content ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}>
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-navy text-lg">
              {menuItems.find((m) => m.id === activeSection)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center
                            text-navy font-bold text-sm">
              {username.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-gray-600 hidden sm:block">{username}</span>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
