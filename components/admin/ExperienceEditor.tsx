'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faPencil, faTrash, faFloppyDisk, faXmark,
  faCircleCheck, faCircleXmark, faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { ExperienceData } from '../../types';
import { api } from '../../lib/api';
import Button from '../ui/Button';

const emptyExp = (): Omit<ExperienceData, 'id'> => ({
  title: '', institution: '', type: 'formal', period: '',
  description: '', responsibilities: [], order: 0,
});

export default function ExperienceEditor() {
  const [items, setItems]     = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ExperienceData | null>(null);
  const [form, setForm]       = useState(emptyExp());
  const [respInput, setRespInput] = useState('');
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState('');
  const [isError, setIsError] = useState(false);

  const load = async () => {
    const data = await api.getExperiences() as ExperienceData[];
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openEdit = (item: ExperienceData) => {
    setEditing(item);
    setForm({ ...item });
    setRespInput(item.responsibilities.join('\n'));
  };
  const openNew = () => {
    setEditing({ id: -1, ...emptyExp() });
    setForm(emptyExp());
    setRespInput('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    setIsError(false);
    const payload = {
      ...form,
      responsibilities: respInput.split('\n').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editing?.id && editing.id > 0) {
        await api.updateExperience(editing.id, payload);
      } else {
        await api.createExperience(payload);
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
    if (!confirm('Hapus pengalaman ini?')) return;
    await api.deleteExperience(id);
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
        <h2 className="text-lg font-bold text-pink-900">Pengalaman &amp; PKL</h2>
        <Button onClick={openNew} variant="primary" className="text-sm py-2">
          <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" /> Tambah
        </Button>
      </div>

      {/* List */}
      {!editing && (
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xs p-4 flex justify-between items-start gap-4">
              <div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full mr-2 ${
                  item.type === 'pkl' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.type === 'pkl' ? 'PKL' : 'Formal'}
                </span>
                <span className="font-semibold text-pink-900">{item.title}</span>
                <p className="text-sm text-gray-500 mt-0.5">{item.institution} · {item.period}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(item)}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xs bg-gray-100 hover:bg-gray-200 font-medium">
                  <FontAwesomeIcon icon={faPencil} className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => handleDelete(item.id!)}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xs bg-red-50 hover:bg-red-100 text-red-600 font-medium">
                  <FontAwesomeIcon icon={faTrash} className="w-3 h-3" /> Hapus
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-gray-400 text-sm italic">Belum ada data.</p>}
        </div>
      )}

      {/* Form */}
      {editing && (
        <form onSubmit={handleSave} className="bg-gray-50 border border-gray-200 rounded-xs p-6 space-y-4">
          <h3 className="font-bold text-navy">
            {editing.id! > 0 ? 'Edit Pengalaman' : 'Tambah Pengalaman'}
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Judul / Posisi</label>
              <input className={inputCls} required value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Jenis</label>
              <select className={inputCls} value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as 'formal' | 'pkl' })}>
                <option value="formal">Formal</option>
                <option value="pkl">PKL</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Institusi</label>
              <input className={inputCls} required value={form.institution}
                onChange={(e) => setForm({ ...form, institution: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Periode</label>
              <input className={inputCls} value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                placeholder="2022 – 2024" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Deskripsi</label>
            <textarea className={inputCls} rows={3} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>

          <div>
            <label className={labelCls}>Tanggung Jawab (1 baris = 1 poin)</label>
            <textarea className={inputCls} rows={5} value={respInput}
              onChange={(e) => setRespInput(e.target.value)}
              placeholder={"Menyusun RPP\nMengajar 30+ siswa\n..."} />
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
