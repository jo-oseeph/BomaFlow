/**
 * BomaFlow
 * Module: Properties
 * File: properties.schema.ts
 */

import { z } from 'zod'

import {
  PROPERTY_STATUSES,
} from './properties.constants.js'


export const createPropertySchema = z.object({

  name: z
    .string()
    .min(
      2,
      'Property name must be at least 2 characters',
    ),

  type: z
    .string()
    .optional(),

  description: z
    .string()
    .optional(),

  county: z
    .string()
    .optional(),

  constituency: z
    .string()
    .optional(),

  ward: z
    .string()
    .optional(),

  town: z
    .string()
    .optional(),

  estate: z
    .string()
    .optional(),

  address: z
    .string()
    .optional(),

  lat: z
    .number()
    .min(-90)
    .max(90)
    .optional(),

  lng: z
    .number()
    .min(-180)
    .max(180)
    .optional(),

  yearBuilt: z
    .number()
    .int()
    .positive()
    .optional(),

  totalUnits: z
    .number()
    .int()
    .nonnegative()
    .optional(),

})


export const updatePropertySchema =
  createPropertySchema
    .partial()
    .extend({

      status: z
        .enum(PROPERTY_STATUSES)
        .optional(),

    })


export type CreatePropertySchemaInput =
  z.infer<typeof createPropertySchema>


export type UpdatePropertySchemaInput =
  z.infer<typeof updatePropertySchema>