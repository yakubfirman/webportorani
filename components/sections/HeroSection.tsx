import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUser, faArrowRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { HeroData } from '../../types';
import Button from '../ui/Button';
import { resolveUrl } from '../../lib/api';

interface Props {
  data: HeroData | null;
}

const STATS = [
  { num: '3+', label: 'Tahun Pengalaman' },
  { num: '50+', label: 'Siswa Terdampak' },
  { num: '10+', label: 'Proyek Edukasi' },
];

export default function HeroSection({ data }: Props) {
  const name        = data?.name        || 'Nama Anda';
  const headline    = data?.headline    || 'English Educator & Curriculum Specialist';
  const subheadline = data?.subheadline || 'Membantu siswa menguasai bahasa Inggris dengan metode pembelajaran yang adaptif dan kurikulum yang inovatif.';
  const photoUrl = resolveUrl(data?.photo_url || '');
  const cvUrl = resolveUrl(data?.cv_url || '');

  return (
    <>
      <section id='hero' className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating circles */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
          
          {/* Corner ornaments */}
          <div className="absolute top-0 left-0 w-40 h-40 border-l-2 border-t-2 border-pink-500/10"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-rose-500/10"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center animate-fade-in">

            {/* PHOTO - Mobile: top (default), Desktop: right (lg:order-2) */}
            <div className="w-full mt-10 md:mt-0 lg:w-1/2 items-end flex justify-center md:justify-end relative animate-fadeUp delay-3 lg:order-2">
              {/* Multiple glow layers */}
              <div className="absolute w-[350px] h-[350px] bg-indigo-500/20 blur-3xl rounded-full animate-glow"></div>
              <div className="absolute w-[280px] h-[280px] bg-pink-500/10 blur-2xl rounded-full animate-glow" style={{ animationDelay: '0.5s' }}></div>

              {/* Decorative rings around photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[380px] h-[460px] border border-pink-500/20 rounded-[30% 70% 70% 30% / 30% 30% 70% 70%] animate-spin-slow"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[420px] h-[500px] border border-rose-500/10 rounded-[70% 30% 30% 70% / 70% 70% 30% 30%] animate-spin-reverse"></div>
              </div>

              {/* PHOTO */}
              <div className="mt-20 md:mt-0 relative w-[320px] h-[400px] shape-blob overflow-hidden shadow-2xl animate-float border border-white/30 backdrop-blur-lg z-10">
                {photoUrl ? (
                  <img src={photoUrl} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-slate-100">
                    <FontAwesomeIcon icon={faUser} className="text-5xl text-slate-300" />
                  </div>
                )}
              </div>

              {/* Floating accent dots */}
              <div className="absolute top-10 -left-6 w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
              <div className="absolute bottom-20 -right-4 w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute top-32 right-10 w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
            </div>

            {/* TEXT - Mobile: bottom (default), Desktop: left (lg:order-1) */}
            <div className="w-full lg:w-1/2 animate-fadeUp flex flex-col justify-center items-center lg:items-start lg:order-1">
              {/* Decorative quote mark */}
              <div className="mb-4 opacity-20">
                <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl text-pink-600" />
              </div>

              {/* NAME */}
              <h1 className="text-4xl md:text-6xl text-center lg:text-left relative">
                <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                  {name}
                </span>
                {/* Underline accent */}
                <div className="absolute -bottom-2 left-0 lg:left-0 right-0 lg:right-auto w-full lg:w-2/3 h-1 bg-gradient-to-r from-pink-600/30 to-transparent rounded-full"></div>
              </h1>

              {/* HEADLINE */}
              <h2 className="text-xl md:text-2xl text-slate-600 mb-2 mt-6 max-w-xl leading-relaxed text-center lg:text-left relative">
                {headline}
                {/* Small decorative line */}
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-pink-500 rounded-full hidden lg:block"></div>
              </h2>

              {/* DESC */}
              <p className="text-slate-500 text-lg mb-10 max-w-lg text-center lg:text-left relative pl-6 lg:pl-0">
                {/* Quote decoration on mobile */}
                <span className="absolute left-0 top-0 text-pink-500/20 lg:hidden"></span>
                {subheadline}
                <span className="absolute right-0 bottom-0 text-pink-500/20 lg:hidden"></span>
              </p>

              {/* BUTTON */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12 animate-fadeUp delay-1">
                <Button href={cvUrl} target="_blank" rel="noopener noreferrer" variant="primary">
                  <FontAwesomeIcon icon={faDownload} />
                  Download CV
                </Button>
                <Button href="#contact" variant="outline">
                  <FontAwesomeIcon icon={faArrowRight} />
                  Contact Me
                </Button>
              </div>

              {/* Stats section */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 border-t border-slate-200 w-full">
                {STATS.map((stat, idx) => (
                  <div key={idx} className="text-center lg:text-left group">
                    <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                      {stat.num}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}