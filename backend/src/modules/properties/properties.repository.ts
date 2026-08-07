/**
 * BomaFlow
 * Module: Properties
 * File: properties.repository.ts
 *
 * Purpose:
 * Handles all database operations related to properties.
 */

import { Prisma } from '@prisma/client'

import { prisma } from '../../config/prisma.js'

import type {
  CreatePropertyInput,
  PropertySearchFilters,
  UpdatePropertyInput,
} from './properties.types.js'

export const createProperty = async (
  data: CreatePropertyInput & {
    landlordId: string
    orgId?: string | null
  },
) => {
  return prisma.properties.create({
    data: {
      landlord_id: data.landlordId,

      org_id: data.orgId ?? null,

      name: data.name,

      type: data.type ?? null,

      description: data.description ?? null,

      county: data.county ?? null,

      constituency: data.constituency ?? null,

      ward: data.ward ?? null,

      town: data.town ?? null,

      estate: data.estate ?? null,

      address: data.address ?? null,

      lat: data.lat ?? null,

      lng: data.lng ?? null,

      year_built: data.yearBuilt ?? null,

      total_units: data.totalUnits ?? 0,
    },
  })
}

export const findPropertiesByLandlord = async (
  filters: PropertySearchFilters,
) => {
  const {
    landlordId,
    search,
    status,
    county,
    town,
    type,
    page = 1,
    limit = 10,
  } = filters

  const where: Prisma.propertiesWhereInput = {
    landlord_id: landlordId,
  }

  if (search) {
    where.name = {
      contains: search,
      mode: 'insensitive',
    }
  }

  if (status) {
    where.status = status
  }

  if (county) {
    where.county = county
  }

  if (town) {
    where.town = town
  }

  if (type) {
    where.type = type
  }

  return prisma.properties.findMany({
    where,

    orderBy: {
      created_at: 'desc',
    },

    skip: (page - 1) * limit,

    take: limit,
  })
}

export const findPropertyById = async (
  id: string,
) => {
  return prisma.properties.findUnique({
    where: {
      id,
    },
  })
}

export const findPropertyByIdForLandlord = async (
  id: string,
  landlordId: string,
) => {
  return prisma.properties.findFirst({
    where: {
      id,
      landlord_id: landlordId,
    },
  })
}

export const updateProperty = async (
  id: string,
  data: UpdatePropertyInput,
) => {
  return prisma.properties.update({
    where: {
      id,
    },

    data: {
      ...(data.name !== undefined && {
        name: data.name,
      }),

      ...(data.type !== undefined && {
        type: data.type,
      }),

      ...(data.description !== undefined && {
        description: data.description,
      }),

      ...(data.county !== undefined && {
        county: data.county,
      }),

      ...(data.constituency !== undefined && {
        constituency: data.constituency,
      }),

      ...(data.ward !== undefined && {
        ward: data.ward,
      }),

      ...(data.town !== undefined && {
        town: data.town,
      }),

      ...(data.estate !== undefined && {
        estate: data.estate,
      }),

      ...(data.address !== undefined && {
        address: data.address,
      }),

      ...(data.lat !== undefined && {
        lat: data.lat,
      }),

      ...(data.lng !== undefined && {
        lng: data.lng,
      }),

      ...(data.yearBuilt !== undefined && {
        year_built: data.yearBuilt,
      }),

      ...(data.totalUnits !== undefined && {
        total_units: data.totalUnits,
      }),

      ...(data.status !== undefined && {
        status: data.status,
      }),
    },
  })
}

export const deleteProperty = async (
  id: string,
) => {
  return prisma.properties.delete({
    where: {
      id,
    },
  })
}