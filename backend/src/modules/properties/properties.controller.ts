/**
 * BomaFlow
 * Module: Properties
 * File: properties.controller.ts
 *
 * Purpose:
 * Handles HTTP requests and responses related to properties.
 */

import type { RequestHandler } from 'express'

import {
  createPropertyService,
  getPropertiesByLandlordService,
  getPropertyByIdService,
  updatePropertyService,
  deletePropertyService,
  archivePropertyService,
  restorePropertyService,
} from './properties.service.js'

import type { PropertyStatus } from './properties.types.js'

export const createPropertyController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const property =
      await createPropertyService({
        ...req.body,
        landlordId: req.user!.id,
      })

    res.status(201).json({
      success: true,
      data: property,
    })
  } catch (error) {
    next(error)
  }
}

export const getPropertiesController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const {
      search,
      status,
      county,
      town,
      type,
      page,
      limit,
    } = req.query

    const properties =
      await getPropertiesByLandlordService({
        landlordId: req.user!.id,

        search:
          typeof search === 'string'
            ? search
            : undefined,

        status:
          typeof status === 'string'
            ? (status as PropertyStatus)
            : undefined,

        county:
          typeof county === 'string'
            ? county
            : undefined,

        town:
          typeof town === 'string'
            ? town
            : undefined,

        type:
          typeof type === 'string'
            ? type
            : undefined,

        page:
          typeof page === 'string'
            ? Number(page)
            : undefined,

        limit:
          typeof limit === 'string'
            ? Number(limit)
            : undefined,
      })

    res.status(200).json({
      success: true,
      data: properties,
    })
  } catch (error) {
    next(error)
  }
}

export const getPropertyController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const propertyId = req.params.id

    if (!propertyId || Array.isArray(propertyId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid property id',
      })
      return
    }

    const property =
      await getPropertyByIdService(
        propertyId,
        req.user!.id,
      )

    res.status(200).json({
      success: true,
      data: property,
    })
  } catch (error) {
    next(error)
  }
}

export const updatePropertyController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const propertyId = req.params.id

    if (!propertyId || Array.isArray(propertyId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid property id',
      })
      return
    }

    const property =
      await updatePropertyService(
        propertyId,
        req.user!.id,
        req.body,
      )

    res.status(200).json({
      success: true,
      data: property,
    })
  } catch (error) {
    next(error)
  }
}

export const archivePropertyController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const propertyId = req.params.id

    if (!propertyId || Array.isArray(propertyId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid property id',
      })
      return
    }

    const property =
      await archivePropertyService(
        propertyId,
        req.user!.id,
      )

    res.status(200).json({
      success: true,
      data: property,
    })
  } catch (error) {
    next(error)
  }
}

export const restorePropertyController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const propertyId = req.params.id

    if (!propertyId || Array.isArray(propertyId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid property id',
      })
      return
    }

    const property =
      await restorePropertyService(
        propertyId,
        req.user!.id,
      )

    res.status(200).json({
      success: true,
      data: property,
    })
  } catch (error) {
    next(error)
  }
}

export const deletePropertyController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const propertyId = req.params.id

    if (!propertyId || Array.isArray(propertyId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid property id',
      })
      return
    }

    await deletePropertyService(
      propertyId,
      req.user!.id,
    )

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}