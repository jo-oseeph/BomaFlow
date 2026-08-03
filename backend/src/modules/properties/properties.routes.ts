/**
 * BomaFlow
 * Module: Properties
 * File: properties.routes.ts
 *
 * Purpose:
 * Defines all property routes.
 */

import { Router } from 'express'

import { authenticate } from '../../middleware/authenticate.js'
import { authorize } from '../../middleware/authorize.js'

import { PERMISSIONS } from '../auth/auth.permissions.js'

import {
  createPropertyController,
  getPropertiesController,
  getPropertyController,
  updatePropertyController,
  deletePropertyController,
  archivePropertyController,
  restorePropertyController,
} from './properties.controller.js'


const router = Router()

router.use(authenticate)


router.post(
  '/',
  authorize(PERMISSIONS.PROPERTY_CREATE),
  createPropertyController,
)


router.get(
  '/',
  authorize(PERMISSIONS.PROPERTY_READ),
  getPropertiesController,
)


router.get(
  '/:id',
  authorize(PERMISSIONS.PROPERTY_READ),
  getPropertyController,
)


router.put(
  '/:id',
  authorize(PERMISSIONS.PROPERTY_UPDATE),
  updatePropertyController,
)
router.patch(
  '/:id/archive',
  authorize(PERMISSIONS.PROPERTY_UPDATE),
  archivePropertyController,
)


router.patch(
  '/:id/restore',
  authorize(PERMISSIONS.PROPERTY_UPDATE),
  restorePropertyController,
)


router.delete(
  '/:id',
  authorize(PERMISSIONS.PROPERTY_DELETE),
  deletePropertyController,
)


export default router