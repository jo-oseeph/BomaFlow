import { useQuery } from '@tanstack/react-query'

import {
  getProperties,
  getProperty,
  type PropertyFilters,
} from '../services/properties.service'

export const propertyKeys = {
  all: ['properties'] as const,

  list: (filters?: PropertyFilters) =>
    ['properties', filters] as const,

  detail: (id: string) =>
    ['properties', id] as const,
}

export function useProperties(
  filters?: PropertyFilters,
) {
  return useQuery({
    queryKey: propertyKeys.list(filters),
    queryFn: () => getProperties(filters),
  })
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: propertyKeys.detail(id),
    queryFn: () => getProperty(id),
    enabled: Boolean(id),
  })
}