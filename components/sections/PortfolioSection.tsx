'use client';

// Use central resolver for upload URLs
import Link from 'next/link';
import { resolveUrl } from '../../lib/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileLines, faVideo, faImage, faFolderOpen,
  faArrowUpRightFromSquare, faQuoteLeft, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { PortfolioItemData } from '../../types';

interface Props {
  data: PortfolioItemData[];
}

const typeConfig: Record<string, { icon: IconDefinition; label: string; color: string; bg: string }> = {
  document: { icon: faFileLines, label: 'Dokumen', color: 'text-pink-600',   bg: 'bg-pink-50'  },
  video:    { icon: faVideo,     label: 'Video',   color: 'text-purple-600', bg: 'bg-purple-50'   },
  image:    { icon: faImage,     label: 'Gambar',  color: 'text-pink-500',   bg: 'bg-pink-100/50'}, // Adjusted for better pastel contrast
};

type FilterType = 'all' | 'document' | 'video' | 'image';

export default function PortfolioSection({ data }: Props) {
  // Show only 3 latest portfolio items
  const displayData = data.slice(0, 3);

  return (
    <section id="portfolio" className="relative py-20 overflow-hidden">
      {/* Background Decorative Elements (Matching Theme) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-xs opacity-20 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(70px)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-xs opacity-20 animate-pulse-slower"
          style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-xs opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle, #fce7f3, transparent)', filter: 'blur(50px)', animationDelay: '1s' }} />
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(190,24,93,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(190,24,93,0.02)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-32 right-20 w-20 h-20 border-2 border-pink-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-40 left-16 w-16 h-16 border-2 border-purple-400/10 rotate-45 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in relative">
          {/* Decorative quote marks */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-5">
            <FontAwesomeIcon icon={faQuoteLeft} className="text-6xl text-pink-500" />
          </div>
          
          <h2 className="section-title text-4xl md:text-5xl font-bold animate-fade-in delay-100 mb-4 relative">
            Artifacts &amp; Portfolio
            {/* Decorative dots */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/30"></div>
            </div>
          </h2>
          
          <p className="section-subtitle mx-auto text-center animate-fade-in delay-200 text-slate-600 max-w-2xl mb-6">
            Documentation of teaching activities, syllabi, and learning development works.
          </p>
          
          <div className="w-16 h-1 rounded-xs mx-auto animate-fade-in delay-300 relative" 
            style={{background: 'linear-gradient(90deg, #be185d, #e0bbff)'}}>
            {/* Small accent circles on line */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-500"></div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
        </div>

        {/* Cards Grid */}
        {displayData.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in delay-200">
              {displayData.map((item, index) => {
                const cfg = typeConfig[item.type];
                return (
                  <div
                    key={item.id ?? index}
                    className="card flex flex-col h-full rounded-xs shadow border-2 border-pink-100/50 bg-white bg-opacity-90 p-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden group/card"
                  >
                  {/* Left accent bar */}
                  <div className="absolute -left-0.5 top-8 bottom-8 w-1 bg-gradient-to-b from-pink-500 to-purple-400 rounded-r-full opacity-70 group-hover/card:opacity-100 transition-opacity z-10"></div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden z-10">
                    <div className="absolute top-0 right-0 w-full h-full bg-pink-50 opacity-50 transform rotate-45 translate-x-1/2 -translate-y-1/2 group-hover/card:bg-purple-50 transition-colors"></div>
                  </div>
                  
                  {/* Hover sparkle effect */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity z-20"></div>

                  {/* Thumbnail */}
                  <div className="h-32 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xs mb-3 flex items-center justify-center relative overflow-hidden border border-pink-100 group-hover/card:border-pink-200 transition-colors">
                    {item.thumbnail_url ? (
                      <img
                        src={resolveUrl(item.thumbnail_url)}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      cfg && (
                        <div className={`w-16 h-16 rounded-xs ${cfg.bg} flex items-center justify-center border border-white shadow-sm group-hover/card:scale-110 transition-transform duration-300`}>
                          <FontAwesomeIcon icon={cfg.icon} className={`w-8 h-8 ${cfg.color}`} />
                        </div>
                      )
                    )}
                    
                    {/* Overlay gradient on hover for image */}
                    {item.thumbnail_url && (
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    )}

                    {/* Type badge */}
                    {cfg && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1.5 rounded-xs ${cfg.bg} ${cfg.color} shadow-sm border border-white/60 backdrop-blur-sm`}>
                          <FontAwesomeIcon icon={cfg.icon} className="w-3 h-3" />
                          {cfg.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Container (flex-grow ensures buttons align at bottom) */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-bold text-slate-800 text-base mb-1.5 leading-snug group-hover/card:text-pink-600 transition-colors">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-slate-600 text-xs leading-relaxed mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {/* Link pushed to bottom */}
                    {item.url && (
                      <div className="mt-auto pt-2 border-t border-pink-50">
                        <a
                          href={resolveUrl(item.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-pink-600 font-semibold text-sm
                                     hover:text-pink-500 transition-colors group/link"
                        >
                          Lihat Selengkapnya
                          <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            </div>

            {/* View All Button */}
            {data.length > 0 && (
              <div className="flex justify-center mt-10">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-400 text-white font-semibold rounded-xs transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none"
                >
                  <span>Lihat Semua Portfolio</span>
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-xs border-2 border-dashed border-pink-200 max-w-3xl mx-auto">
            <FontAwesomeIcon icon={faFolderOpen} className="w-12 h-12 mx-auto mb-4 text-pink-300 opacity-50" />
            <p className="text-lg text-slate-500 font-medium">Belum ada portofolio atau artefak yang tersedia.</p>
          </div>
        )}
      </div>
    </section>
  );
}