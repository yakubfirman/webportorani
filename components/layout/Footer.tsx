import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCode } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #12104a 100%)' }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-lg" style={{ fontFamily: "'Catamaran', sans-serif", fontWeight: 900 }}>
              <span className="text-gold">✦</span> Portfolio <span className="text-gold">✦</span>
            </p>
            <p className="text-white/40 text-xs mt-1">English Educator &amp; Curriculum Specialist</p>
          </div>

          {/* Nav */}
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-white/50">
            {['Tentang', 'Pengalaman', 'Keahlian', 'Portofolio', 'Kontak'].map((item, i) => {
              const hrefs = ['#about', '#experience', '#skills', '#portfolio', '#contact'];
              return (
                <li key={item}>
                  <a href={hrefs[i]} className="hover:text-white transition-colors">{item}</a>
                </li>
              );
            })}
          </ul>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href="#contact"
              className="w-9 h-9 rounded-xs bg-white/10 hover:bg-gold hover:text-white flex items-center justify-center transition-all text-white/60">
              <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4" />
            </a>
            <a href="#contact"
              className="w-9 h-9 rounded-xs bg-white/10 hover:bg-gold hover:text-white flex items-center justify-center transition-all text-white/60">
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            </a>
          </div>
        </div>

        <hr className="border-white/10 my-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p>
            &copy; {year} Portfolio. Dibuat dengan{' '}
            <FontAwesomeIcon icon={faHeart} className="w-3 h-3 text-red-400 mx-0.5" />
            menggunakan{' '}
            <FontAwesomeIcon icon={faCode} className="w-3 h-3 mx-0.5" />
            Next.js &amp; Flask.
          </p>
          <a href="/admin" className="hover:text-white/60 transition-colors">
            Admin Panel
          </a>
        </div>
      </div>
    </footer>
  );
}
