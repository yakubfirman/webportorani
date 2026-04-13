import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faDownload, faChevronDown, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { HeroData } from '../../types';

interface Props {
  data: HeroData | null;
}


// Helper agar preview file/gambar/file selalu benar ke backend
const getFullUrl = (url: string) =>
  url?.startsWith('/api/uploads/') ? 'http://localhost:5000' + url : url;

export default function HeroSection({ data }: Props) {
  const name = data?.name || 'Nama Anda';
  const headline = data?.headline || 'English Educator & Curriculum Specialist';
  const subheadline = data?.subheadline || '';
  const photoUrl = getFullUrl(data?.photo_url || '');
  const cvUrl = getFullUrl(data?.cv_url || '');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 45%, #be185d 100%)' }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #f9a8d4, transparent)', filter: 'blur(70px)' }} />
      <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #c4b5fd, transparent)', filter: 'blur(90px)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #fff, transparent)' }} />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

      <div className="container-max section-padding w-full flex flex-col md:flex-row items-center gap-14 relative z-10 pb-32 md:pb-20">
        {/* Text Content */}
        <div className="flex-1 text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 backdrop-blur-sm rounded-full px-4 py-2 mb-7">
            <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-pink-300" />
            <span className="text-sm font-medium text-white">English Educator</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-4 tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {name}
          </h1>

          <h2 className="text-lg md:text-xl font-light text-white/80 mb-6 tracking-wide">
            {headline}
          </h2>

          {subheadline && (
            <p className="text-white/65 text-base leading-relaxed mb-8 max-w-lg">
              {subheadline}
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 bg-white text-navy font-bold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
              Hubungi Saya
            </a>

            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border-2 border-white/40 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/15 hover:border-white/70 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                Unduh CV
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-white/15">
            {[
              { num: '2+',  label: 'Tahun Pengalaman'   },
              { num: '30+', label: 'Siswa Dibimbing'     },
              { num: '10+', label: 'Materi Dikembangkan' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-black text-white leading-none"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{stat.num}</p>
                <p className="text-white/55 text-sm mt-1.5 font-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Photo */}
        <div className="relative shrink-0 z-10">
          {/* Outer decorative rings */}
          <div className="absolute -inset-10 rounded-full border border-white/10" />
          <div className="absolute -inset-5 rounded-full border-2 border-white/20" />
          {/* Glowing ring */}
          <div className="absolute -inset-2 rounded-full opacity-40"
            style={{ background: 'conic-gradient(from 0deg, #ec4899, #a78bfa, #ec4899)', filter: 'blur(8px)' }} />

          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl relative
                          bg-gradient-to-br from-white/15 to-white/5 flex items-center justify-center">
            {photoUrl ? (
              <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <FontAwesomeIcon icon={faUser} className="w-28 h-28 text-white/25" />
            )}
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-3 -right-3 bg-white text-navy text-xs font-bold px-4 py-2 rounded-full shadow-xl whitespace-nowrap border border-pink-100">
            ✨ English Educator
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
      >
        <FontAwesomeIcon icon={faChevronDown} className="w-6 h-6" />
      </a>

      {/* Wave bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '80px', fill: '#fdf4ff' }}>
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
