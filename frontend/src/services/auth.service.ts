/**
 * BomaFlow
 * Frontend Service
 * File: auth.service.ts
 *
 * Purpose:
 * Handles communication between frontend
 * authentication state and BomaFlow backend.
 */

import api from './api'

export interface BackendAuthUser {
  id: string
  email: string | null
}

export interface BackendProfile {
  id: string
  email: string | null
  fullName: string | null
  phone: string | null
  avatarUrl: string | null
}

export interface BackendAuthResponse {
  success: boolean
  data: {
    user: BackendAuthUser
    profile: BackendProfile | null
    role: string | null
  }
}

/**
 * Fetch authenticated BomaFlow user data
 *
 * Requires:
 * Authorization: Bearer <supabase_access_token>
 */
export async function getCurrentUser() {
  const response = await api.get<BackendAuthResponse>(
    '/auth/me',
  )

  return response.data
}