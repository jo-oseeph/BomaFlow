/**
 * BomaFlow
 * Module: Properties
 * File: properties.validation.ts
 */

import type { RequestHandler } from 'express'

import {
  createPropertySchema,
  updatePropertySchema,
} from './properties.schema.js'


export const validateCreateProperty:
  RequestHandler =
  (req, res, next) => {

    const result =
      createPropertySchema.safeParse(req.body)


    if (!result.success) {

      return res.status(400).json({

        success: false,

        message: 'Invalid property data',

        errors: result.error.flatten(),

      })

    }


    req.body = result.data

    next()

  }



export const validateUpdateProperty:
  RequestHandler =
  (req, res, next) => {

    const result =
      updatePropertySchema.safeParse(req.body)


    if (!result.success) {

      return res.status(400).json({

        success: false,

        message: 'Invalid property update data',

        errors: result.error.flatten(),

      })

    }


    req.body = result.data

    next()

  }