import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears, faLightbulb, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { SkillData } from '../../types';

interface Props {
  data: SkillData[];
}

function SkillBar({ skill }: { skill: SkillData }) {
  const pct = skill.level;
  const color = pct >= 80 ? '#be185d' : pct >= 60 ? '#e0bbff' : '#f9c6d3';
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-pink-700">{skill.name}</span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-50 border border-pink-200"
          style={{ color }}
        >
          {pct}%
        </span>
      </div>
      <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
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
      {/* Decorative pastel blob */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-xs opacity-20 pointer-events-none animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 right-0 w-56 h-56 rounded-xs opacity-20 pointer-events-none animate-pulse-slower"
        style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(50px)' }} />
        <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title text-4xl md:text-5xl font-bold animate-fade-in delay-100 mb-4">Skills &amp; Competencies</h2>
          <p className="section-subtitle mx-auto text-center animate-fade-in delay-200 text-slate-600 max-w-2xl">
            Technical and interpersonal abilities developed during studies and professional practice.
          </p>
          <div className="w-16 h-1 rounded-full mx-auto mt-6 animate-fade-in delay-300" style={{background: 'linear-gradient(90deg, #be185d, #e0bbff)'}} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Hard Skills */}
          <div className="card rounded-xs border-2 border-pink-300 hover:shadow-xl transition-shadow bg-white/90">
            <div className="flex items-center gap-3 mb-7 pb-5 border-b border-pink-200">
              <div className="w-11 h-11 rounded-xs bg-pink-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faGears} className="w-5 h-5 text-pink-700" />
              </div>
              <div>
                <h3 className="font-bold text-pink-900 text-lg leading-tight">Hard Skills</h3>
                <p className="text-pink-600 text-xs mt-0.5 font-medium">Technical &amp; Professional</p>
              </div>
            </div>

            {hardSkills.length > 0
              ? hardSkills.map((s) => <SkillBar key={s.id} skill={s} />)
              : <p className="text-pink-300 text-sm italic">No data available.</p>
            }
          </div>

          {/* Soft Skills */}
          <div className="card rounded-xs border-2 border-pink-300 hover:shadow-xl transition-shadow bg-white/90">
            <div className="flex items-center gap-3 mb-7 pb-5 border-b border-pink-200">
              <div className="w-11 h-11 rounded-xs bg-pink-100 flex items-center justify-center" style={{background:'#e0bbff'}}>
                <FontAwesomeIcon icon={faLightbulb} className="w-5 h-5 text-pink-700" />
              </div>
              <div>
                <h3 className="font-bold text-pink-900 text-lg leading-tight">Soft Skills</h3>
                <p className="text-pink-600 text-xs mt-0.5 font-medium">Interpersonal &amp; Communication Skills</p>
              </div>
            </div>

            {softSkills.length > 0
              ? softSkills.map((s) => <SkillBar key={s.id} skill={s} />)
              : <p className="text-pink-300 text-sm italic">No data available.</p>
            }
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-pink-700 font-semibold mb-5">
            <FontAwesomeIcon icon={faCertificate} className="w-4 h-4 text-pink-600" />
            Certifications &amp; Achievements
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xs border-2 border-pink-300 text-pink-700 text-sm font-medium bg-pink-50
                           hover:bg-pink-200 hover:text-pink-900 hover:border-pink-500 transition-all duration-200 cursor-default select-none"
              >
                <FontAwesomeIcon icon={faCertificate} className="w-3 h-3 text-pink-600" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
