/**
 * BomaFlow
 * Module: Authentication
 * File: auth.repository.ts
 *
 * Purpose:
 * Handles all database operations related to authentication.
 */

import { prisma } from '../../config/prisma.js'
import type { AuthRole } from './auth.types.js'

export const createUserProfile = async (
  data: {
    id: string
    email: string
    fullName: string
    phone?: string | null
  },
) => {
  return prisma.profiles.upsert({
    where: {
      id: data.id,
    },
    update: {
      email: data.email,
      full_name: data.fullName,
      phone: data.phone ?? null,
    },
    create: {
      id: data.id,
      email: data.email,
      full_name: data.fullName,
      phone: data.phone ?? null,
    },
  })
}

export const assignUserRole = async (
  data: {
    userId: string
    role: AuthRole
  },
) => {
  const existingRole =
    await prisma.user_roles.findFirst({
      where: {
        user_id: data.userId,
        role: data.role,
      },
    })

  if (existingRole) {
    return existingRole
  }

  return prisma.user_roles.create({
    data: {
      user_id: data.userId,
      role: data.role,
    },
  })
}

export const findUserProfile = async (
  userId: string,
) => {
  return prisma.profiles.findUnique({
    where: {
      id: userId,
    },
  })
}

export const findUserRole = async (
  userId: string,
) => {
  return prisma.user_roles.findFirst({
    where: {
      user_id: userId,
    },
  })
}