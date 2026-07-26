/**
 * BomaFlow
 * Middleware
 * File: authenticate.ts
 *
 * Purpose:
 * Authenticates requests using a Supabase JWT.
 * If successful, the authenticated user is attached to req.user.
 */
import type { RequestHandler } from 'express'
import { supabase } from '../config/supabase.js'
import { findUserRole } from '../modules/auth/auth.repository.js'

export const authenticate: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const authorization =
      req.headers.authorization

    if (!authorization?.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized access',
      })
      return
    }

    const token =
      authorization.replace(
        'Bearer ',
        '',
      )

    const {
      data,
      error,
    } =
      await supabase.auth.getUser(
        token,
      )

    if (error || !data.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized access',
      })
      return
    }

    const userRole =
      await findUserRole(
        data.user.id,
      )

    req.user = {
      id: data.user.id,
      supabaseUser: data.user,
    }

    if (userRole) {
      req.user.role =
        userRole.role
    }

    if (data.user.email) {
      req.user.email =
        data.user.email
    }

    next()
  } catch (error) {
    next(error)
  }
}