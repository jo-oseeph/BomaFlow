/**
 * BomaFlow
 * File: src/config/supabase.ts
 *
 * Purpose:
 * Creates the Supabase clients used throughout the application.
 *
 * - supabase:
 *   Uses the ANON key.
 *   Used for login, logout, getUser(), refresh session, etc.
 *
 * - supabaseAdmin:
 *   Uses the SERVICE ROLE key.
 *   Used ONLY for privileged admin operations such as creating users.
 */

import { createClient } from '@supabase/supabase-js'

import { env } from './env.js'

export const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)