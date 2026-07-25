/**
 * BomaFlow
 * Module: Authentication
 * File: auth.schema.ts
 */

import { z } from 'zod'

import { AUTH_ROLES } from './auth.constants.js'

export const signUpSchema = z.object({
  email: z.email(),

  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters'),

  fullName: z
    .string()
    .min(2, 'Full name must contain at least 2 characters'),

  phone: z
    .string()
    .nullable()
    .optional(),

  role: z.enum(AUTH_ROLES),
})


export const loginSchema = z.object({
  email: z.email(),

  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters'),
})


export type SignUpInput = z.infer<typeof signUpSchema>

export type LoginInput = z.infer<typeof loginSchema>