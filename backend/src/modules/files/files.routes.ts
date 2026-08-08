/**
 * BomaFlow
 * Module: Files
 * File: files.routes.ts
 *
 * Purpose:
 * Defines File API routes.
 */

import { Router } from 'express'

import { upload } from '../../middleware/upload.js'

import {
  createFileController,
  deleteFileController,
  getFileByIdController,
  getFilesByEntityController,
} from './files.controller.js'

import {
  validateCreateFile,
} from './files.validation.js'


const router = Router()


router.post(
  '/',
  upload.single('file'),
  validateCreateFile,
  createFileController,
)


router.get(
  '/id/:id',
  getFileByIdController,
)


router.get(
  '/:entityType/:entityId',
  getFilesByEntityController,
)


router.delete(
  '/:id',
  deleteFileController,
)


export default router