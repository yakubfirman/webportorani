"use client";
// Helper agar preview file/gambar selalu benar ke backend
const getFullUrl = (url: string) =>
  url?.startsWith('/api/uploads/') ? 'http://localhost:5000' + url : url;

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faPencil, faTrash, faFloppyDisk, faXmark,
  faCircleCheck, faCircleXmark, faSpinner, faFileLines, faVideo, faImage,
} from '@fortawesome/free-solid-svg-icons';
import { PortfolioItemData } from '../../types';
import { api } from '../../lib/api';
import Button from '../ui/Button';

const emptyItem = (): Omit<PortfolioItemData, 'id'> => ({
  title: '', description: '', type: 'document', url: '', thumbnail_url: '', order: 0,
});

const typeConfig = {
  document: { icon: faFileLines, label: 'Dokumen', color: 'text-blue-600', bg: 'bg-blue-50' },
  video:    { icon: faVideo,      label: 'Video',   color: 'text-purple-600', bg: 'bg-purple-50' },
  image:    { icon: faImage,      label: 'Gambar',  color: 'text-green-600',  bg: 'bg-green-50' },
};

export default function PortfolioEditor() {
  const [items, setItems]     = useState<PortfolioItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PortfolioItemData | null>(null);
  const [form, setForm]       = useState(emptyItem());
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState('');
  const [isError, setIsError] = useState(false);

  const load = async () => {
    const data = await api.getPortfolio() as PortfolioItemData[];
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openEdit = (item: PortfolioItemData) => { setEditing(item); setForm({ ...item }); };
  const openNew  = () => { setEditing({ id: -1, ...emptyItem() }); setForm(emptyItem()); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    setIsError(false);
    try {
      if (editing?.id && editing.id > 0) {
        await api.updatePortfolioItem(editing.id, form);
      } else {
        await api.createPortfolioItem(form);
      }
      setMsg('Tersimpan!');
      setEditing(null);
      await load();
    } catch {
      setMsg('Gagal menyimpan.');
      setIsError(true);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus item ini?')) return;
    await api.deletePortfolioItem(id);
    await load();
  };

  const inputCls = 'w-full border-2 border-pink-300 rounded-xs px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-colors';
  const labelCls = 'block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5';

  if (loading) return (
    <div className="flex items-center gap-2 py-12 text-gray-400 justify-center">
      <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
      <span>Memuat data...</span>
    </div>
  );

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-pink-900">Portofolio &amp; Artefak</h2>
        <Button onClick={openNew} variant="primary" className="text-sm py-2">
          <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" /> Tambah
        </Button>
      </div>

      {!editing && (
        <div className="space-y-3 mb-6">
          {items.map((item) => {
            const cfg = typeConfig[item.type as keyof typeof typeConfig] ?? typeConfig.document;
            return (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xs p-4 flex justify-between items-start gap-4">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xs ${cfg.bg} flex items-center justify-center shrink-0`}>
                    <FontAwesomeIcon icon={cfg.icon} className={`w-4 h-4 ${cfg.color}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-pink-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(item)}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 font-medium">
                    <FontAwesomeIcon icon={faPencil} className="w-2.5 h-2.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(item.id!)}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-red-50 hover:bg-red-100 text-red-600 font-medium">
                    <FontAwesomeIcon icon={faTrash} className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            );
          })}
          {items.length === 0 && <p className="text-gray-400 text-sm italic">Belum ada portofolio.</p>}
        </div>
      )}

      {editing && (
        <form onSubmit={handleSave} className="bg-gray-50 border border-gray-200 rounded-xs p-6 space-y-4">
          <h3 className="font-bold text-navy">
            {editing.id! > 0 ? 'Edit Item' : 'Tambah Item'}
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Judul</label>
              <input className={inputCls} required value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Tipe</label>
              <select className={inputCls} value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as 'document' | 'video' | 'image' })}>
                {Object.entries(typeConfig).map(([val, cfg]) => (
                  <option key={val} value={val}>{cfg.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Deskripsi</label>
            <textarea className={inputCls} rows={3} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>

          <div>
            <label className={labelCls}>File / Gambar / Video</label>
            <input
              type="file"
              accept=".pdf,video/*,image/*"
              className={inputCls}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSaving(true);
                  setMsg('Mengupload file...');
                  setIsError(false);
                  try {
                    const res = await api.uploadFile(file);
                    setForm((f) => ({ ...f, url: res.url }));
                    setMsg('File berhasil diupload!');
                  } catch {
                    setMsg('Gagal upload file');
                    setIsError(true);
                  } finally {
                    setSaving(false);
                  }
                }
              }}
            />
            {form.url && (form.type === 'image' ? (
              <img src={getFullUrl(form.url)} alt="Preview" className="mt-2 h-24 rounded-xs object-cover border" />
            ) : form.type === 'video' ? (
              <video src={getFullUrl(form.url)} controls className="mt-2 h-24 rounded-xs border" />
            ) : (
              <a href={getFullUrl(form.url)} target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-600 underline">Lihat File</a>
            ))}
          </div>

          <div>
            <label className={labelCls}>Thumbnail (opsional)</label>
            <input
              type="file"
              accept="image/*"
              className={inputCls}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSaving(true);
                  setMsg('Mengupload thumbnail...');
                  setIsError(false);
                  try {
                    const res = await api.uploadFile(file);
                    setForm((f) => ({ ...f, thumbnail_url: res.url }));
                    setMsg('Thumbnail berhasil diupload!');
                  } catch {
                    setMsg('Gagal upload thumbnail');
                    setIsError(true);
                  } finally {
                    setSaving(false);
                  }
                }
              }}
            />
            {form.thumbnail_url && (
              <img src={getFullUrl(form.thumbnail_url)} alt="Preview"
                className="mt-2 h-24 rounded-xs object-cover border" />
            )}
          </div>

          {msg && (
            <div className={`flex items-center gap-2 text-sm font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
              <FontAwesomeIcon icon={isError ? faCircleXmark : faCircleCheck} className="w-4 h-4" />
              {msg}
            </div>
          )}

          <div className="flex gap-3">
            <Button type="submit" variant="primary" className="text-sm py-2 disabled:opacity-60" disabled={saving}>
              {saving ? (
                <><FontAwesomeIcon icon={faSpinner} className="w-3.5 h-3.5 animate-spin" /> Menyimpan...</>
              ) : (
                <><FontAwesomeIcon icon={faFloppyDisk} className="w-3.5 h-3.5" /> Simpan</>
              )}
            </Button>
            <button type="button" onClick={() => { setEditing(null); setMsg(''); }}
              className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-xs bg-gray-200 hover:bg-gray-300 font-medium">
              <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" /> Batal
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
