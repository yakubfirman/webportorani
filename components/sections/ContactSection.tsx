'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope, faPhone, faLocationDot,
  faPaperPlane, faCircleCheck, faCircleXmark,
  faSpinner, faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { ContactInfoData } from '../../types';
import { api } from '../../lib/api';
import Button from '../ui/Button';

interface Props {
  data: ContactInfoData | null;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection({ data }: Props) {
  const [form, setForm]   = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await api.sendMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Gagal mengirim pesan.');
    }
  };

  const inputClass =
    'w-full bg-slate-50/50 border border-pink-200 rounded-xs px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 hover:border-pink-300 transition-all duration-300 shadow-sm';

  type ContactItem = {
    href: string; icon: typeof faEnvelope; label: string; value: string;
    iconBg: string; iconColor: string; hoverBg: string; external?: boolean;
  };

  const contactItems: ContactItem[] = [
    data?.email && {
      href: `mailto:${data.email}`,
      icon: faEnvelope,
      label: 'Email',
      value: data.email,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
      hoverBg: 'group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500',
    },
    data?.phone && {
      href: `tel:${data.phone}`,
      icon: faPhone,
      label: 'WhatsApp / Telepon',
      value: data.phone,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      hoverBg: 'group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500',
    },
    data?.linkedin_url && {
      href: data.linkedin_url,
      icon: faLinkedinIn,
      label: 'LinkedIn',
      value: 'Lihat Profil',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      hoverBg: 'group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
      external: true,
    },
    data?.instagram && {
      href: `#`,
      icon: faInstagram,
      label: 'Instagram',
      value: data.instagram,
      iconBg: 'bg-pink-50',
      iconColor: 'text-pink-500',
      hoverBg: 'group-hover:bg-pink-500 group-hover:text-white group-hover:border-pink-500',
    },
  ].filter(Boolean) as ContactItem[];

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Background Decorative Elements (Matching Theme) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-xs opacity-20 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(70px)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-xs opacity-20 animate-pulse-slower"
          style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-xs opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle, #fce7f3, transparent)', filter: 'blur(50px)', animationDelay: '1s' }} />
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(190,24,93,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(190,24,93,0.02)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-32 right-20 w-20 h-20 border-2 border-pink-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-40 left-16 w-16 h-16 border-2 border-purple-400/10 rotate-45 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in relative">
          {/* Decorative quote marks */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none">
            <FontAwesomeIcon icon={faQuoteLeft} className="text-6xl text-pink-500" />
          </div>
          
          <h2 className="section-title text-4xl md:text-5xl font-bold animate-fade-in delay-100 mb-4 relative">
            Hubungi Saya
            {/* Decorative dots */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/30"></div>
            </div>
          </h2>
          
          <p className="section-subtitle mx-auto text-center animate-fade-in delay-200 text-slate-600 max-w-2xl mb-6">
            Tertarik untuk berkolaborasi atau memiliki pertanyaan? Jangan ragu untuk menghubungi.
          </p>
          
          <div className="w-16 h-1 rounded-xs mx-auto animate-fade-in delay-300 relative" 
            style={{background: 'linear-gradient(90deg, #be185d, #e0bbff)'}}>
            {/* Small accent circles on line */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-500"></div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-14 relative">
          {/* Connecting line between columns (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-pink-200 to-transparent"></div>

          {/* Contact Form Container */}
          <div className="animate-fade-in delay-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5 text-pink-500" />
              Kirim Pesan
            </h3>

            {status === 'success' && (
              <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xs p-4 mb-5 text-sm shadow-sm animate-fade-in">
                <FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5 shrink-0 mt-0.5 text-green-500" />
                <span>Pesan berhasil dikirim! Saya akan segera membalas.</span>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xs p-4 mb-5 text-sm shadow-sm animate-fade-in">
                <FontAwesomeIcon icon={faCircleXmark} className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form Card (Matching Theme) */}
            <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 rounded-xs shadow-sm border-2 border-pink-100/50 p-8 space-y-5 transition-all duration-300 hover:shadow-lg relative overflow-hidden group/card">
              
              {/* Left accent bar */}
              <div className="absolute -left-0.5 top-6 bottom-6 w-1 bg-gradient-to-b from-pink-500 to-purple-400 rounded-r-full opacity-70 group-hover/card:opacity-100 transition-opacity"></div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-pink-50 opacity-50 transform rotate-45 translate-x-1/2 -translate-y-1/2 group-hover/card:bg-purple-50 transition-colors"></div>
              </div>
              
              {/* Hover sparkle effect */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <div>
                  <label className="text-[11px] font-bold text-pink-600 uppercase tracking-widest block mb-2">Nama *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nama lengkap"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-pink-600 uppercase tracking-widest block mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@contoh.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="relative z-10">
                <label className="text-[11px] font-bold text-pink-600 uppercase tracking-widest block mb-2">Subjek</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Topik pesan"
                  className={inputClass}
                />
              </div>

              <div className="relative z-10">
                <label className="text-[11px] font-bold text-pink-600 uppercase tracking-widest block mb-2">Pesan *</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tulis pesan Anda di sini..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="relative z-10 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed rounded-xs py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-semibold"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin text-white/80" />
                      <span className="ml-2">Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4 text-white/90" />
                      <span className="ml-2">Kirim Pesan</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in delay-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-purple-500" />
              Informasi Kontak
            </h3>

            <div className="space-y-3 mb-6">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 group p-3 rounded-xs bg-white/70 hover:bg-white border border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className={`w-12 h-12 rounded-xs ${item.iconBg} flex items-center justify-center shrink-0 border border-transparent ${item.hoverBg} transition-all duration-300`}>
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`w-5 h-5 ${item.iconColor} group-hover:text-white transition-colors duration-300`}
                    />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-slate-800 font-semibold text-sm group-hover:text-pink-600 transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Address Card */}
            {data?.address && (
              <div className="bg-gradient-to-r from-pink-50/80 to-purple-50/80 border border-pink-200 rounded-xs p-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xs bg-white border border-pink-100 shadow-sm flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faLocationDot} className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-[11px] text-pink-600 font-bold uppercase tracking-widest mb-1">Lokasi</p>
                  <p className="text-slate-700 font-medium text-sm leading-relaxed">{data.address}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}