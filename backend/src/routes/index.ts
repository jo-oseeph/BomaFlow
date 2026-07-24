import { Router } from 'express'

import { env } from '../config/env.js'

const router = Router()

router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'BomaFlow API',
    environment: env.NODE_ENV,
  })
})

export default router