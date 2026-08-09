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
import { upload } from '../../middleware/upload.js'

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

import {
  uploadPropertyFileController,
  getPropertyFilesController,
  deletePropertyFileController,
} from './properties.files.controller.js'

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

// Property files
router.post(
  '/:id/files',
  authorize(PERMISSIONS.PROPERTY_UPDATE),
  upload.single('file'),
  uploadPropertyFileController,
)

router.get(
  '/:id/files',
  authorize(PERMISSIONS.PROPERTY_READ),
  getPropertyFilesController,
)

router.delete(
  '/:id/files/:fileId',
  authorize(PERMISSIONS.PROPERTY_UPDATE),
  deletePropertyFileController,
)

export default router
