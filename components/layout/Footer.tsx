import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { ContactInfoData } from '../../types';

interface FooterProps {
  contactData?: ContactInfoData | null;
}

export default function Footer({ contactData }: FooterProps) {
  const year = new Date().getFullYear();
  
  const navLinks = [
    { name: 'Tentang', href: '#about' },
    { name: 'Pengalaman', href: '#experience' },
    { name: 'Keahlian', href: '#skills' },
    { name: 'Portofolio', href: '#portfolio' },
    { name: 'Kontak', href: '#contact' }
  ];

  return (
    <footer className="text-white bg-gradient-to-br from-pink-600 via-rose-500 to-pink-700 relative overflow-hidden">
      {/* Pattern Background (Subtle Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 pointer-events-none"></div>
      
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          {/* Col 1: Branding & Bio (Takes up more space) */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#" className="group inline-block">
              <h2 
                className="text-white font-black text-3xl tracking-wide transition-transform duration-300 group-hover:scale-105" 
                style={{ fontFamily: "'Catamaran', sans-serif" }}
              >
                Maharani Rizka
              </h2>
            </a>
            <p className="text-pink-100 text-sm mt-2 font-semibold tracking-wide uppercase letter-spacing-2">
              English Educator & Curriculum Specialist
            </p>
            <p className="text-pink-100/80 mt-4 text-sm leading-relaxed max-w-sm">
              Berdedikasi dalam menciptakan pengalaman belajar yang menarik, inovatif, dan relevan dengan kebutuhan pendidikan masa kini.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 lg:col-span-4 flex flex-col items-center md:items-start">
            <h3 className="text-white font-bold text-lg mb-5 tracking-wide">Tautan Cepat</h3>
            <ul className="space-y-3 text-pink-100">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="relative text-sm font-medium hover:text-white transition-colors duration-300 group inline-block"
                  >
                    {link.name}
                    {/* Animated Underline */}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full rounded-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social & Contact */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center md:items-start">
            <h3 className="text-white font-bold text-lg mb-5 tracking-wide">Mari Terhubung</h3>
            <p className="text-pink-100/80 text-sm mb-5 text-center md:text-left">
              Punya proyek, ide kolaborasi, atau sekadar ingin menyapa? Jangan ragu untuk menghubungi saya.
            </p>
            <div className="flex items-center gap-4">
              {contactData?.linkedin_url && (
                <a 
                  href={contactData.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white border border-white/20 hover:border-white hover:text-pink-600 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_20px_rgba(255,255,255,0.3)] hover:-translate-y-1 text-white backdrop-blur-sm"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} className="w-5 h-5" />
                </a>
              )}
              {contactData?.instagram && (
                <a 
                  href={`https://instagram.com/${contactData.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white border border-white/20 hover:border-white hover:text-pink-600 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-[0_8px_20px_rgba(255,255,255,0.3)] hover:-translate-y-1 text-white backdrop-blur-sm"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8"></div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-pink-100/90 font-medium">
          <p className="text-center md:text-left">
            &copy; {year} Maharani Rizka Ramadhani Wijaya. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
            <span>Dibuat dengan</span>
            <FontAwesomeIcon icon={faHeart} className="w-3.5 h-3.5 text-white animate-pulse drop-shadow-md" />
            <span>di Indonesia</span>
          </p>
        </div>

      </div>
    </footer>
  );
}