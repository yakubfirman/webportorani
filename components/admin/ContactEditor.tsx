'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFloppyDisk, faCircleCheck, faCircleXmark, faSpinner,
  faEnvelope, faPhone, faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { ContactInfoData } from '../../types';
import { api } from '../../lib/api';

export default function ContactEditor() {
  const [data, setData] = useState<ContactInfoData>({
    email: '', phone: '', linkedin_url: '', instagram: '', address: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    api.getContactInfo().then((d: unknown) => {
      if (d && typeof d === 'object') setData(d as ContactInfoData);
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    setIsError(false);
    try {
      await api.updateContactInfo(data);
      setMsg('Tersimpan!');
    } catch {
      setMsg('Gagal menyimpan.');
      setIsError(true);
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-colors';
  const labelCls = 'block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5';

  if (loading) return (
    <div className="flex items-center gap-2 py-12 text-gray-400 justify-center">
      <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
      <span>Memuat data...</span>
    </div>
  );

  return (
    <form onSubmit={handleSave} className="space-y-5 max-w-2xl">
      <h2 className="text-lg font-bold text-navy">Informasi Kontak</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>
            <FontAwesomeIcon icon={faEnvelope} className="w-3 h-3 mr-1" />Email
          </label>
          <input type="email" className={inputCls} value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="email@example.com" />
        </div>
        <div>
          <label className={labelCls}>
            <FontAwesomeIcon icon={faPhone} className="w-3 h-3 mr-1" />Telepon / WhatsApp
          </label>
          <input type="tel" className={inputCls} value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            placeholder="+62 812 xxxx xxxx" />
        </div>
      </div>

      <div>
        <label className={labelCls}>
          <FontAwesomeIcon icon={faLinkedinIn} className="w-3 h-3 mr-1" />URL LinkedIn
        </label>
        <input type="url" className={inputCls} value={data.linkedin_url}
          onChange={(e) => setData({ ...data, linkedin_url: e.target.value })}
          placeholder="https://linkedin.com/in/username" />
      </div>

      <div>
        <label className={labelCls}>
          <FontAwesomeIcon icon={faInstagram} className="w-3 h-3 mr-1" />Instagram
        </label>
        <input className={inputCls} value={data.instagram}
          onChange={(e) => setData({ ...data, instagram: e.target.value })}
          placeholder="@username" />
      </div>

      <div>
        <label className={labelCls}>
          <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 mr-1" />Alamat / Lokasi
        </label>
        <input className={inputCls} value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
          placeholder="Bandung, Jawa Barat, Indonesia" />
      </div>

      {msg && (
        <div className={`flex items-center gap-2 text-sm font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
          <FontAwesomeIcon icon={isError ? faCircleXmark : faCircleCheck} className="w-4 h-4" />
          {msg}
        </div>
      )}

      <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
        {saving ? (
          <><FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" /> Menyimpan...</>
        ) : (
          <><FontAwesomeIcon icon={faFloppyDisk} className="w-4 h-4" /> Simpan Perubahan</>
        )}
      </button>
    </form>
  );
}
