/**
 * BomaFlow
 * Module: Properties
 * File: properties.service.ts
 *
 * Purpose:
 * Contains business logic related to properties.
 */

import { prisma } from '../../config/prisma.js'

import {
  createProperty,
  findPropertiesByLandlord,
  findPropertyById,
  updateProperty,
  deleteProperty,
} from './properties.repository.js'

import {
  PropertyCreationError,
  PropertyDeleteError,
  PropertyNotFoundError,
  PropertyUpdateError,
} from './properties.errors.js'

import type {
  CreatePropertyInput,
  UpdatePropertyInput,
} from './properties.types.js'

export const createPropertyService = async (
  data: CreatePropertyInput & {
    landlordId: string
    orgId?: string | null
  },
) => {
  try {
    return await createProperty(data)
  } catch (error) {
    throw new PropertyCreationError(
      error instanceof Error
        ? error.message
        : undefined,
    )
  }
}

export const getPropertiesByLandlordService = async (
  landlordId: string,
) => {
  return findPropertiesByLandlord(landlordId)
}

export const getPropertyByIdService = async (
  id: string,
) => {
  const property = await findPropertyById(id)

  if (!property) {
    throw new PropertyNotFoundError()
  }

  return property
}

export const updatePropertyService = async (
  id: string,
  data: UpdatePropertyInput,
) => {
  const existingProperty =
    await findPropertyById(id)

  if (!existingProperty) {
    throw new PropertyNotFoundError()
  }

  try {
    return await updateProperty(
      id,
      data,
    )
  } catch (error) {
    throw new PropertyUpdateError(
      error instanceof Error
        ? error.message
        : undefined,
    )
  }
}

export const deletePropertyService = async (
  id: string,
) => {
  const existingProperty =
    await findPropertyById(id)

  if (!existingProperty) {
    throw new PropertyNotFoundError()
  }

  const unitCount =
    await prisma.units.count({
      where: {
        property_id: id,
      },
    })

  if (unitCount > 0) {
    throw new PropertyDeleteError(
      `This property cannot be deleted because it still contains ${unitCount} unit${unitCount === 1 ? '' : 's'}. Remove the units first or archive the property.`,
    )
  }

  try {
    return await deleteProperty(id)
  } catch (error) {
    throw new PropertyDeleteError(
      error instanceof Error
        ? error.message
        : undefined,
    )
  }
}