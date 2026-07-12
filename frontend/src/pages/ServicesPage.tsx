import Testimonials from '../components/Testimonials'

const services = [
  {
    title: 'Property Search',
    description:
      'Browse live listings from our database with filters for type, location, and monthly rent.',
  },
  {
    title: 'Tenant Applications',
    description:
      'Apply directly to listings with employment and reference details stored securely.',
  },
  {
    title: 'Viewing Requests',
    description:
      'Schedule property viewings online and track confirmation status in real time.',
  },
  {
    title: 'Lease Management',
    description:
      'Digital leases, invoicing, and M-Pesa payments — all tied to your rental records.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <span className="mb-3 block text-xs font-semibold tracking-[0.2em] text-gold">
            SERVICES
          </span>
          <h1 className="text-4xl font-bold">What We Offer</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70">
            End-to-end rental management powered by your database — from discovery
            to lease signing and payments.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:px-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-lg border border-gray-200 p-8 transition-shadow hover:shadow-lg"
            >
              <h3 className="mb-3 text-lg font-bold text-navy">{service.title}</h3>
              <p className="text-sm leading-relaxed text-gray-text">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />
    </>
  )
}
