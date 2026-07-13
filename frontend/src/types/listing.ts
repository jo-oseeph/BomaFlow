export interface ListingCard {
  id: string
  title: string
  description: string | null
  location: string
  county: string
  town: string
  type: string
  price: number
  priceLabel: string
  deposit: number
  depositLabel: string
  beds: number
  baths: number
  area: string
  image: string
  rankScore: number
  propertyId: string
  unitId: string
  propertyName: string
}

export interface SearchFilters {
  type: string
  location: string
  minPrice: string
  maxPrice: string
}

export interface SearchOptions {
  types: string[]
  locations: string[]
}

export const PROPERTY_TYPES = ['All Types', 'House', 'Apartment', 'Villa', 'Townhouse', 'Studio'] as const

export const MIN_PRICES = [
  { label: 'Any', value: '' },
  { label: 'KES 5,000', value: '5000' },
  { label: 'KES 10,000', value: '10000' },
  { label: 'KES 20,000', value: '20000' },
  { label: 'KES 50,000', value: '50000' },
] as const

export const MAX_PRICES = [
  { label: 'Any', value: '' },
  { label: 'KES 25,000', value: '25000' },
  { label: 'KES 50,000', value: '50000' },
  { label: 'KES 100,000', value: '100000' },
  { label: 'KES 200,000', value: '200000' },
] as const

export function formatKES(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`
}

export function filterListings(
  listings: ListingCard[],
  filters: SearchFilters,
): ListingCard[] {
  return listings.filter((listing) => {
    if (filters.type && filters.type !== 'All Types') {
      if (listing.type.toLowerCase() !== filters.type.toLowerCase()) return false
    }
    if (filters.location && filters.location !== 'All Locations') {
      const needle = filters.location.toLowerCase()
      const locationMatch =
        listing.county.toLowerCase() === needle ||
        listing.town.toLowerCase() === needle ||
        listing.location.toLowerCase().includes(needle)
      if (!locationMatch) return false
    }
    if (filters.minPrice && listing.price < Number(filters.minPrice)) {
      return false
    }
    if (filters.maxPrice && listing.price > Number(filters.maxPrice)) {
      return false
    }
    return true
  })
}

export function filtersFromParams(params: URLSearchParams): SearchFilters {
  return {
    type: params.get('type') ?? '',
    location: params.get('location') ?? '',
    minPrice: params.get('minPrice') ?? '',
    maxPrice: params.get('maxPrice') ?? '',
  }
}

export function filtersToParams(filters: SearchFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.type && filters.type !== 'All Types') params.set('type', filters.type)
  if (filters.location && filters.location !== 'All Locations') {
    params.set('location', filters.location)
  }
  if (filters.minPrice) params.set('minPrice', filters.minPrice)
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
  return params
}

export function hasActiveFilters(filters: SearchFilters): boolean {
  return Boolean(
    (filters.type && filters.type !== 'All Types') ||
      (filters.location && filters.location !== 'All Locations') ||
      filters.minPrice ||
      filters.maxPrice,
  )
}
