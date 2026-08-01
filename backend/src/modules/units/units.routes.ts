/**
 * BomaFlow
 * Module: Units
 * File: units.routes.ts
 *
 * Purpose:
 * Defines all unit routes.
 */

import { Router } from 'express'

import { authenticate } from '../../middleware/authenticate.js'
import { authorize } from '../../middleware/authorize.js'

import { PERMISSIONS } from '../auth/auth.permissions.js'

import {
  createUnitController,
  getUnitsByPropertyController,
  getUnitController,
  updateUnitController,
  deleteUnitController,
} from './units.controller.js'

import {
  validateCreateUnit,
  validateUpdateUnit,
} from './units.validation.js'


const router = Router()


router.use(
  authenticate,
)


router.post(
  '/',
  authorize(PERMISSIONS.UNIT_CREATE),
  validateCreateUnit,
  createUnitController,
)


router.get(
  '/property/:propertyId',
  authorize(PERMISSIONS.UNIT_READ),
  getUnitsByPropertyController,
)


router.get(
  '/:id',
  authorize(PERMISSIONS.UNIT_READ),
  getUnitController,
)


router.put(
  '/:id',
  authorize(PERMISSIONS.UNIT_UPDATE),
  validateUpdateUnit,
  updateUnitController,
)


router.delete(
  '/:id',
  authorize(PERMISSIONS.UNIT_DELETE),
  deleteUnitController,
)


export default router