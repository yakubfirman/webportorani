'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faPencil, faTrash, faFloppyDisk, faXmark,
  faCircleCheck, faCircleXmark, faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { SkillData } from '../../types';
import { api } from '../../lib/api';
import Button from '../ui/Button';

const emptySkill = (): Omit<SkillData, 'id'> => ({
  name: '', category: 'hard', level: 80, order: 0,
});

export default function SkillsEditor() {
  const [items, setItems]     = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<SkillData | null>(null);
  const [form, setForm]       = useState(emptySkill());
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState('');
  const [isError, setIsError] = useState(false);

  const load = async () => {
    const data = await api.getSkills() as SkillData[];
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openEdit = (item: SkillData) => { setEditing(item); setForm({ ...item }); };
  const openNew  = () => { setEditing({ id: -1, ...emptySkill() }); setForm(emptySkill()); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    setIsError(false);
    try {
      if (editing?.id && editing.id > 0) {
        await api.updateSkill(editing.id, form);
      } else {
        await api.createSkill(form);
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
    if (!confirm('Hapus skill ini?')) return;
    await api.deleteSkill(id);
    await load();
  };

  const inputCls = 'w-full border-2 border-pink-300 rounded-xs px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-colors';
  const labelCls = 'block text-xs font-semibold text-pink-700 uppercase tracking-wider mb-1.5';

  const hardSkills = items.filter((s) => s.category === 'hard');
  const softSkills = items.filter((s) => s.category === 'soft');

  if (loading) return (
    <div className="flex items-center gap-2 py-12 text-gray-400 justify-center">
      <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
      <span>Memuat data...</span>
    </div>
  );

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-pink-900">Skills &amp; Kompetensi</h2>
        <Button onClick={openNew} variant="primary" className="text-sm py-2">
          <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" /> Tambah
        </Button>
      </div>

      {!editing && (
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {[{ label: 'Hard Skills', items: hardSkills }, { label: 'Soft Skills', items: softSkills }].map(({ label, items: group }) => (
            <div key={label}>
              <h3 className="font-semibold text-gray-700 mb-3 text-sm">{label}</h3>
              <div className="space-y-2">
                {group.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-xs p-3 flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium text-pink-900 text-sm">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-pink-600" style={{ width: `${item.level}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{item.level}%</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5 ml-3">
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
                {group.length === 0 && <p className="text-gray-400 text-xs italic">Kosong</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <form onSubmit={handleSave} className="bg-gray-50 border border-gray-200 rounded-xs p-6 space-y-4">
          <h3 className="font-bold text-navy">
            {editing.id! > 0 ? 'Edit Skill' : 'Tambah Skill'}
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nama Skill</label>
              <input className={inputCls} required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Kategori</label>
              <select className={inputCls} value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as 'hard' | 'soft' })}>
                <option value="hard">Hard Skill</option>
                <option value="soft">Soft Skill</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Level ({form.level}%)</label>
            <input type="range" min={0} max={100} value={form.level}
              onChange={(e) => setForm({ ...form, level: +e.target.value })}
              className="w-full accent-pink-600" />
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div className="h-full rounded-full bg-pink-600 transition-all" style={{ width: `${form.level}%` }} />
            </div>
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
