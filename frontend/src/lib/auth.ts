import { supabase, isSupabaseConfigured } from './supabase'
import api from '../services/api'
import type { AuthRole } from './permissions'

export interface SignUpInput {
  email: string
  password: string
  fullName: string
  phone?: string
  role: AuthRole
}

export interface SignInInput {
  email: string
  password: string
}

function assertSupabaseConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in frontend/.env',
    )
  }
}

export async function signUp({ email, password, fullName, phone, role }: SignUpInput) {
  const response = await api.post('/auth/signup', {
    email,
    password,
    full_name: fullName,
    phone: phone ?? null,
    role,
  })
  return response.data
}

export async function signIn({ email, password }: SignInInput) {
  assertSupabaseConfigured()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signInWithGoogle() {
  assertSupabaseConfigured()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) throw error
  return data
}

export async function signOut() {
  assertSupabaseConfigured()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  if (!isSupabaseConfigured) return null
  const { data } = await supabase.auth.getSession()
  return data.session
}