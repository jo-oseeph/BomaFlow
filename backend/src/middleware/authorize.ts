/**
 * BomaFlow
 * Middleware
 * File: authorize.ts
 *
 * Purpose:
 * Authorizes authenticated users based on permissions.
 */

import type { RequestHandler } from 'express'

import { ROLE_PERMISSIONS } from '../modules/auth/auth.roles.js'
import type { Permission } from '../modules/auth/auth.permissions.js'
import type { AuthRole } from '../modules/auth/auth.types.js'

export const authorize = (
  ...requiredPermissions: Permission[]
): RequestHandler => {

  return (
    req,
    res,
    next,
  ) => {

    const user = req.user

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access',
      })
    }

    const role = user.role as AuthRole | undefined

    if (!role) {
      return res.status(403).json({
        success: false,
        message: 'User role not assigned',
      })
    }

    const permissions = ROLE_PERMISSIONS[role]

    // Admin has every permission
    if (permissions.includes('*' as Permission)) {
      return next()
    }

    const allowed = requiredPermissions.every(
      permission => permissions.includes(permission),
    )

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      })
    }

    next()
  }
}