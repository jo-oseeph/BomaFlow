/**
 * BomaFlow
 * Module: Files
 * File: files.validation.ts
 */

import type {
  RequestHandler,
} from 'express'


import {
  createFileSchema,
  updateFileSchema,
} from './files.schema.js'


export const validateCreateFile:
RequestHandler =
(req, res, next) => {

  const result =
    createFileSchema.safeParse(
      req.body,
    )


  if (!result.success) {

    res.status(400).json({
      success: false,
      message: 'Invalid file data',
      errors: result.error.flatten(),
    })

    return
  }


  req.body = result.data

  next()
}



export const validateUpdateFile:
RequestHandler =
(req, res, next) => {

  const result =
    updateFileSchema.safeParse(
      req.body,
    )


  if (!result.success) {

    res.status(400).json({
      success: false,
      message: 'Invalid file update data',
      errors: result.error.flatten(),
    })

    return
  }


  req.body = result.data

  next()
}