import { EmailIcon, LocationIcon, PhoneIcon } from './icons'

export default function ContactFooter() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left - Contact info (navy) */}
        <div className="flex flex-1 flex-col justify-center bg-navy px-8 py-16 lg:px-12 lg:py-20">
          <span className="mb-3 text-xs font-semibold tracking-[0.2em] text-gold">
            GET IN TOUCH
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            We're Here to Help You
          </h2>
          <p className="mb-10 max-w-sm text-sm leading-relaxed text-white/60">
            Have questions about a property or need assistance? Reach out to our
            team and we'll get back to you promptly.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                <PhoneIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-white/60">Phone</div>
                <div className="text-sm font-semibold text-white">
                  +254 712 345678
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                <EmailIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-white/60">Email</div>
                <div className="text-sm font-semibold text-white">
                  info@bomaflow.com
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                <LocationIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-white/60">Address</div>
                <div className="text-sm font-semibold text-white">
                  123 Main Boulevard, Lavington, Nairobi, Kenya
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle - Contact form (white) */}
        <div className="flex flex-1 items-center bg-white px-8 py-16 lg:px-12 lg:py-20">
          <form
            className="w-full space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded border border-gray-200 px-4 py-3.5 text-sm text-navy outline-none transition-colors placeholder:text-gray-text/60 focus:border-gold"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded border border-gray-200 px-4 py-3.5 text-sm text-navy outline-none transition-colors placeholder:text-gray-text/60 focus:border-gold"
            />
            <input
              type="tel"
              placeholder="Your Phone"
              className="w-full rounded border border-gray-200 px-4 py-3.5 text-sm text-navy outline-none transition-colors placeholder:text-gray-text/60 focus:border-gold"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full resize-none rounded border border-gray-200 px-4 py-3.5 text-sm text-navy outline-none transition-colors placeholder:text-gray-text/60 focus:border-gold"
            />
            <button
              type="submit"
              className="w-full rounded bg-navy py-3.5 text-xs font-bold tracking-wide text-white transition-colors hover:bg-navy-light"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Right - Building image */}
        <div className="hidden flex-1 lg:block">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=700&fit=crop"
            alt="Modern building exterior with palm trees"
            className="h-full min-h-[400px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
