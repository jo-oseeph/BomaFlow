/**
 * BomaFlow
 * Module: Units
 * File: units.controller.ts
 *
 * Purpose:
 * Handles HTTP requests and responses related to units.
 */

import type { RequestHandler } from 'express'

import {
  createUnitService,
  getUnitsByPropertyService,
  getUnitByIdService,
  updateUnitService,
  deleteUnitService,
} from './units.service.js'


export const createUnitController: RequestHandler =
async (
  req,
  res,
  next,
) => {
  try {
    const unit =
      await createUnitService(
        req.body,
      )

    res.status(201).json({
      success: true,
      data: unit,
    })

  } catch (error) {
    next(error)
  }
}



export const getUnitsByPropertyController: RequestHandler =
async (
  req,
  res,
  next,
) => {
  try {
    const propertyId =
      req.params.propertyId

    if (
      !propertyId ||
      Array.isArray(propertyId)
    ) {
      res.status(400).json({
        success: false,
        message: 'Invalid property id',
      })

      return
    }


    const units =
      await getUnitsByPropertyService(
        propertyId,
      )

    res.status(200).json({
      success: true,
      data: units,
    })

  } catch (error) {
    next(error)
  }
}



export const getUnitController: RequestHandler =
async (
  req,
  res,
  next,
) => {
  try {
    const unitId =
      req.params.id

    if (
      !unitId ||
      Array.isArray(unitId)
    ) {
      res.status(400).json({
        success: false,
        message: 'Invalid unit id',
      })

      return
    }


    const unit =
      await getUnitByIdService(
        unitId,
      )

    res.status(200).json({
      success: true,
      data: unit,
    })

  } catch (error) {
    next(error)
  }
}



export const updateUnitController: RequestHandler =
async (
  req,
  res,
  next,
) => {
  try {
    const unitId =
      req.params.id

    if (
      !unitId ||
      Array.isArray(unitId)
    ) {
      res.status(400).json({
        success: false,
        message: 'Invalid unit id',
      })

      return
    }


    const unit =
      await updateUnitService(
        unitId,
        req.body,
      )

    res.status(200).json({
      success: true,
      data: unit,
    })

  } catch (error) {
    next(error)
  }
}



export const deleteUnitController: RequestHandler =
async (
  req,
  res,
  next,
) => {
  try {
    const unitId =
      req.params.id

    if (
      !unitId ||
      Array.isArray(unitId)
    ) {
      res.status(400).json({
        success: false,
        message: 'Invalid unit id',
      })

      return
    }


    await deleteUnitService(
      unitId,
    )

    res.status(200).json({
      success: true,
      message: 'Unit deleted successfully',
    })

  } catch (error) {
    next(error)
  }
}