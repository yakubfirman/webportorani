import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faCommentDots, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { TestimonialData } from '../../types';

interface Props {
  data: TestimonialData[];
}

export default function TestimonialsSection({ data }: Props) {
  return (
    <section id="testimonials" className="section-padding overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)' }}>
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #f9a8d4, transparent)', filter: 'blur(100px)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #c4b5fd, transparent)', filter: 'blur(80px)' }} />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-white/10 text-pink-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 mb-3">
            <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
            Testimoni
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Apa Kata Mereka</h2>
          <p className="text-white/55 text-base max-w-xl mx-auto leading-relaxed">
            Kesan dari dosen pembimbing PKL, guru pamong, dan mantan siswa.
          </p>
          <div className="w-16 h-1 rounded-full mx-auto mt-4" style={{ background: 'linear-gradient(90deg, #ec4899, #a78bfa)' }} />
        </div>

        {data.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((testimonial, index) => (
              <div
                key={testimonial.id ?? index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
              >
                {/* Quote icon */}
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faQuoteLeft} className="w-4 h-4 text-gold" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="w-3.5 h-3.5 text-gold" />
                  ))}
                </div>

                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center overflow-hidden shrink-0">
                    {testimonial.photo_url ? (
                      <img src={testimonial.photo_url} alt={testimonial.name} className="w-full h-full object-cover" />
                    ) : (
                      <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-gold/80" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-white/45 text-xs mt-0.5">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-white/35">
            <FontAwesomeIcon icon={faCommentDots} className="w-14 h-14 mx-auto mb-4" />
            <p className="text-lg font-medium">Belum ada testimoni.</p>
          </div>
        )}
      </div>
    </section>
  );
}
