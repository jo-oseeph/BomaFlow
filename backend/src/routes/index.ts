/**
 * BomaFlow
 * File: routes/index.ts
 */

import { Router } from 'express'

import { env } from '../config/env.js'

import authRoutes from '../modules/auth/index.js'
import propertiesRoutes from '../modules/properties/index.js'

const router = Router()

router.get(
  '/health',
  (_req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'BomaFlow API',
      environment: env.NODE_ENV,
    })
  },
)

router.use(
  '/auth',
  authRoutes,
)

router.use(
  '/properties',
  propertiesRoutes,
)

export default router