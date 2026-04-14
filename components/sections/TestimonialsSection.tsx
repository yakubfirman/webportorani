import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faCommentDots, faStar, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { TestimonialData } from '../../types';
import { useState, useEffect } from 'react';

const getFullUrl = (url: string) => url?.startsWith('/api/uploads/') ? 'http://localhost:5000' + url : url;

interface Props {
  data: TestimonialData[];
}

export default function TestimonialsSection({ data }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-play carousel every 2 seconds
  useEffect(() => {
    if (!autoPlay || data.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [autoPlay, data.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
    // Resume autoplay after 5 seconds
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000);
  };
  return (
    <section id="testimonials" className="relative overflow-hidden py-20 px-6">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-3xl opacity-20 pointer-events-none animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(100px)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-3xl opacity-20 pointer-events-none animate-pulse-slower"
        style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="badge mb-4 bg-pink-100 text-pink-700 border-pink-200 animate-fade-in inline-flex items-center gap-2"> 
            <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
            Testimoni
          </span>
          <h2 className="section-title text-4xl md:text-5xl font-bold animate-fade-in delay-100 mb-4">Apa Kata Mereka</h2>
          <p className="section-subtitle mx-auto text-center animate-fade-in delay-200 text-slate-600 max-w-2xl">
            Kesan dari dosen pembimbing PKL, guru pamong, dan mantan siswa.
          </p>
          <div className="w-16 h-1 rounded-full mx-auto mt-6 animate-fade-in delay-300" style={{background: 'linear-gradient(90deg, #be185d, #e0bbff)'}} />
        </div>

        {data.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-xs">
              {/* Slides */}
              <div className="relative h-96 md:h-80">
                {data.map((testimonial, index) => (
                  <div
                    key={testimonial.id ?? index}
                    className={`absolute w-full h-full transition-all duration-500 ease-in-out ${
                      index === currentIndex 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-95'
                    }`}
                    style={{
                      pointerEvents: index === currentIndex ? 'auto' : 'none',
                    }}
                  >
                    <div className="bg-white/95 border-2 border-pink-300 rounded-xs p-8 h-full flex flex-col justify-between hover:border-pink-400 transition-all duration-200 shadow-lg hover:shadow-xl">
                      {/* Quote icon */}
                      <div>
                        <div className="w-10 h-10 rounded-xs bg-pink-200 flex items-center justify-center mb-4">
                          <FontAwesomeIcon icon={faQuoteLeft} className="w-4 h-4 text-pink-700" />
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="w-4 h-4 text-yellow-400" />
                          ))}
                        </div>

                        <p className="text-slate-700 text-base leading-relaxed italic line-clamp-3">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t border-pink-200 mt-4">
                        <div className="w-12 h-12 rounded-xs bg-pink-100 flex items-center justify-center overflow-hidden shrink-0">
                          {testimonial.photo_url ? (
                              <img src={getFullUrl(testimonial.photo_url)} alt={testimonial.name} className="w-full h-full object-cover" />
                            ) : (
                            <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-pink-300" />
                          )}
                        </div>
                        <div>
                          <p className="text-slate-800 font-semibold text-sm leading-tight">{testimonial.name}</p>
                          {testimonial.role && (
                            <p className="text-slate-600 text-xs mt-0.5 font-medium">{testimonial.role}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows (Below Carousel) */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={goToPrevious}
                className="bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-xs transition-all duration-200 shadow-lg hover:shadow-xl"
                aria-label="Previous testimonial"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
              </button>

              {/* Dots Navigation */}
              <div className="flex justify-center gap-2">
                {data.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-pink-500 w-8'
                        : 'bg-slate-400 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-xs transition-all duration-200 shadow-lg hover:shadow-xl"
                aria-label="Next testimonial"
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Counter */}
            <p className="text-center mt-4 text-slate-600 text-sm font-medium">
              {currentIndex + 1} / {data.length}
            </p>
          </div>
        ) : (
          <div className="text-center py-20 text-pink-300/60">
            <FontAwesomeIcon icon={faCommentDots} className="w-14 h-14 mx-auto mb-4" />
            <p className="text-lg font-medium">Belum ada testimoni.</p>
          </div>
        )}
      </div>
    </section>
  );
}
