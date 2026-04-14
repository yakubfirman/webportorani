import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faLocationDot, faLanguage, faCircleCheck, faUser, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { AboutData } from '../../types';
import { resolveUrl } from '../../lib/api';

interface Props {
  data: AboutData | null;
}

const infoCards = [
  { icon: faGraduationCap, label: 'Pendidikan',  value: 'S1 Pendidikan Bahasa Inggris', color: 'text-pink-500',  bg: 'bg-pink-50' },
  { icon: faLocationDot,   label: 'Lokasi',       value: 'Tuban, East Java',          color: 'text-purple-400',   bg: 'bg-purple-50'  },
];

export default function AboutSection({ data }: Props) {
  const content   = data?.content   || '';
  const photoUrl  = resolveUrl(data?.photo_url || '');
  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-xs opacity-20 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(70px)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-xs opacity-20 animate-pulse-slower"
          style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-xs opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle, #fce7f3, transparent)', filter: 'blur(50px)', animationDelay: '1s' }} />
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(190,24,93,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(190,24,93,0.02)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-32 right-20 w-20 h-20 border-2 border-pink-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-40 left-16 w-16 h-16 border-2 border-purple-400/10 rotate-45 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-pink-400/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in relative">
          {/* Decorative quote marks */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-5">
            <FontAwesomeIcon icon={faQuoteLeft} className="text-6xl text-pink-500" />
          </div>
          
          <h2 className="section-title text-4xl md:text-5xl font-bold animate-fade-in delay-100 mb-6 relative">
            About Me
            {/* Decorative dots */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/30"></div>
            </div>
          </h2>
          
          <div className="w-16 h-1 rounded-xs mx-auto animate-fade-in delay-200 relative" 
            style={{background: 'linear-gradient(90deg, #be185d, #e0bbff)'}}>
            {/* Small accent circles on line */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-500"></div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-16 animate-fade-in delay-100">
          {/* Photo */}
          <div className="shrink-0 relative group">
            {/* Multiple decorative layers */}
            <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-xs -z-10 animate-fade-in delay-200 group-hover:scale-110 transition-transform duration-300"
              style={{ background: 'linear-gradient(135deg, #f9c6d3 60%, #e0bbff 100%)' }} />
            <div className="absolute -top-3 -left-3 w-12 h-12 rounded-xs -z-10 animate-fade-in delay-300 group-hover:scale-110 transition-transform duration-300"
              style={{ background: 'radial-gradient(circle, #fce7f3, transparent)' }} />
            
            {/* Decorative corner lines */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-pink-500/30"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-purple-400/30"></div>
            
            {/* Rotating ring */}
            <div className="absolute inset-0 -m-6 border border-pink-500/20 rounded-xs animate-spin-slow"></div>

            {/* Photo container */}
            <div className="w-48 h-56 sm:w-56 sm:h-64 md:w-64 md:h-72 rounded-xs overflow-hidden shadow-lg bg-white flex items-center justify-center border-2 border-pink-300 transition-all duration-500 hover:scale-105 relative">
              {photoUrl ? (
                <img src={photoUrl} alt="About" className="w-full h-full object-cover transition-all duration-500 hover:scale-110" />
              ) : (
                <FontAwesomeIcon icon={faUser} className="w-20 h-20 text-pink-200" />
              )}
              
              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Floating accent dots */}
            <div className="absolute -top-2 right-8 w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
            <div className="absolute bottom-8 -left-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Info Cards with enhanced decoration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7 relative">
              {/* Connecting line between cards */}
              <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-pink-200 to-transparent"></div>
              
              {infoCards.map((card, i) => (
                <div key={i} className={`flex items-center gap-3 p-4 rounded-xs shadow border-2 ${card.bg} ${card.color} bg-opacity-90 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 relative group`}>
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-full h-full ${card.bg} opacity-50 transform rotate-45 translate-x-1/2 -translate-y-1/2`}></div>
                  </div>
                  
                  <div className={`w-10 h-10 rounded-xs flex items-center justify-center ${card.bg} ${card.color} shadow-sm group-hover:scale-110 transition-transform relative`}>
                    <FontAwesomeIcon icon={card.icon} className="w-5 h-5" />
                    {/* Icon glow effect */}
                    <div className={`absolute inset-0 rounded-xs ${card.bg} opacity-0 group-hover:opacity-50 blur-sm transition-opacity`}></div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">{card.label}</div>
                    <div className="text-sm font-semibold">{card.value}</div>
                  </div>
                  
                  {/* Hover sparkle effect */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>

            {/* Text content with enhanced styling */}
            <div className="relative">
              {/* Large decorative quote */}
              <div className="absolute -left-8 top-0 opacity-5 hidden lg:block">
                <FontAwesomeIcon icon={faQuoteLeft} className="text-7xl text-pink-500" />
              </div>
              
              {paragraphs.map((p, i) => (
                <div key={i} className="relative mb-4">
                  {/* Left accent bar */}
                  {i === 0 && (
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-purple-400 rounded-full"></div>
                  )}
                  
                  <p className="text-slate-700 text-base leading-relaxed animate-fade-in delay-200 hover:text-slate-900 transition-colors pl-2">
                    {p}
                  </p>
                  
                  {/* Paragraph separator */}
                  {i < paragraphs.length - 1 && (
                    <div className="flex gap-1 mt-3 justify-center md:justify-start">
                      <div className="w-1 h-1 rounded-full bg-pink-500/30"></div>
                      <div className="w-1 h-1 rounded-full bg-purple-400/30"></div>
                      <div className="w-1 h-1 rounded-full bg-pink-500/30"></div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Closing quote */}
              <div className="flex justify-end mt-4 opacity-20">
                <FontAwesomeIcon icon={faQuoteRight} className="text-3xl text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}