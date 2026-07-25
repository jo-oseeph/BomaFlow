/**
 * BomaFlow
 * Module: Authentication
 * File: auth.routes.ts
 */

import { Router } from 'express'

import {
  loginController,
  meController,
  signUpController,
} from './auth.controller.js'

import {
  loginSchema,
  signUpSchema,
} from './auth.schema.js'

import { validate } from '../../middleware/validate.js'


const router = Router()


router.post(
  '/signup',
  validate(signUpSchema),
  signUpController,
)


router.post(
  '/login',
  validate(loginSchema),
  loginController,
)


router.get(
  '/me',
  meController,
)


export default router