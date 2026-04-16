'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faClipboardList, faCalendarDays, faCheck, faInbox, faQuoteLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ExperienceData } from '../../types';

interface Props {
  data: ExperienceData[];
}

export default function ExperienceSection({ data }: Props) {
  const displayData = data.slice(0, 3);

  const typeConfig: Record<string, { icon: any; label: string; color: string; bg: string }> = {
    formal: { icon: faSchool, label: 'Formal', color: 'text-pink-600', bg: 'bg-pink-50' },
    pkl: { icon: faClipboardList, label: 'PKL', color: 'text-purple-600', bg: 'bg-purple-50' },
  };

  return (
    <section id="experience" className="relative py-20 overflow-hidden">
      {/* Background Decorative Elements (Matching About Section) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative blobs */}
        <div className="absolute -top-16 right-0 w-72 h-72 rounded-xs opacity-20 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(70px)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-xs opacity-20 animate-pulse-slower"
          style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-xs opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle, #fce7f3, transparent)', filter: 'blur(50px)', animationDelay: '1s' }} />
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(190,24,93,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(190,24,93,0.02)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-40 left-20 w-20 h-20 border-2 border-pink-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 border-2 border-purple-400/10 rotate-45 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in relative">
          {/* Decorative quote marks */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-5">
            <FontAwesomeIcon icon={faQuoteLeft} className="text-6xl text-purple-400" />
          </div>
          
          <h2 className="section-title text-4xl md:text-5xl font-bold animate-fade-in delay-100 mb-4 relative">
            Experience
            {/* Decorative dots */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400/30"></div>
            </div>
          </h2>
          
          <p className="section-subtitle mx-auto text-center animate-fade-in delay-200 text-slate-600 max-w-2xl mb-6">
            My professional journey in the field of English language education.
          </p>
          
          <div className="w-16 h-1 rounded-xs mx-auto animate-fade-in delay-300 relative" 
            style={{background: 'linear-gradient(90deg, #be185d, #e0bbff)'}}>
            {/* Small accent circles on line */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-500"></div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
        </div>

        {/* Grid */}
        {displayData.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in delay-200">
              {displayData.map((exp, index) => {
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

            {/* View All Button */}
            {displayData.length > 0 && (
              <div className="flex justify-center mt-10">
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-400 text-white font-semibold rounded-xs transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none"
                >
                  Lihat Semua Pengalaman
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-xs border-2 border-dashed border-pink-200">
            <FontAwesomeIcon icon={faInbox} className="w-12 h-12 mx-auto mb-4 text-pink-300 opacity-50" />
            <p className="text-lg text-slate-500 font-medium">Belum ada data pengalaman.</p>
          </div>
        )}
      </div>
    </section>
  );
}