/**
 * BomaFlow
 * Module: Authentication
 * File: auth.types.ts
 */

import type { User } from '@supabase/supabase-js'

import type { AUTH_ROLES } from './auth.constants.js'

export type AuthRole = (typeof AUTH_ROLES)[number]

export interface AuthUser {
  id: string
  email: string | null
}

export interface AuthSession {
  user: User
  accessToken: string
  refreshToken: string
}

export interface AuthenticatedRequestUser {
  id: string
  email?: string
  role?: AuthRole
  supabaseUser?: User
}