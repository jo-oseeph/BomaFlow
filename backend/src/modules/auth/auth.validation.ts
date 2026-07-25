import { z } from 'zod'

export const signupSchema = z.object({
  email: z.email(),

  password: z.string().min(8),

  full_name: z.string().min(2),

  phone: z.string().optional(),

  role: z.enum([
    'landlord',
    'manager',
    'tenant',
    'technician',
  ]),
})

export const loginSchema = z.object({
  email: z.email(),

  password: z.string().min(8),
})