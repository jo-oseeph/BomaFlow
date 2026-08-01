/**
 * BomaFlow
 * Module: Units
 * File: units.validation.ts
 */

import type { RequestHandler } from 'express'

import {
  createUnitSchema,
  updateUnitSchema,
} from './units.schema.js'


export const validateCreateUnit: RequestHandler =
  (req, res, next) => {
    const result =
      createUnitSchema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid unit data',
        errors: result.error.flatten(),
      })

      return
    }

    req.body = result.data

    next()
  }


export const validateUpdateUnit: RequestHandler =
  (req, res, next) => {
    const result =
      updateUnitSchema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid unit update data',
        errors: result.error.flatten(),
      })

      return
    }

    req.body = result.data

    next()
  }