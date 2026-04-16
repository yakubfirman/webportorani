'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears, faLightbulb, faCertificate, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { SkillData } from '../../types';

interface Props {
  data: SkillData[];
}

function SkillBar({ skill }: { skill: SkillData }) {
  const pct = skill.level;
  const color = pct >= 80 ? '#be185d' : pct >= 60 ? '#e0bbff' : '#f9c6d3';
  return (
    <div className="mb-4 group/skill relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-700 group-hover/skill:text-pink-600 transition-colors">{skill.name}</span>
        <span
          className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-pink-50 border border-pink-100 shadow-sm group-hover/skill:scale-110 transition-transform duration-300"
          style={{ color }}
        >
          {pct}%
        </span>
      </div>
      <div className="h-2 bg-pink-50 border border-pink-100/50 rounded-full overflow-hidden relative">
        {/* Glow effect behind the bar */}
        <div 
          className="absolute top-0 bottom-0 left-0 opacity-0 group-hover/skill:opacity-30 blur-sm transition-opacity duration-300"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #be185d, #e0bbff)' }}
        />
        <div
          className="relative h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #be185d, #e0bbff, #f9c6d3)' }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection({ data }: Props) {
  const hardSkills = data.filter((s) => s.category === 'hard');
  const softSkills = data.filter((s) => s.category === 'soft');

  const certifications = [
    'TOEFL ITP', 'IELTS', 'Kurikulum Merdeka', 'Google Certified Educator', 'Cambridge TKT',
  ];

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      {/* Background Decorative Elements (Matching About & Experience) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-xs opacity-20 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(70px)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-xs opacity-20 animate-pulse-slower"
          style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-xs opacity-10 animate-pulse"
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
            Skills &amp; Competencies
            {/* Decorative dots */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/30"></div>
            </div>
          </h2>
          
          <p className="section-subtitle mx-auto text-center animate-fade-in delay-200 text-slate-600 max-w-2xl mb-6">
            Technical and interpersonal abilities developed during studies and professional practice.
          </p>
          
          <div className="w-16 h-1 rounded-xs mx-auto animate-fade-in delay-300 relative" 
            style={{background: 'linear-gradient(90deg, #be185d, #e0bbff)'}}>
            {/* Small accent circles on line */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-500"></div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Connecting line between cards (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-pink-200 to-transparent"></div>

          {/* Hard Skills Card */}
          <div className="card rounded-xs shadow border-2 border-pink-100/50 bg-white bg-opacity-90 p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] hover:-translate-y-1 relative overflow-hidden group/card">
            {/* Left accent bar */}
            <div className="absolute -left-0.5 top-6 bottom-6 w-1 bg-gradient-to-b from-pink-500 to-purple-400 rounded-r-full opacity-70 group-hover/card:opacity-100 transition-opacity"></div>
            
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-pink-50 opacity-50 transform rotate-45 translate-x-1/2 -translate-y-1/2 group-hover/card:bg-pink-100 transition-colors"></div>
            </div>
            
            {/* Hover sparkle effect */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-pink-100 relative">
              <div className="w-12 h-12 rounded-xs bg-pink-50 flex items-center justify-center border border-pink-100 group-hover/card:scale-110 transition-transform duration-300 group-hover/card:border-pink-200 group-hover/card:shadow-sm">
                <FontAwesomeIcon icon={faGears} className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-xl leading-tight group-hover/card:text-pink-600 transition-colors">Hard Skills</h3>
                <p className="text-pink-400 text-xs mt-1 font-medium">Technical &amp; Professional</p>
              </div>
            </div>

            <div className="relative">
              {hardSkills.length > 0
                ? hardSkills.map((s) => <SkillBar key={s.id} skill={s} />)
                : <p className="text-slate-400 text-sm italic text-center py-4">No data available.</p>
              }
            </div>
          </div>

          {/* Soft Skills Card */}
          <div className="card rounded-xs shadow border-2 border-pink-100/50 bg-white bg-opacity-90 p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] hover:-translate-y-1 relative overflow-hidden group/card">
            {/* Left accent bar */}
            <div className="absolute -left-0.5 top-6 bottom-6 w-1 bg-gradient-to-b from-purple-400 to-pink-500 rounded-r-full opacity-70 group-hover/card:opacity-100 transition-opacity"></div>
            
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-purple-50 opacity-50 transform rotate-45 translate-x-1/2 -translate-y-1/2 group-hover/card:bg-purple-100 transition-colors"></div>
            </div>
            
            {/* Hover sparkle effect */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-pink-100 relative">
              <div className="w-12 h-12 rounded-xs bg-purple-50 flex items-center justify-center border border-purple-100 group-hover/card:scale-110 transition-transform duration-300 group-hover/card:border-purple-200 group-hover/card:shadow-sm">
                <FontAwesomeIcon icon={faLightbulb} className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-xl leading-tight group-hover/card:text-purple-600 transition-colors">Soft Skills</h3>
                <p className="text-purple-400 text-xs mt-1 font-medium">Interpersonal &amp; Communication</p>
              </div>
            </div>

            <div className="relative">
              {softSkills.length > 0
                ? softSkills.map((s) => <SkillBar key={s.id} skill={s} />)
                : <p className="text-slate-400 text-sm italic text-center py-4">No data available.</p>
              }
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-16 text-center animate-fade-in delay-200 relative">
          <div className="inline-flex items-center gap-2 text-sm text-pink-600 font-bold tracking-wide uppercase mb-6 bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100 shadow-sm">
            <FontAwesomeIcon icon={faCertificate} className="w-4 h-4" />
            Certifications &amp; Achievements
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xs border-2 border-pink-100/70 text-slate-700 text-sm font-medium bg-white/90 shadow-sm
                           hover:shadow-md hover:border-pink-300 hover:text-pink-600 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-default select-none group/badge relative overflow-hidden"
              >
                {/* Subtle hover background sweep */}
                <div className="absolute inset-0 bg-pink-50 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300 -z-10"></div>
                
                <FontAwesomeIcon icon={faCertificate} className="w-3.5 h-3.5 text-pink-400 group-hover/badge:text-pink-500 transition-colors" />
                <span className="relative z-10">{cert}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}