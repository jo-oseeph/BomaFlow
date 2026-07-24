import pino from 'pino'

import { env } from './env.js'

const loggerOptions =
  env.NODE_ENV === 'production'
    ? {
        level: 'info',
      }
    : {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      }

export const logger = pino(loggerOptions)