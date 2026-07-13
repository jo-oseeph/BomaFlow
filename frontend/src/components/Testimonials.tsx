import { QuoteIcon, StarIcon } from './icons'

const testimonials = [
  {
    name: 'Ali Raza',
    city: 'Lavington, Kenya',
    text: 'BomaFlow made our home buying experience seamless and stress-free. Their team was professional, knowledgeable, and always available to answer our questions.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    name: 'Fatima Khan',
    city: 'Westlands, Kenya',
    text: 'I found my dream apartment through BomaFlow. The process was transparent and efficient. Highly recommend their services to anyone looking for property.',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  },
  {
    name: 'Ahmed Hassan',
    city: 'Karen, Kenya',
    text: 'Excellent service from start to finish. The website understood exactly what we were looking for and found us the perfect family home within our budget.',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  },
]

export default function Testimonials() {
  return (
    <section id="services" className="bg-navy py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center">
          <span className="mb-3 block text-xs font-semibold tracking-[0.2em] text-gold">
            TESTIMONIALS
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/60">
            Don't just take our word for it. Hear from our satisfied clients who
            found their dream homes with BomaFlow.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-lg bg-white p-6 shadow-lg"
            >
              <QuoteIcon className="mb-2 text-gold" />
              <p className="mb-6 text-sm leading-relaxed text-gray-text">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-bold text-navy">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-text">{testimonial.city}</div>
                  <div className="mt-1 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="h-3.5 w-3.5 text-gold" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-gold" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        </div>
      </div>
    </section>
  )
}
