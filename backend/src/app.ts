import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { pinoHttp } from 'pino-http'

import { logger } from './config/logger.js'
import routes from './routes/index.js'

const app = express()

// Security middleware
app.use(helmet())

// Enable Cross-Origin Resource Sharing
app.use(cors())

// Compress responses
app.use(compression())

// Parse JSON request bodies
app.use(express.json())

// Parse URL encoded request bodies
app.use(express.urlencoded({ extended: true }))

// HTTP request logging
app.use(
  pinoHttp({
    logger,
  }),
)

// API routes
app.use('/api/v1', routes)

export default app