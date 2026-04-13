
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
  document: { icon: faFileLines, label: 'Dokumen', color: 'text-blue-600',   bg: 'bg-blue-50'  },
  video:    { icon: faVideo,     label: 'Video',   color: 'text-red-600',    bg: 'bg-red-50'   },
  image:    { icon: faImage,     label: 'Gambar',  color: 'text-purple-600', bg: 'bg-purple-50'},
};

type FilterType = 'all' | 'document' | 'video' | 'image';

export default function PortfolioSection({ data }: Props) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all' ? data : data.filter((item) => item.type === filter);
  const availableTypes = Array.from(new Set(data.map((d) => d.type))) as FilterType[];

  return (
    <section id="portfolio" className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge mb-3">Portofolio</span>
          <h2 className="section-title">Artefak &amp; Portofolio</h2>
          <p className="section-subtitle mx-auto text-center">
            Dokumentasi kegiatan mengajar, silabus, dan karya-karya pengembangan pembelajaran.
          </p>
          <div className="w-16 h-1 bg-gold rounded-full mx-auto mt-3" />
        </div>

        {/* Filter Buttons */}
        {data.length > 0 && (
          <div className="flex justify-center flex-wrap gap-3 mb-10">
            <button
              onClick={() => setFilter('all')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-navy text-white shadow-lg shadow-navy/20'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
              }`}
            >
              <FontAwesomeIcon icon={faFilter} className="w-3.5 h-3.5" />
              Semua
            </button>
            {availableTypes.map((type) => {
              const cfg = typeConfig[type];
              return (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    filter === type
                      ? 'bg-navy text-white shadow-lg shadow-navy/20'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, index) => {
              const cfg = typeConfig[item.type];
              return (
                <div
                  key={item.id ?? index}
                  className="card overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >
                  {/* Thumbnail */}
                  <div className="h-44 bg-gradient-to-br from-navy/5 to-gold/10 rounded-xl mb-4
                                  flex items-center justify-center relative overflow-hidden">
                    {item.thumbnail_url ? (
                      <img
                        src={getFullUrl(item.thumbnail_url)}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      cfg && (
                        <div className={`w-16 h-16 rounded-2xl ${cfg.bg} flex items-center justify-center`}>
                          <FontAwesomeIcon icon={cfg.icon} className={`w-8 h-8 ${cfg.color}`} />
                        </div>
                      )
                    )}
                    {/* Type badge */}
                    {cfg && (
                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                          <FontAwesomeIcon icon={cfg.icon} className="w-3 h-3" />
                          {cfg.label}
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-navy text-base mb-2 leading-snug group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {item.url && (
                    <a
                      href={getFullUrl(item.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-navy font-semibold text-sm
                                 hover:text-gold transition-colors group/link"
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
            <p className="text-lg font-medium">Belum ada portofolio yang ditambahkan.</p>
          </div>
        )}
      </div>
    </section>
  );
}
