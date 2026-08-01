import { useQuery } from '@tanstack/react-query'

import {
  getProperties,
  getProperty,
} from '../services/properties.service'

export const propertyKeys = {
  all: ['properties'] as const,

  detail: (id: string) =>
    ['properties', id] as const,
}

export function useProperties() {
  return useQuery({
    queryKey: propertyKeys.all,
    queryFn: getProperties,
  })
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: propertyKeys.detail(id),
    queryFn: () => getProperty(id),
    enabled: Boolean(id),
  })
}