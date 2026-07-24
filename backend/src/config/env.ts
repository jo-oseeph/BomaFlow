import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z.coerce.number().default(5000),

  SUPABASE_URL: z.url(),

  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  SUPABASE_PROJECT_ID: z.string().min(1),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    parsedEnv.error.flatten().fieldErrors,
  )

  process.exit(1)
}

export const env = parsedEnv.data