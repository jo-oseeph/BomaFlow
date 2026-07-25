import type { ErrorRequestHandler } from 'express'

import { logger } from '../config/logger.js'

export const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  logger.error(err, 'Unhandled application error')

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
}