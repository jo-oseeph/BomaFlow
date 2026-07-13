import AboutUs from '../components/AboutUs'

export default function AboutPage() {
  return (
    <div className="bg-gray-light">
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <span className="mb-3 block text-xs font-semibold tracking-[0.2em] text-gold">
            ABOUT US
          </span>
          <h1 className="text-4xl font-bold">About BomaFlow</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70">
            Kenya&apos;s trusted platform for finding verified rental properties,
            backed by real database records for every listing.
          </p>
        </div>
      </section>
      <AboutUs />
    </div>
  )
}
