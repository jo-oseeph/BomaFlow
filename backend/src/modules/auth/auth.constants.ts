/**
 * BomaFlow
 * Module: Authentication
 * File: auth.constants.ts
 */

export const AUTH_ROLES = [
  'admin',
  'landlord',
  'manager',
  'tenant',
  'technician',
] as const

export const AUTH_MESSAGES = {
  SIGNUP_SUCCESS: 'Account created successfully',
  LOGIN_SUCCESS: 'Login successful',
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'Unauthorized access',
  USER_NOT_FOUND: 'User not found',
} as const