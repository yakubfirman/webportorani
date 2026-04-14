'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope, faPhone, faLocationDot,
  faPaperPlane, faCircleCheck, faCircleXmark,
  faSpinner,
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
    'w-full border-2 border-pink-300 rounded-xs px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all bg-white hover:border-pink-400';

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
      iconBg: 'bg-navy/8',
      iconColor: 'text-navy',
      hoverBg: 'group-hover:bg-navy',
    },
    data?.phone && {
      href: `tel:${data.phone}`,
      icon: faPhone,
      label: 'WhatsApp / Telepon',
      value: data.phone,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      hoverBg: 'group-hover:bg-green-600',
    },
    data?.linkedin_url && {
      href: data.linkedin_url,
      icon: faLinkedinIn,
      label: 'LinkedIn',
      value: 'Lihat Profil',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      hoverBg: 'group-hover:bg-blue-600',
      external: true,
    },
    data?.instagram && {
      href: `#`,
      icon: faInstagram,
      label: 'Instagram',
      value: data.instagram,
      iconBg: 'bg-pink-50',
      iconColor: 'text-pink-500',
      hoverBg: 'group-hover:bg-pink-500',
    },
  ].filter(Boolean) as ContactItem[];

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Decorative pastel blob */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-xs opacity-20 pointer-events-none animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 right-0 w-56 h-56 rounded-xs opacity-20 pointer-events-none animate-pulse-slower"
        style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(50px)' }} />
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="badge mb-4 bg-pink-100 text-pink-700 border-pink-200 animate-fade-in inline-flex items-center gap-2">Kontak</span>
          <h2 className="section-title text-4xl md:text-5xl font-bold animate-fade-in delay-100 mb-4">Hubungi Saya</h2>
          <p className="section-subtitle mx-auto text-center animate-fade-in delay-200 text-slate-600 max-w-2xl">
            Tertarik untuk berkolaborasi atau memiliki pertanyaan? Jangan ragu untuk menghubungi.
          </p>
          <div className="w-16 h-1 rounded-xs mx-auto mt-6 animate-fade-in delay-300" style={{background: 'linear-gradient(90deg, #be185d, #e0bbff)'}} />
        </div>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-bold text-pink-700 mb-6">Kirim Pesan</h3>

            {status === 'success' && (
              <div className="flex items-start gap-3 bg-green-50 border-2 border-green-300 text-green-700 rounded-xs p-4 mb-5 text-sm">
                <FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Pesan berhasil dikirim! Saya akan segera membalas.</span>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-start gap-3 bg-red-50 border-2 border-red-300 text-red-700 rounded-xs p-4 mb-5 text-sm">
                <FontAwesomeIcon icon={faCircleXmark} className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xs shadow-lg p-8 space-y-5 border-2 border-pink-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Nama *</label>
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
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Email *</label>
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

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Subjek</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Topik pesan"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Pesan *</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tulis pesan Anda di sini..."
                  rows={5}
                  className={inputClass}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed rounded-xs"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                    <span className="ml-2">Mengirim...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
                    <span className="ml-2">Kirim Pesan</span>
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-pink-700 mb-6">Informasi Kontak</h3>

            <div className="space-y-3 mb-8">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 group p-4 rounded-xs hover:bg-pink-100/50 transition-colors border-2 border-transparent hover:border-pink-300"
                >
                  <div className={`w-12 h-12 rounded-xs ${item.iconBg} flex items-center justify-center shrink-0 ${item.hoverBg} transition-colors`}>
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`w-5 h-5 ${item.iconColor} group-hover:text-white transition-colors`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-pink-600 font-semibold uppercase tracking-wider">{item.label}</p>
                    <p className="text-pink-900 font-semibold text-sm group-hover:text-pink-700 transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Address */}
            {data?.address && (
              <div className="bg-pink-100 border-2 border-pink-300 rounded-xs p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xs bg-pink-200 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-pink-700" />
                </div>
                <div>
                  <p className="text-xs text-pink-700 font-semibold uppercase tracking-wider mb-0.5">Lokasi</p>
                  <p className="text-pink-900 font-semibold text-sm">{data.address}</p>
                </div>
              </div>
            )}

            {/* Availability card */}
            <div className="mt-5 bg-pink-200 border-2 border-pink-400 rounded-xs p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                <p className="text-sm font-semibold text-pink-900">Tersedia untuk Kolaborasi</p>
              </div>
              <p className="text-xs text-pink-700 leading-relaxed">
                Terbuka untuk peluang mengajar, pengembangan kurikulum, dan proyek pendidikan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
