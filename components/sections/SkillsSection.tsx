import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears, faLightbulb, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { SkillData } from '../../types';

interface Props {
  data: SkillData[];
}

function SkillBar({ skill }: { skill: SkillData }) {
  const pct = skill.level;
  const color = pct >= 80 ? '#15803d' : pct >= 60 ? '#be185d' : '#64748b';
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-navy">{skill.name}</span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {pct}%
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #7c3aed, #be185d)' }}
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
    <section id="skills" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge mb-3">Keahlian</span>
          <h2 className="section-title">Skills &amp; Kompetensi</h2>
          <p className="section-subtitle mx-auto text-center">
            Kemampuan teknis dan interpersonal yang dikembangkan selama studi dan praktik profesional.
          </p>
          <div className="w-16 h-1 bg-gold rounded-full mx-auto mt-3" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Hard Skills */}
          <div className="card border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-7 pb-5 border-b border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-navy/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faGears} className="w-5 h-5 text-navy" />
              </div>
              <div>
                <h3 className="font-bold text-navy text-lg leading-tight">Hard Skills</h3>
                <p className="text-gray-400 text-xs mt-0.5">Kemampuan Teknis &amp; Profesional</p>
              </div>
            </div>
            {hardSkills.length > 0
              ? hardSkills.map((s) => <SkillBar key={s.id} skill={s} />)
              : <p className="text-gray-400 text-sm italic">Belum ada data.</p>
            }
          </div>

          {/* Soft Skills */}
          <div className="card border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-7 pb-5 border-b border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                <FontAwesomeIcon icon={faLightbulb} className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-bold text-navy text-lg leading-tight">Soft Skills</h3>
                <p className="text-gray-400 text-xs mt-0.5">Kemampuan Interpersonal &amp; Komunikasi</p>
              </div>
            </div>
            {softSkills.length > 0
              ? softSkills.map((s) => <SkillBar key={s.id} skill={s} />)
              : <p className="text-gray-400 text-sm italic">Belum ada data.</p>
            }
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 font-medium mb-5">
            <FontAwesomeIcon icon={faCertificate} className="w-4 h-4 text-gold" />
            Sertifikasi &amp; Pencapaian
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-navy/15 text-navy text-sm font-medium
                           hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 cursor-default select-none"
              >
                <FontAwesomeIcon icon={faCertificate} className="w-3 h-3 text-gold group-hover:text-white" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
