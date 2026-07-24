import { PrismaClient } from '@prisma/client'

import { logger } from './logger.js'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaClient = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
})

prismaClient.$on('error', (event) => {
  logger.error(
    {
      message: event.message,
      target: event.target,
    },
    'Prisma error',
  )
})

prismaClient.$on('warn', (event) => {
  logger.warn(
    {
      message: event.message,
      target: event.target,
    },
    'Prisma warning',
  )
})

export const prisma =
  globalForPrisma.prisma ?? prismaClient

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}