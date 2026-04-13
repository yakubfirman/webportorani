'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faClipboardList, faCalendarDays, faCheck, faInbox } from '@fortawesome/free-solid-svg-icons';
import { ExperienceData } from '../../types';

interface Props {
  data: ExperienceData[];
}

export default function ExperienceSection({ data }: Props) {
  const [activeTab, setActiveTab] = useState<'formal' | 'pkl'>('formal');

  const formalExps = data.filter((e) => e.type === 'formal');
  const pklExps    = data.filter((e) => e.type === 'pkl');
  const displayed  = activeTab === 'formal' ? formalExps : pklExps;

  const tabs = [
    { id: 'formal' as const, label: 'Formal',  icon: faSchool        },
    { id: 'pkl'    as const, label: 'PKL',      icon: faClipboardList },
  ];

  return (
    <section id="experience" className="section-padding" style={{ backgroundColor: '#fdf0f8' }}>
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge mb-3">Pengalaman</span>
          <h2 className="section-title">Pengalaman &amp; PKL</h2>
          <p className="section-subtitle mx-auto text-center">
            Perjalanan profesional saya dalam dunia pendidikan bahasa Inggris.
          </p>
          <div className="w-16 h-1 bg-gold rounded-full mx-auto mt-3" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-7 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-navy text-white shadow-lg shadow-navy/25'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-navy/15 hidden md:block" />

          {displayed.length > 0 ? (
            <div className="space-y-8">
              {displayed.map((exp, index) => (
                <div key={exp.id ?? index} className="relative flex gap-6 md:pl-16">
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-3.5 top-6 w-5 h-5 rounded-full bg-gold border-4 border-white shadow-md items-center justify-center" />

                  {/* Card */}
                  <div className="card flex-1 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-navy">{exp.title}</h3>
                        <p className="text-gold font-semibold text-sm mt-0.5">{exp.institution}</p>
                      </div>
                      {exp.period && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3" />
                          {exp.period}
                        </span>
                      )}
                    </div>

                    {exp.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{exp.description}</p>
                    )}

                    {exp.responsibilities.length > 0 && (
                      <ul className="space-y-2">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                            <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center">
                              <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5 text-gold" />
                            </span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <FontAwesomeIcon icon={faInbox} className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Belum ada data pengalaman.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
