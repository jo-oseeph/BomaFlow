/**
 * BomaFlow
 * Module: Units
 * File: units.service.ts
 *
 * Purpose:
 * Contains business logic related to units.
 */

import {
  createUnit,
  findUnitsByProperty,
  findUnitById,
  updateUnit,
  deleteUnit,
} from './units.repository.js'

import {
  UnitCreationError,
  UnitDeleteError,
  UnitNotFoundError,
  UnitUpdateError,
} from './units.errors.js'

import type {
  CreateUnitInput,
  UpdateUnitInput,
} from './units.types.js'


export const createUnitService = async (
  data: CreateUnitInput,
) => {
  try {
    return await createUnit(data)

  } catch (error) {
    throw new UnitCreationError(
      error instanceof Error
        ? error.message
        : undefined,
    )
  }
}


export const getUnitsByPropertyService = async (
  propertyId: string,
) => {
  return findUnitsByProperty(propertyId)
}


export const getUnitByIdService = async (
  id: string,
) => {
  const unit =
    await findUnitById(id)

  if (!unit) {
    throw new UnitNotFoundError()
  }

  return unit
}


export const updateUnitService = async (
  id: string,
  data: UpdateUnitInput,
) => {
  const existingUnit =
    await findUnitById(id)

  if (!existingUnit) {
    throw new UnitNotFoundError()
  }

  try {
    return await updateUnit(
      id,
      data,
    )

  } catch (error) {
    throw new UnitUpdateError(
      error instanceof Error
        ? error.message
        : undefined,
    )
  }
}


export const deleteUnitService = async (
  id: string,
) => {
  const existingUnit =
    await findUnitById(id)

  if (!existingUnit) {
    throw new UnitNotFoundError()
  }

  try {
    return await deleteUnit(id)

  } catch (error) {
    throw new UnitDeleteError(
      error instanceof Error
        ? error.message
        : undefined,
    )
  }
}