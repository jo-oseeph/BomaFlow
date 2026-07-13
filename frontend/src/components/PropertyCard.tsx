import type { ListingCard } from '../types/listing'
import { AreaIcon, BathIcon, BedIcon } from './icons'

export default function PropertyCard({ listing }: { listing: ListingCard }) {
  return (
    <article className="group overflow-hidden rounded-lg bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <div className="relative overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded bg-navy px-3 py-1 text-xs font-semibold text-white">
          {listing.priceLabel}
          <span className="font-normal text-white/70"> /mo</span>
        </span>
        <span className="absolute right-3 top-3 rounded bg-gold/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy">
          {listing.type}
        </span>
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-sm font-bold text-navy dark:text-foreground">{listing.title}</h3>
        <p className="mb-1 text-xs text-gray-text">{listing.location}</p>
        <p className="mb-3 text-[11px] text-gray-text/80">{listing.propertyName}</p>
        <div className="flex items-center gap-4 text-xs text-gray-text">
          <span className="flex items-center gap-1">
            <BedIcon className="text-gold" />
            {listing.beds} Beds
          </span>
          <span className="flex items-center gap-1">
            <BathIcon className="text-gold" />
            {listing.baths} Baths
          </span>
          <span className="flex items-center gap-1">
            <AreaIcon className="text-gold" />
            {listing.area}
          </span>
        </div>
      </div>
    </article>
  )
}
