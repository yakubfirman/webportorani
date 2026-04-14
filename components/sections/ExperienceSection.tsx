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
    <section id="experience" className="relative py-20 px-6 overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-16 right-0 w-64 h-64 rounded-xs opacity-20 pointer-events-none animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-xs opacity-20 pointer-events-none animate-pulse-slower"
        style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(50px)' }} />

      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title text-4xl md:text-5xl font-bold animate-fade-in delay-100 mb-4">Experience</h2>
          <p className="section-subtitle mx-auto text-center animate-fade-in delay-200 text-slate-600 max-w-2xl">
            My professional journey in the field of English language education.
          </p>
          <div className="w-16 h-1 rounded-xs mx-auto mt-6 animate-fade-in delay-300" style={{background: 'linear-gradient(90deg, #be185d, #e0bbff)'}} />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 animate-fade-in delay-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-7 py-2.5 rounded-xs font-semibold text-sm transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                activeTab === tab.id
                  ? 'bg-pink-300 text-pink-900 border-pink-500 shadow-lg scale-105'
                  : 'bg-white text-pink-600 border-pink-200 hover:bg-pink-100 shadow-sm hover:border-pink-300'
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto animate-fade-in delay-200">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-pink-200 hidden md:block" />

          {displayed.length > 0 ? (
            <div className="space-y-8">
              {displayed.map((exp, index) => (
                <div key={exp.id ?? index} className="relative flex gap-6 md:pl-16">
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-3.5 top-6 w-5 h-5 rounded-xs bg-pink-200 border-4 border-white shadow-md items-center justify-center" />

                  {/* Card */}
                  <div className="card flex-1 rounded-xs border-2 border-pink-300 bg-white/95 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-pink-700">{exp.title}</h3>
                        <p className="text-pink-400 font-semibold text-sm mt-0.5">{exp.institution}</p>
                      </div>
                      {exp.period && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-pink-700 bg-pink-100 px-3 py-1.5 rounded-xs border border-pink-300">
                          <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3" />
                          {exp.period}
                        </span>
                      )}
                    </div>

                    {exp.description && (
                      <p className="text-pink-400 text-sm leading-relaxed mb-4">{exp.description}</p>
                    )}

                    {exp.responsibilities.length > 0 && (
                      <ul className="space-y-2">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-pink-700">
                            <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center">
                              <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5 text-pink-400" />
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
            <div className="text-center py-16 text-pink-200">
              <FontAwesomeIcon icon={faInbox} className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Belum ada data pengalaman.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
