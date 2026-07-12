import { useQuery } from '@tanstack/react-query'
import {
  fetchAllListings,
  fetchFeaturedListings,
  fetchListingById,
  fetchSearchOptions,
} from '../lib/listings'

export const listingKeys = {
  all: ['listings'] as const,
  featured: ['listings', 'featured'] as const,
  detail: (id: string) => ['listings', id] as const,
  searchOptions: ['listings', 'search-options'] as const,
}

export function useFeaturedListings() {
  return useQuery({
    queryKey: listingKeys.featured,
    queryFn: fetchFeaturedListings,
  })
}

export function useListings() {
  return useQuery({
    queryKey: listingKeys.all,
    queryFn: fetchAllListings,
  })
}

export function useListing(id: string) {
  return useQuery({
    queryKey: listingKeys.detail(id),
    queryFn: () => fetchListingById(id),
    enabled: Boolean(id),
  })
}

export function useSearchOptions() {
  return useQuery({
    queryKey: listingKeys.searchOptions,
    queryFn: fetchSearchOptions,
    staleTime: 5 * 60_000,
  })
}
