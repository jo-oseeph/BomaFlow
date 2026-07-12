import { CheckIcon } from './icons'
import PropertySearch from './PropertySearch'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-page">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row">
          <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-24 pt-16 lg:px-8 lg:pb-28 lg:pt-20">
            <span className="mb-4 text-xs font-semibold tracking-[0.2em] text-gold">
              WELCOME TO BOMAFLOW
            </span>
            <h1 className="mb-5 max-w-lg text-4xl font-bold leading-[1.15] text-navy dark:text-foreground md:text-5xl lg:text-[3.25rem]">
              Find Your <span className="text-gold">Perfect</span> Home
            </h1>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-gray-text">
              Discover verified rental listings across Kenya. Search by location,
              property type, and budget to find your next home.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">
                <CheckIcon className="h-4 w-4" />
              </div>
              <span className="text-xs text-gray-text">
                Trusted by <strong className="text-navy dark:text-foreground">1,200+</strong> Happy Clients
              </span>
            </div>
          </div>

          <div className="relative flex-1 lg:min-h-[480px]">
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-page via-page/70 to-transparent lg:via-page/30" />
            <img
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&h=700&fit=crop"
              alt="Luxury modern villa at dusk"
              className="h-full min-h-[320px] w-full object-cover lg:min-h-[480px]"
            />
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20 lg:bottom-8 lg:left-8 lg:right-8">
          <PropertySearch variant="hero" />
        </div>
      </div>
    </section>
  )
}
