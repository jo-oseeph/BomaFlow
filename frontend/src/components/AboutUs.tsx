import { FeatureIcon, HouseIcon } from './icons'

const features = [
  {
    icon: 'properties',
    title: 'Wide Range of Properties',
    description:
      'From cozy apartments to luxury villas, we offer diverse options to suit your need.',
  },
  {
    icon: 'agents',
    title: 'Expert Real Estate Agents',
    description:
      'Our experienced agents guide you through every step of your property journey.',
  },
  {
    icon: 'trusted',
    title: 'Trusted by Clients',
    description:
      'Over 1,200 satisfied clients trust us for their real estate needs across Kenya.',
  },
  {
    icon: 'transparent',
    title: 'Transparent Process',
    description:
      'No hidden fees or surprises. We believe in complete transparency in every deal.',
  },
]

export default function AboutUs() {
  return (
    <section id="about" className="bg-surface-alt py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Left content */}
          <div className="flex-1">
            <span className="mb-3 block text-xs font-semibold tracking-[0.2em] text-gold">
              ABOUT US
            </span>
            <h2 className="mb-4 text-3xl font-bold text-navy dark:text-foreground md:text-4xl">
              Why Choose BomaFlow?
            </h2>
            <p className="mb-10 max-w-lg text-sm leading-relaxed text-gray-text">
              With over 25 years of experience in the real estate industry, we
              have helped thousands of families find their perfect homes. Our
              commitment to excellence sets us apart.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold text-gold">
                    <FeatureIcon type={feature.icon} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-bold text-navy">
                      {feature.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-gray-text">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image with badge */}
          <div className="relative flex-1">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=500&fit=crop"
              alt="Modern luxury living room interior"
              className="w-full rounded-lg object-cover shadow-lg"
            />
            <div className="absolute -left-4 bottom-8 flex items-center gap-3 rounded bg-navy px-6 py-5 shadow-xl md:-left-8">
              <div className="text-gold">
                <HouseIcon className="h-8 w-8" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gold">25+</div>
                <div className="text-xs font-medium text-white">
                  Years of Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
