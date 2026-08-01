/**
 * BomaFlow
 * Module: Units
 * File: units.schema.ts
 */

import { z } from 'zod'

import { UNIT_STATUSES } from './units.constants.js'


export const createUnitSchema = z.object({
  propertyId: z.string().uuid(),

  buildingName: z
    .string()
    .optional(),

  floor: z
    .number()
    .int()
    .optional(),

  unitNumber: z
    .string()
    .min(1),

  bedrooms: z
    .number()
    .int()
    .min(0)
    .optional(),

  bathrooms: z
    .number()
    .min(0)
    .optional(),

  sizeSqm: z
    .number()
    .min(0)
    .optional(),

  rentAmount: z
    .number()
    .min(0),

  deposit: z
    .number()
    .min(0)
    .optional(),

  serviceCharge: z
    .number()
    .min(0)
    .optional(),

  status: z
    .enum(UNIT_STATUSES)
    .optional(),

  availableFrom: z
    .coerce
    .date()
    .optional(),

  features: z
    .record(
      z.string(),
      z.unknown(),
    )
    .optional(),
})


export const updateUnitSchema =
  createUnitSchema
    .omit({
      propertyId: true,
    })
    .partial()