/**
 * BomaFlow
 * Module: Properties
 * File: properties.constants.ts
 */

export const PROPERTY_STATUSES = [
  'draft',
  'active',
  'inactive',
  'archived',
] as const


export const PROPERTY_MESSAGES = {
  CREATE_SUCCESS: 'Property created successfully',
  UPDATE_SUCCESS: 'Property updated successfully',
  DELETE_SUCCESS: 'Property deleted successfully',

  PROPERTY_NOT_FOUND: 'Property not found',
  CREATE_FAILED: 'Property creation failed',
  UPDATE_FAILED: 'Property update failed',
  DELETE_FAILED: 'Property deletion failed',
} as const