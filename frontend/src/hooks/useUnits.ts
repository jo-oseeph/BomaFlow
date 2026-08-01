/**
 * BomaFlow
 * Hook: useUnits.ts
 *
 * Purpose:
 * React Query hooks for fetching units.
 */

import { useQuery } from '@tanstack/react-query'

import {
  getUnitsByProperty,
  getUnit,
} from '../services/units.service'


export const unitKeys = {

  all: ['units'] as const,


  byProperty: (
    propertyId: string,
  ) =>
    [
      'units',
      'property',
      propertyId,
    ] as const,


  detail: (
    id: string,
  ) =>
    [
      'units',
      id,
    ] as const,

}



export function useUnitsByProperty(
  propertyId: string,
) {

  return useQuery({

    queryKey:
      unitKeys.byProperty(
        propertyId,
      ),


    queryFn: () =>
      getUnitsByProperty(
        propertyId,
      ),


    enabled:
      Boolean(propertyId),

  })

}



export function useUnit(
  id: string,
) {

  return useQuery({

    queryKey:
      unitKeys.detail(
        id,
      ),


    queryFn: () =>
      getUnit(
        id,
      ),


    enabled:
      Boolean(id),

  })

}