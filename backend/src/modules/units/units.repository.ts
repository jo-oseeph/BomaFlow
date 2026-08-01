/**
 * BomaFlow
 * Module: Units
 * File: units.repository.ts
 *
 * Purpose:
 * Handles all database operations related to units.
 */

import {
  Prisma,
} from '@prisma/client'

import { prisma } from '../../config/prisma.js'

import type {
  CreateUnitInput,
  UpdateUnitInput,
} from './units.types.js'


export const createUnit = async (
  data: CreateUnitInput,
) => {
  return prisma.units.create({
    data: {
      property_id:
        data.propertyId,

      building_name:
        data.buildingName ?? null,

      floor:
        data.floor ?? null,

      unit_number:
        data.unitNumber,

      bedrooms:
        data.bedrooms ?? null,

      bathrooms:
        data.bathrooms ?? null,

      size_sqm:
        data.sizeSqm ?? null,

      rent_amount:
        data.rentAmount,

      deposit:
        data.deposit ?? 0,

      service_charge:
        data.serviceCharge ?? 0,

      status:
        data.status ?? 'vacant',

      available_from:
        data.availableFrom ?? null,

      ...(data.features !== undefined && {
        features:
          data.features as Prisma.InputJsonValue,
      }),
    },
  })
}



export const findUnitsByProperty = async (
  propertyId: string,
) => {
  return prisma.units.findMany({
    where: {
      property_id: propertyId,
    },

    orderBy: {
      created_at: 'desc',
    },
  })
}



export const findUnitById = async (
  id: string,
) => {
  return prisma.units.findUnique({
    where: {
      id,
    },
  })
}



export const updateUnit = async (
  id: string,
  data: UpdateUnitInput,
) => {
  return prisma.units.update({
    where: {
      id,
    },

    data: {
      ...(data.buildingName !== undefined && {
        building_name:
          data.buildingName,
      }),

      ...(data.floor !== undefined && {
        floor:
          data.floor,
      }),

      ...(data.unitNumber !== undefined && {
        unit_number:
          data.unitNumber,
      }),

      ...(data.bedrooms !== undefined && {
        bedrooms:
          data.bedrooms,
      }),

      ...(data.bathrooms !== undefined && {
        bathrooms:
          data.bathrooms,
      }),

      ...(data.sizeSqm !== undefined && {
        size_sqm:
          data.sizeSqm,
      }),

      ...(data.rentAmount !== undefined && {
        rent_amount:
          data.rentAmount,
      }),

      ...(data.deposit !== undefined && {
        deposit:
          data.deposit,
      }),

      ...(data.serviceCharge !== undefined && {
        service_charge:
          data.serviceCharge,
      }),

      ...(data.status !== undefined && {
        status:
          data.status,
      }),

      ...(data.availableFrom !== undefined && {
        available_from:
          data.availableFrom,
      }),

      ...(data.features !== undefined && {
        features:
          data.features as Prisma.InputJsonValue,
      }),
    },
  })
}



export const deleteUnit = async (
  id: string,
) => {
  return prisma.units.delete({
    where: {
      id,
    },
  })
}