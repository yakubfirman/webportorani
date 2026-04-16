'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faCommentDots, faStar, faUser, faChevronLeft, faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { TestimonialData } from '../../types';
import { useState, useEffect } from 'react';
import { resolveUrl } from '../../lib/api';

interface Props {
  data: TestimonialData[];
}

export default function TestimonialsSection({ data }: Props) {
  // Show only 2 latest testimonials
  const displayData = data.slice(0, 2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-play carousel every 2 seconds
  useEffect(() => {
    if (!autoPlay || displayData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [autoPlay, displayData.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
    // Resume autoplay after 5 seconds
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? displayData.length - 1 : prevIndex - 1
    );
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayData.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000);
  };

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 px-6">
      {/* Background Decorative Elements (Matching Theme) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative blobs */}
        <div className="absolute -top-20 right-0 w-72 h-72 rounded-xs opacity-20 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(70px)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-xs opacity-20 animate-pulse-slower"
          style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-xs opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle, #fce7f3, transparent)', filter: 'blur(50px)', animationDelay: '1s' }} />
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(190,24,93,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(190,24,93,0.02)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-40 left-20 w-20 h-20 border-2 border-pink-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 border-2 border-purple-400/10 rotate-45 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in relative">
          {/* Badge styled to match new theme */}
          {/* Decorative quote marks */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none">
            <FontAwesomeIcon icon={faQuoteLeft} className="text-6xl text-purple-400" />
          </div>

          <h2 className="section-title text-4xl md:text-5xl font-bold animate-fade-in delay-100 relative">
            Apa Kata Mereka
            {/* Decorative dots */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400/30"></div>
            </div>
          </h2>

          <p className="section-subtitle mx-auto text-center animate-fade-in delay-200 text-slate-600 max-w-2xl mb-6">
            Kesan dari dosen pembimbing PKL, guru pamong, dan mantan siswa.
          </p>

          <div className="w-16 h-1 rounded-xs mx-auto animate-fade-in delay-300 relative" 
            style={{background: 'linear-gradient(90deg, #be185d, #e0bbff)'}}>
            {/* Small accent circles on line */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-500"></div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
        </div>

        {displayData.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-xs py-4 px-2">
              {/* Slides */}
              <div className="relative h-96 md:h-80">
                {displayData.map((testimonial, index) => (
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
                    {/* Card Container (Matching Experience & Skills Theme) */}
                    <div className="bg-white bg-opacity-90 border-2 border-pink-100/50 rounded-xs p-6 h-full flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group/card mx-auto max-w-3xl">
                      
                      {/* Left accent bar */}
                      <div className="absolute -left-0.5 top-8 bottom-8 w-1 bg-gradient-to-b from-pink-500 to-purple-400 rounded-r-full opacity-70 group-hover/card:opacity-100 transition-opacity"></div>

                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-full bg-pink-50 opacity-50 transform rotate-45 translate-x-1/2 -translate-y-1/2 group-hover/card:bg-purple-50 transition-colors"></div>
                      </div>

                      {/* Hover sparkle effect */}
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

                      <div>
                        {/* Quote icon & Stars Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 rounded-xs bg-pink-50 border border-pink-100 flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300">
                            <FontAwesomeIcon icon={faQuoteLeft} className="w-4 h-4 text-pink-500" />
                          </div>
                          
                          <div className="flex gap-1 mt-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <FontAwesomeIcon key={i} icon={faStar} className="w-3.5 h-3.5 text-yellow-400" />
                            ))}
                          </div>
                        </div>

                        {/* Content */}
                        <p className="text-slate-700 text-base md:text-lg leading-relaxed italic line-clamp-3 md:line-clamp-4 relative z-10 pl-2 border-l-2 border-transparent group-hover/card:border-pink-200 transition-colors">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-4 pt-3 border-t border-pink-100 mt-3 relative">
                        <div className="w-12 h-12 rounded-xs bg-pink-50 flex items-center justify-center overflow-hidden shrink-0 border border-pink-100 group-hover/card:border-pink-300 transition-colors">
                          {testimonial.photo_url ? (
                              <img src={resolveUrl(testimonial.photo_url)} alt={testimonial.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-300" />
                            ) : (
                            <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-pink-300" />
                          )}
                        </div>
                        <div>
                          <p className="text-slate-800 font-bold text-sm md:text-base leading-tight group-hover/card:text-pink-600 transition-colors">{testimonial.name}</p>
                          {testimonial.role && (
                            <p className="text-pink-500 text-xs mt-0.5 font-medium">{testimonial.role}</p>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows & Dots */}
            <div className="flex justify-center items-center gap-6 mt-6">
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="bg-white text-pink-500 border-2 border-pink-100 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 p-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-x-1 focus:outline-none"
                aria-label="Previous testimonial"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 pr-0.5" />
              </button>

              {/* Dots Navigation */}
              <div className="flex justify-center gap-2">
                {displayData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                      index === currentIndex
                        ? 'w-8 bg-gradient-to-r from-pink-500 to-purple-400 shadow-sm'
                        : 'w-2.5 bg-pink-200 hover:bg-pink-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="bg-white text-pink-500 border-2 border-pink-100 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 p-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:translate-x-1 focus:outline-none"
                aria-label="Next testimonial"
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 pl-0.5" />
              </button>
            </div>

            {/* Slide Counter */}
            <p className="text-center mt-4 text-slate-400 text-xs font-semibold tracking-widest">
              {currentIndex + 1} / {displayData.length}
            </p>

            {/* View All Button */}
            {data.length > 2 && (
              <div className="flex justify-center mt-10">
                <Link
                  href="/testimonials"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-400 text-white font-semibold rounded-xs transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none"
                >
                  <span>Lihat Semua Testimoni</span>
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-xs border-2 border-dashed border-pink-200 max-w-3xl mx-auto">
            <FontAwesomeIcon icon={faCommentDots} className="w-12 h-12 mx-auto mb-4 text-pink-300 opacity-50" />
            <p className="text-lg text-slate-500 font-medium">Belum ada testimoni.</p>
          </div>
        )}
      </div>
    </section>
  );
}