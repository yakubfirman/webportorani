
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faLocationDot, faLanguage, faCircleCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { AboutData } from '../../types';

interface Props {
  data: AboutData | null;
}

const infoCards = [
  { icon: faGraduationCap, label: 'Pendidikan',  value: 'S1 Pendidikan Bahasa Inggris', color: 'text-pink-500',  bg: 'bg-pink-50' },
  { icon: faLocationDot,   label: 'Lokasi',       value: 'Tuban, East Java',          color: 'text-purple-400',   bg: 'bg-purple-50'  },
];

// Helper agar preview file/gambar/file selalu benar ke backend
const getFullUrl = (url: string) =>
  url?.startsWith('/api/uploads/') ? 'http://localhost:5000' + url : url;

export default function AboutSection({ data }: Props) {
  const content   = data?.content   || '';
  const photoUrl  = getFullUrl(data?.photo_url || '');
  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <section id="about" className="relative py-20  overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-xs opacity-20 pointer-events-none animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(70px)' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-xs opacity-20 pointer-events-none animate-pulse-slower"
        style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(60px)' }} />

        <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title text-4xl md:text-5xl font-bold animate-fade-in delay-100 mb-6">About Me</h2>
          <div className="w-16 h-1 rounded-xs mx-auto animate-fade-in delay-200" style={{background: 'linear-gradient(90deg, #be185d, #e0bbff)'}} />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-16 animate-fade-in delay-100">
          {/* Photo */}
          <div className="shrink-0 relative">
            {/* Decorative blocks */}
            <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-xs -z-10 animate-fade-in delay-200"
              style={{ background: 'linear-gradient(135deg, #f9c6d3 60%, #e0bbff 100%)' }} />
            <div className="absolute -top-3 -left-3 w-12 h-12 rounded-xs -z-10 animate-fade-in delay-300"
              style={{ background: 'radial-gradient(circle, #fce7f3, transparent)' }} />

            <div className="w-48 h-56 sm:w-56 sm:h-64 md:w-64 md:h-72 rounded-xs overflow-hidden shadow-lg bg-white flex items-center justify-center border-2 border-pink-300 transition-all duration-500 hover:scale-105">
              {photoUrl ? (
                <img src={photoUrl} alt="About" className="w-full h-full object-cover transition-all duration-500 hover:scale-110" />
              ) : (
                <FontAwesomeIcon icon={faUser} className="w-20 h-20 text-pink-200" />
              )}
            </div>

            
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
              {infoCards.map((card, i) => (
                <div key={i} className={`flex items-center gap-3 p-4 rounded-xs shadow border-2 ${card.bg} ${card.color} bg-opacity-90 transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                  <div className={`w-10 h-10 rounded-xs flex items-center justify-center ${card.bg} ${card.color} shadow-sm`}>
                    <FontAwesomeIcon icon={card.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">{card.label}</div>
                    <div className="text-sm font-semibold">{card.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {paragraphs.map((p, i) => (
              <p key={i} className="mb-4 text-slate-700 text-base leading-relaxed animate-fade-in delay-200">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
