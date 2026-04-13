"use client";
// Helper agar preview file/gambar selalu benar ke backend
const getFullUrl = (url: string) =>
  url?.startsWith('/api/uploads/') ? 'http://localhost:5000' + url : url;

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faCircleCheck, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HeroData } from '../../types';
import { api } from '../../lib/api';

interface Props {
  onSaved?: () => void;
}

export default function HeroEditor({ onSaved }: Props) {
  const [data, setData] = useState<HeroData>({
    name: '', headline: '', subheadline: '', photo_url: '', cv_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    api.getHero().then((d: unknown) => {
      if (d && typeof d === 'object') setData(d as HeroData);
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    setIsError(false);
    try {
      await api.updateHero(data);
      setMsg('Tersimpan!');
      onSaved?.();
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
      <h2 className="text-lg font-bold text-navy">Edit Hero Section</h2>

      <div>
        <label className={labelCls}>Nama Lengkap</label>
        <input className={inputCls} value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="Nama Anda" />
      </div>

      <div>
        <label className={labelCls}>Headline / Jabatan</label>
        <input className={inputCls} value={data.headline}
          onChange={(e) => setData({ ...data, headline: e.target.value })}
          placeholder="English Educator & Curriculum Specialist" />
      </div>

      <div>
        <label className={labelCls}>Sub-headline</label>
        <textarea className={inputCls} rows={3} value={data.subheadline}
          onChange={(e) => setData({ ...data, subheadline: e.target.value })}
          placeholder="Deskripsi singkat tentang Anda..." />
      </div>

      <div>
        <label className={labelCls}>Foto Profil</label>
        <input
          type="file"
          accept="image/*"
          className={inputCls}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              setSaving(true);
              setMsg('Mengupload foto...');
              setIsError(false);
              try {
                const res = await api.uploadFile(file);
                setData((d) => ({ ...d, photo_url: res.url }));
                setMsg('Foto berhasil diupload!');
              } catch {
                setMsg('Gagal upload foto');
                setIsError(true);
              } finally {
                setSaving(false);
              }
            }
          }}
        />
        {data.photo_url && (
          <img src={getFullUrl(data.photo_url)} alt="Preview"
            className="mt-2 w-24 h-24 rounded-full object-cover border-2 border-gold" />
        )}
      </div>

      <div>
        <label className={labelCls}>CV (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          className={inputCls}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              setSaving(true);
              setMsg('Mengupload CV...');
              setIsError(false);
              try {
                const res = await api.uploadFile(file);
                setData((d) => ({ ...d, cv_url: res.url }));
                setMsg('CV berhasil diupload!');
              } catch {
                setMsg('Gagal upload CV');
                setIsError(true);
              } finally {
                setSaving(false);
              }
            }
          }}
        />
        {data.cv_url && (
          <a href={getFullUrl(data.cv_url)} target="_blank" rel="noopener noreferrer" className="block mt-2 text-sm text-blue-600 underline">Lihat CV</a>
        )}
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
