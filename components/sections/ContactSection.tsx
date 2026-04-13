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
    'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/25 focus:border-navy transition-all bg-white hover:border-gray-300';

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
    <section id="contact" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge mb-3">Kontak</span>
          <h2 className="section-title">Hubungi Saya</h2>
          <p className="section-subtitle mx-auto text-center">
            Tertarik untuk berkolaborasi atau memiliki pertanyaan? Jangan ragu untuk menghubungi.
          </p>
          <div className="w-16 h-1 bg-gold rounded-full mx-auto mt-3" />
        </div>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-bold text-navy mb-6">Kirim Pesan</h3>

            {status === 'success' && (
              <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-5 text-sm">
                <FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Pesan berhasil dikirim! Saya akan segera membalas.</span>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-5 text-sm">
                <FontAwesomeIcon icon={faCircleXmark} className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Nama *</label>
                  <input type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nama lengkap" className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Email *</label>
                  <input type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@contoh.com" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Subjek</label>
                <input type="text" value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Topik pesan" className={inputClass} />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Pesan *</label>
                <textarea required value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tulis pesan Anda di sini..." rows={5} className={inputClass} />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-navy mb-6">Informasi Kontak</h3>

            <div className="space-y-3 mb-8">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 group p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-3"
                >
                  <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 ${item.hoverBg} transition-colors`}>
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`w-5 h-5 ${item.iconColor} group-hover:text-white transition-colors`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                    <p className="text-navy font-semibold text-sm group-hover:text-gold transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Address */}
            {data?.address && (
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-navy" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">Lokasi</p>
                  <p className="text-navy font-semibold text-sm">{data.address}</p>
                </div>
              </div>
            )}

            {/* Availability card */}
            <div className="mt-5 bg-navy/5 border border-navy/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm font-semibold text-navy">Tersedia untuk Kolaborasi</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Terbuka untuk peluang mengajar, pengembangan kurikulum, dan proyek pendidikan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
