"use client";
// Helper agar preview file/gambar selalu benar ke backend
const getFullUrl = (url: string) =>
  url?.startsWith('/api/uploads/') ? 'http://localhost:5000' + url : url;

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faPencil, faTrash, faFloppyDisk, faXmark,
  faCircleCheck, faCircleXmark, faSpinner, faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons';
import { TestimonialData } from '../../types';
import { api } from '../../lib/api';

const emptyTestimonial = (): Omit<TestimonialData, 'id'> => ({
  name: '', role: '', content: '', photo_url: '', order: 0,
});

export default function TestimonialsEditor() {
  const [items, setItems]     = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TestimonialData | null>(null);
  const [form, setForm]       = useState(emptyTestimonial());
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState('');
  const [isError, setIsError] = useState(false);

  const load = async () => {
    const data = await api.getTestimonials() as TestimonialData[];
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openEdit = (item: TestimonialData) => { setEditing(item); setForm({ ...item }); };
  const openNew  = () => { setEditing({ id: -1, ...emptyTestimonial() }); setForm(emptyTestimonial()); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    setIsError(false);
    try {
      if (editing?.id && editing.id > 0) {
        await api.updateTestimonial(editing.id, form);
      } else {
        await api.createTestimonial(form);
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
    if (!confirm('Hapus testimoni ini?')) return;
    await api.deleteTestimonial(id);
    await load();
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
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-navy">Testimoni</h2>
        <button onClick={openNew} className="btn-primary text-sm py-2">
          <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" /> Tambah
        </button>
      </div>

      {!editing && (
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faQuoteLeft} className="w-4 h-4 text-navy/40" />
                </div>
                <div>
                  <p className="font-semibold text-navy">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.role}</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2 italic">&ldquo;{item.content}&rdquo;</p>
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
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
          ))}
          {items.length === 0 && <p className="text-gray-400 text-sm italic">Belum ada testimoni.</p>}
        </div>
      )}

      {editing && (
        <form onSubmit={handleSave} className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-navy">
            {editing.id! > 0 ? 'Edit Testimoni' : 'Tambah Testimoni'}
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nama</label>
              <input className={inputCls} required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Jabatan / Peran</label>
              <input className={inputCls} value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Dosen Pembimbing PKL" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Isi Testimoni</label>
            <textarea className={inputCls} required rows={4} value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </div>

          <div>
            <label className={labelCls}>Foto (opsional)</label>
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
                    setForm((f) => ({ ...f, photo_url: res.url }));
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
            {form.photo_url && (
              <img src={getFullUrl(form.photo_url)} alt="Preview" className="mt-2 h-20 w-20 rounded-full object-cover border" />
            )}
          </div>

          {msg && (
            <div className={`flex items-center gap-2 text-sm font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
              <FontAwesomeIcon icon={isError ? faCircleXmark : faCircleCheck} className="w-4 h-4" />
              {msg}
            </div>
          )}

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn-primary text-sm py-2 disabled:opacity-60">
              {saving ? (
                <><FontAwesomeIcon icon={faSpinner} className="w-3.5 h-3.5 animate-spin" /> Menyimpan...</>
              ) : (
                <><FontAwesomeIcon icon={faFloppyDisk} className="w-3.5 h-3.5" /> Simpan</>
              )}
            </button>
            <button type="button" onClick={() => { setEditing(null); setMsg(''); }}
              className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium">
              <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" /> Batal
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
