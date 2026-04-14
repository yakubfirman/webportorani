import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUser, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { HeroData } from '../../types';
import Button from '../ui/Button';

interface Props {
  data: HeroData | null;
}

const getFullUrl = (url: string) =>
  url?.startsWith('/api/uploads/') ? 'http://localhost:5000' + url : url;

const STATS = [
  { num: '3+', label: 'Tahun Pengalaman' },
  { num: '50+', label: 'Siswa Terdampak' },
  { num: '10+', label: 'Proyek Edukasi' },
];

export default function HeroSection({ data }: Props) {
  const name        = data?.name        || 'Nama Anda';
  const headline    = data?.headline    || 'English Educator & Curriculum Specialist';
  const subheadline = data?.subheadline || 'Membantu siswa menguasai bahasa Inggris dengan metode pembelajaran yang adaptif dan kurikulum yang inovatif.';
  const photoUrl    = getFullUrl(data?.photo_url || '');
  const cvUrl       = getFullUrl(data?.cv_url    || '');

  return (
    <>
      <section id='hero' className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row gap-12 items-center animate-fade-in">

            {/* PHOTO - Mobile: top (default), Desktop: right (lg:order-2) */}
            <div className="w-full mt-10 md:mt-0 lg:w-1/2 items-end flex justify-center md:justify-end relative animate-fadeUp delay-3 lg:order-2">
              {/* Glow effect */}
              <div className="absolute w-[350px] h-[350px] bg-indigo-500/20 blur-3xl rounded-full animate-glow"></div>

              {/* PHOTO */}
              <div className="relative w-[320px] h-[400px] shape-blob overflow-hidden shadow-2xl animate-float border border-white/30 backdrop-blur-lg">
                {photoUrl ? (
                  <img src={photoUrl} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-slate-100">
                    <FontAwesomeIcon icon={faUser} className="text-5xl text-slate-300" />
                  </div>
                )}
              </div>
            </div>

            {/* TEXT - Mobile: bottom (default), Desktop: left (lg:order-1) */}
            <div className="w-full lg:w-1/2 animate-fadeUp flex flex-col justify-center items-center lg:items-start lg:order-1">
              {/* NAME */}
              <h1 className="text-4xl md:text-6xl text-center lg:text-left">
                <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent ">
                  {name}
                </span>
              </h1>

              {/* HEADLINE */}
              <h2 className="text-xl md:text-2xl text-slate-600 mb-2 max-w-xl leading-relaxed text-center lg:text-left">
                {headline}
              </h2>

              {/* DESC */}
              <p className="text-slate-500 text-lg mb-10 max-w-lg text-center lg:text-left">
                {subheadline}
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
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}