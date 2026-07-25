/**
 * BomaFlow
 * Module: Authentication
 * File: auth.routes.ts
 *
 * Purpose:
 * Authentication and authorization routes.
 */

import { Router } from 'express'

import {
  loginController,
  meController,
  signUpController,
} from './auth.controller.js'

import {
  loginSchema,
  signupSchema,
} from './auth.validation.js'

import { validate } from '../../middleware/validate.js'
import { authenticate } from '../../middleware/authenticate.js'
import { authorize } from '../../middleware/authorize.js'
import { PERMISSIONS } from './auth.permissions.js'

const router = Router()

/**
 * Public routes
 */

router.post(
  '/signup',
  validate(signupSchema),
  signUpController,
)

router.post(
  '/login',
  validate(loginSchema),
  loginController,
)

/**
 * Protected routes
 */

router.get(
  '/me',
  authenticate,
  authorize(
    PERMISSIONS.PROFILE_READ,
  ),
  meController,
)

export default router