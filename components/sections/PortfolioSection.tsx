
'use client';
// Helper agar preview file/gambar/file selalu benar ke backend
const getFullUrl = (url: string) =>
  url?.startsWith('/api/uploads/') ? 'http://localhost:5000' + url : url;

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileLines, faVideo, faImage, faFolderOpen,
  faArrowUpRightFromSquare, faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { PortfolioItemData } from '../../types';

interface Props {
  data: PortfolioItemData[];
}

const typeConfig: Record<string, { icon: IconDefinition; label: string; color: string; bg: string }> = {
  document: { icon: faFileLines, label: 'Dokumen', color: 'text-pink-600',   bg: 'bg-pink-50'  },
  video:    { icon: faVideo,     label: 'Video',   color: 'text-purple-400',    bg: 'bg-purple-50'   },
  image:    { icon: faImage,     label: 'Gambar',  color: 'text-mint-600', bg: 'bg-mint-50'},
};

type FilterType = 'all' | 'document' | 'video' | 'image';

export default function PortfolioSection({ data }: Props) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all' ? data : data.filter((item) => item.type === filter);
  const availableTypes = Array.from(new Set(data.map((d) => d.type))) as FilterType[];

  return (
    <section id="portfolio" className="relative py-20 px-6 overflow-hidden">
      {/* Decorative pastel blob */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-xs opacity-20 pointer-events-none animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 right-0 w-56 h-56 rounded-xs opacity-20 pointer-events-none animate-pulse-slower"
        style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(50px)' }} />
        <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title text-4xl md:text-5xl font-bold animate-fade-in delay-100 mb-4">Artifacts &amp; Portfolio</h2>
          <p className="section-subtitle mx-auto text-center animate-fade-in delay-200 text-slate-600 max-w-2xl">
            Documentation of teaching activities, syllabi, and learning development works.
          </p>
          <div className="w-16 h-1 rounded-xs mx-auto mt-6 animate-fade-in delay-300" style={{background: 'linear-gradient(90deg, #be185d, #e0bbff)'}} />
        </div>

        {/* Filter Buttons */}
        {data.length > 0 && (
          <div className="flex justify-center flex-wrap gap-4 mb-10">
            <button
              onClick={() => setFilter('all')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xs text-sm font-semibold transition-all duration-200 border-2 ${
                filter === 'all'
                  ? 'bg-pink-300 text-pink-900 border-pink-500 shadow-lg'
                  : 'bg-white text-pink-600 border-pink-200 hover:bg-pink-100 shadow-sm hover:border-pink-300'
              }`}
            >
              <FontAwesomeIcon icon={faFilter} className="w-3.5 h-3.5" />
              All
            </button>
            {availableTypes.map((type) => {
              const cfg = typeConfig[type];
              return (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xs text-sm font-semibold transition-all duration-200 border-2 ${
                    filter === type
                      ? 'bg-pink-300 text-pink-900 border-pink-500 shadow-lg'
                      : 'bg-white text-pink-600 border-pink-200 hover:bg-pink-100 shadow-sm hover:border-pink-300'
                  }`}
                >
                  {cfg && <FontAwesomeIcon icon={cfg.icon} className="w-3.5 h-3.5" />}
                  {cfg?.label ?? type}
                </button>
              );
            })}
          </div>
        )}

        {/* Cards Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item, index) => {
              const cfg = typeConfig[item.type];
              return (
                <div
                  key={item.id ?? index}
                  className="card rounded-xs overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-pink-300 bg-white/95"
                >
                  {/* Thumbnail */}
                  <div className="h-44 bg-gradient-to-br from-pink-100/60 to-purple-100/40 rounded-xs mb-4 flex items-center justify-center relative overflow-hidden">
                    {item.thumbnail_url ? (
                      <img
                        src={getFullUrl(item.thumbnail_url)}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      cfg && (
                        <div className={`w-16 h-16 rounded-xs ${cfg.bg} flex items-center justify-center`}>
                          <FontAwesomeIcon icon={cfg.icon} className={`w-8 h-8 ${cfg.color}`} />
                        </div>
                      )
                    )}
                    {/* Type badge */}
                    {cfg && (
                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xs ${cfg.bg} ${cfg.color} shadow-md border border-opacity-50`}>
                          <FontAwesomeIcon icon={cfg.icon} className="w-3 h-3" />
                          {cfg.label}
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-pink-900 text-base mb-2 leading-snug group-hover:text-pink-700 transition-colors">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-pink-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {item.url && (
                    <a
                      href={getFullUrl(item.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-pink-900 font-semibold text-sm
                                 hover:text-pink-700 transition-colors group/link"
                    >
                      Lihat Selengkapnya
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <FontAwesomeIcon icon={faFolderOpen} className="w-14 h-14 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No artifacts or portfolio items available.</p>
          </div>
        )}
      </div>
    </section>
  );
}
