'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faClipboardList, faCalendarDays, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ExperienceData } from '@/types';
import Button from '@/components/ui/Button';

interface ExperienceGridProps {
  items: ExperienceData[];
}

type FilterType = 'all' | 'formal' | 'pkl';

export default function ExperienceGrid({ items }: ExperienceGridProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const formalExps = items.filter((e) => e.type === 'formal');
  const pklExps = items.filter((e) => e.type === 'pkl');
  
  const filtered = 
    filter === 'all' ? items : 
    filter === 'formal' ? formalExps : 
    pklExps;

  const availableTypes = Array.from(new Set(items.map((e) => e.type))) as Array<'formal' | 'pkl'>;

  const typeConfig: Record<'formal' | 'pkl', { icon: any; label: string; color: string; bg: string }> = {
    formal: { icon: faSchool, label: 'Pendidikan Formal', color: 'text-pink-600', bg: 'bg-pink-50' },
    pkl: { icon: faClipboardList, label: 'PKL', color: 'text-purple-600', bg: 'bg-purple-50' },
  };

  return (
    <>
      {/* Filter Tabs */}
      {items.length > 0 && (
        <div className="flex justify-center flex-wrap gap-4 mb-8 animate-fade-in relative">
          <Button
            onClick={() => setFilter('all')}
            variant="ghost"
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xs font-semibold text-sm transition-all duration-300 border-2 focus:outline-none relative overflow-hidden group ${
              filter === 'all'
                ? 'bg-pink-50 text-pink-600 border-pink-400 shadow-md scale-105'
                : 'bg-white text-slate-500 border-pink-100 hover:text-pink-500 hover:bg-pink-50/50 hover:border-pink-300 shadow-sm'
            }`}
          >
            <span className="relative z-10">Semua</span>
            {filter === 'all' && <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full"></div>}
          </Button>

          {availableTypes.map((type) => {
            const cfg = typeConfig[type];
            const isActive = filter === type;
            return (
              <Button
                key={type}
                onClick={() => setFilter(type)}
                variant="ghost"
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xs font-semibold text-sm transition-all duration-300 border-2 focus:outline-none relative overflow-hidden group ${
                  isActive
                    ? 'bg-pink-50 text-pink-600 border-pink-400 shadow-md scale-105'
                    : 'bg-white text-slate-500 border-pink-100 hover:text-pink-500 hover:bg-pink-50/50 hover:border-pink-300 shadow-sm'
                }`}
              >
                <FontAwesomeIcon icon={cfg.icon} className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? 'scale-110 text-pink-500' : 'group-hover:scale-110'}`} />
                <span className="relative z-10">{cfg.label}</span>
                {isActive && <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full"></div>}
              </Button>
            );
          })}
        </div>
      )}

      {/* Experience Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filtered.map((exp, index) => {
            const cfg = typeConfig[exp.type];
            return (
              <div
                key={exp.id ?? index}
                className="card flex flex-col h-full rounded-xs shadow border-2 border-pink-100/50 bg-white bg-opacity-90 p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden group/card"
              >
                {/* Left accent bar */}
                <div className="absolute -left-0.5 top-6 bottom-6 w-1 bg-gradient-to-b from-pink-500 to-purple-400 rounded-r-full opacity-70 group-hover/card:opacity-100 transition-opacity z-10"></div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden z-10">
                  <div className="absolute top-0 right-0 w-full h-full bg-pink-50 opacity-50 transform rotate-45 translate-x-1/2 -translate-y-1/2 group-hover/card:bg-purple-50 transition-colors"></div>
                </div>

                {/* Hover sparkle effect */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity z-20"></div>

                {/* Type badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1.5 rounded-xs ${cfg.bg} ${cfg.color} shadow-sm border border-white/60 backdrop-blur-sm`}>
                    <FontAwesomeIcon icon={cfg.icon} className="w-3 h-3" />
                    {cfg.label}
                  </span>
                </div>

                {/* Content Container */}
                <div className="flex flex-col flex-grow">
                  {/* Title and Institution */}
                  <div className="mb-2">
                    <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover/card:text-pink-600 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-pink-500 font-semibold text-xs mt-0.5">{exp.institution}</p>
                  </div>

                  {/* Period */}
                  {exp.period && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-xs border border-purple-200 shadow-sm mb-2 w-fit">
                      <FontAwesomeIcon icon={faCalendarDays} className="w-2.5 h-2.5" />
                      {exp.period}
                    </span>
                  )}

                  {/* Description */}
                  {exp.description && (
                    <p className="text-slate-600 text-xs leading-relaxed mb-2 line-clamp-2">
                      {exp.description}
                    </p>
                  )}

                  {/* Responsibilities (limited to 3) */}
                  {exp.responsibilities.length > 0 && (
                    <ul className="space-y-1">
                      {exp.responsibilities.slice(0, 3).map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 hover:text-slate-900 transition-colors">
                          <span className="mt-0.5 shrink-0 w-3.5 h-3.5 rounded-xs bg-pink-50 flex items-center justify-center border border-pink-200">
                            <FontAwesomeIcon icon={faCheck} className="w-2 h-2 text-pink-500" />
                          </span>
                          <span className="leading-relaxed line-clamp-1">{r}</span>
                        </li>
                      ))}
                      {exp.responsibilities.length > 3 && (
                        <li className="text-[10px] text-pink-500 font-semibold italic ml-5">
                          +{exp.responsibilities.length - 3} lebih
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-xs border-2 border-dashed border-pink-200 max-w-3xl mx-auto">
          <p className="text-lg text-slate-500 font-medium">Belum ada data pengalaman untuk filter yang dipilih.</p>
        </div>
      )}
    </>
  );
}
