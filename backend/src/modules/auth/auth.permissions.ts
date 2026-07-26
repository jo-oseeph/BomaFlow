/**
 * BomaFlow
 * Module: Authentication
 * File: auth.permissions.ts
 *
 * Purpose:
 * Defines every permission used by the system.
 */

export const PERMISSIONS = {
  PROFILE_READ: 'profile:read',
  PROFILE_UPDATE: 'profile:update',

  LISTING_READ: 'listing:read',
  LISTING_SAVE: 'listing:save',
  LISTING_CREATE: 'listing:create',
  LISTING_UPDATE: 'listing:update',
  LISTING_DELETE: 'listing:delete',
  LISTING_PUBLISH: 'listing:publish',

  APPLICATION_CREATE: 'application:create',
  APPLICATION_READ: 'application:read',
  APPLICATION_UPDATE: 'application:update',
  APPLICATION_DELETE: 'application:delete',

  PROPERTY_CREATE: 'property:create',
  PROPERTY_READ: 'property:read',
  PROPERTY_UPDATE: 'property:update',
  PROPERTY_DELETE: 'property:delete',

  UNIT_CREATE: 'unit:create',
  UNIT_READ: 'unit:read',
  UNIT_UPDATE: 'unit:update',
  UNIT_DELETE: 'unit:delete',

  LEASE_CREATE: 'lease:create',
  LEASE_READ: 'lease:read',
  LEASE_UPDATE: 'lease:update',

  PAYMENT_CREATE: 'payment:create',
  PAYMENT_READ: 'payment:read',

  RECEIPT_READ: 'receipt:read',

  MAINTENANCE_CREATE: 'maintenance:create',
  MAINTENANCE_READ: 'maintenance:read',
  MAINTENANCE_UPDATE: 'maintenance:update',
  MAINTENANCE_ASSIGN: 'maintenance:assign',

  REPAIR_CREATE: 'repair:create',
  REPAIR_UPDATE: 'repair:update',
  REPAIR_CLOSE: 'repair:close',

  ANALYTICS_READ: 'analytics:read',

  ADMIN_ALL: '*',
} as const

export type Permission =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS]