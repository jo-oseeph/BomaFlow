/**
 * BomaFlow
 * Module: Properties
 * File: properties.types.ts
 */

import type { PROPERTY_STATUSES } from './properties.constants.js'

export type PropertyStatus =
  (typeof PROPERTY_STATUSES)[number]

export interface CreatePropertyInput {
  name: string

  type?: string

  description?: string

  county?: string

  constituency?: string

  ward?: string

  town?: string

  estate?: string

  address?: string

  lat?: number

  lng?: number

  yearBuilt?: number

  totalUnits?: number
}

export interface UpdatePropertyInput {
  name?: string

  type?: string

  description?: string

  county?: string

  constituency?: string

  ward?: string

  town?: string

  estate?: string

  address?: string

  lat?: number

  lng?: number

  yearBuilt?: number

  totalUnits?: number

  status?: PropertyStatus
}

export interface PropertySearchFilters {
  landlordId: string

  search?: string | undefined

  status?: PropertyStatus | undefined

  county?: string | undefined

  town?: string | undefined

  type?: string | undefined

  page?: number | undefined

  limit?: number | undefined
}

export interface PropertyResponse {
  id: string

  name: string

  type?: string

  description?: string

  county?: string

  town?: string

  address?: string

  totalUnits: number

  occupiedUnits: number

  vacantUnits: number

  status: PropertyStatus

  createdAt: Date

  updatedAt: Date
}