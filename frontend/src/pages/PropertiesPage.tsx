import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import PropertySearch from '../components/PropertySearch'
import PropertyCard from '../components/PropertyCard'
import ListingGridSkeleton, { ListingStateMessage } from '../components/ListingStates'
import { useListings } from '../hooks/useListings'
import {
  filterListings,
  filtersFromParams,
  hasActiveFilters,
} from '../types/listing'

export default function PropertiesPage() {
  const [searchParams] = useSearchParams()
  const filters = useMemo(() => filtersFromParams(searchParams), [searchParams])
  const { data: listings, isLoading, isError, error } = useListings()

  const filteredListings = useMemo(
    () => (listings ? filterListings(listings, filters) : []),
    [listings, filters],
  )

  return (
    <div className="bg-gray-light">
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="mb-3 block text-xs font-semibold tracking-[0.2em] text-gold">
            PROPERTIES
          </span>
          <h1 className="mb-4 text-4xl font-bold">Find Your Next Home</h1>
          <p className="max-w-2xl text-sm text-white/70">
            Search live rental listings from our database. Results are pulled from
            published listings linked to units and properties.
          </p>
        </div>
      </section>

      <section className="relative z-10 -mt-8 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <PropertySearch
            key={searchParams.toString()}
            variant="page"
            initialFilters={filters}
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {!isLoading && !isError && (
            <p className="mb-8 text-sm text-gray-text">
              {hasActiveFilters(filters)
                ? `Showing ${filteredListings.length} of ${listings?.length ?? 0} published listings`
                : `${listings?.length ?? 0} published listings available`}
            </p>
          )}

          {isLoading && <ListingGridSkeleton count={8} />}

          {isError && (
            <ListingStateMessage
              title="Unable to load listings"
              message={
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch listings from the database.'
              }
            />
          )}

          {!isLoading && !isError && filteredListings.length === 0 && (
            <ListingStateMessage
              title={hasActiveFilters(filters) ? 'No properties match your search' : 'No listings available yet'}
              message={
                hasActiveFilters(filters)
                  ? 'Try adjusting your filters or clearing them to see all published listings.'
                  : 'The listings table is empty or has no rows visible to the public. Add a verified property, unit, and published listing to get started.'
              }
            />
          )}

          {!isLoading && !isError && filteredListings.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredListings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
