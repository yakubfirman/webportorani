"use client";
// Helper agar preview file/gambar selalu benar ke backend
const getFullUrl = (url: string) =>
  url?.startsWith('/api/uploads/') ? 'http://localhost:5000' + url : url;

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faCircleCheck, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AboutData } from '../../types';
import { api } from '../../lib/api';

export default function AboutEditor() {
  const [data, setData]   = useState<AboutData>({ content: '', photo_url: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    api.getAbout().then((d: unknown) => {
      if (d && typeof d === 'object') setData(d as AboutData);
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    setIsError(false);
    try {
      await api.updateAbout(data);
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
      <h2 className="text-lg font-bold text-navy">Edit Tentang Saya</h2>

      <div>
        <label className={labelCls}>Narasi / Deskripsi</label>
        <p className="text-xs text-gray-400 mb-1.5">Pisahkan paragraf dengan baris kosong (Enter dua kali).</p>
        <textarea className={inputCls} rows={10} value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
          placeholder="Tulis narasi tentang diri Anda..." />
      </div>

      <div>
        <label className={labelCls}>Foto</label>
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
            className="mt-2 w-28 h-32 rounded-xl object-cover border-2 border-gray-200" />
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
