import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faLocationDot, faLanguage, faCircleCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { AboutData } from '../../types';

interface Props {
  data: AboutData | null;
}

const infoCards = [
  { icon: faGraduationCap, label: 'Pendidikan',  value: 'S1 Pendidikan Bahasa Inggris', color: 'text-blue-500',  bg: 'bg-blue-50' },
  { icon: faLocationDot,   label: 'Lokasi',       value: 'Bandung, Indonesia',          color: 'text-red-500',   bg: 'bg-red-50'  },
  { icon: faLanguage,      label: 'Bahasa',        value: 'Indonesia & English',         color: 'text-green-600', bg: 'bg-green-50'},
  { icon: faCircleCheck,   label: 'Status',        value: 'Terbuka untuk Peluang',       color: 'text-gold',      bg: 'bg-amber-50'},
];


// Helper agar preview file/gambar/file selalu benar ke backend
const getFullUrl = (url: string) =>
  url?.startsWith('/api/uploads/') ? 'http://localhost:5000' + url : url;

export default function AboutSection({ data }: Props) {
  const content   = data?.content   || '';
  const photoUrl  = getFullUrl(data?.photo_url || '');
  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge mb-3">Tentang Saya</span>
          <h2 className="section-title">Mengenal Saya Lebih Dekat</h2>
          <div className="w-16 h-1 bg-gold rounded-full mx-auto mt-3" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-14">
          {/* Photo */}
          <div className="shrink-0 relative">
            {/* Decorative blocks */}
            <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-3xl -z-10"
              style={{ background: 'linear-gradient(135deg, #be185d20, #7c3aed20)' }} />
            <div className="absolute -top-5 -left-5 w-20 h-20 rounded-full -z-10"
              style={{ background: 'radial-gradient(circle, #fce7f3, transparent)' }} />

            <div className="w-64 h-72 md:w-72 md:h-80 rounded-3xl overflow-hidden shadow-2xl
                            bg-gradient-to-br from-slate to-gray-100 flex items-center justify-center border border-gray-100">
              {photoUrl ? (
                <img src={photoUrl} alt="About" className="w-full h-full object-cover" />
              ) : (
                <FontAwesomeIcon icon={faUser} className="w-24 h-24 text-gray-300" />
              )}
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-3 -left-3 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-lg"
              style={{ background: 'linear-gradient(135deg, #be185d, #9d174d)' }}>
              2+ Years Experience
            </div>
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-navy mb-2">
              Pendidik Bahasa Inggris yang Berdedikasi
            </h3>
            <div className="w-12 h-1 rounded-full mb-5" style={{ background: 'linear-gradient(90deg, #be185d, #7c3aed)' }} />

            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p className="text-gray-400 italic">Belum ada konten tentang saya.</p>
              )}
            </div>

            {/* Key Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              {infoCards.map((item) => (
                <div key={item.label}
                  className="rounded-xl p-4 flex items-start gap-3 border border-gray-100 hover:border-gold/30 hover:shadow-sm transition-all">
                  <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                    <FontAwesomeIcon icon={item.icon} className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-navy font-semibold mt-0.5 leading-tight">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
