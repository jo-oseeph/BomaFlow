import { Link } from 'react-router-dom'
import PropertyCard from './PropertyCard'
import ListingGridSkeleton, { ListingStateMessage } from './ListingStates'
import { useFeaturedListings } from '../hooks/useListings'

export default function FeaturedProperties() {
  const { data: listings, isLoading, isError, error } = useFeaturedListings()

  return (
    <section className="bg-page py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-3 block text-xs font-semibold tracking-[0.2em] text-gold">
            FEATURED PROPERTIES
          </span>
          <h2 className="mb-4 text-3xl font-bold text-navy md:text-4xl">
            Explore Our Featured Properties
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-text">
            Browse verified rental listings from our database. Each property is
            linked to a real unit with live pricing and availability.
          </p>
        </div>

        {isLoading && <ListingGridSkeleton count={4} />}

        {isError && (
          <ListingStateMessage
            title="Unable to load listings"
            message={
              error instanceof Error
                ? error.message
                : 'Something went wrong while fetching properties from the database.'
            }
          />
        )}

        {!isLoading && !isError && listings?.length === 0 && (
          <ListingStateMessage
            title="No listings available yet"
            message="The database has no published listings. For public visitors to see a listing, you need: a property with status 'verified', a linked unit, and a listing with status 'published'."
            action={
              <Link
                to="/properties"
                className="inline-block rounded bg-navy px-6 py-3 text-xs font-bold tracking-wide text-white"
              >
                BROWSE ALL PROPERTIES
              </Link>
            }
          />
        )}

        {!isLoading && !isError && listings && listings.length > 0 && (
          <>
            <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {listings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/properties"
                className="inline-block rounded bg-navy px-8 py-3.5 text-xs font-bold tracking-wide text-white transition-colors hover:bg-navy-light"
              >
                VIEW ALL PROPERTIES
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
