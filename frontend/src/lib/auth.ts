import { supabase, isSupabaseConfigured } from './supabase'

export interface SignUpInput {
  email: string
  password: string
  fullName: string
  phone?: string
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

export async function signUp({ email, password, fullName, phone }: SignUpInput) {
  assertSupabaseConfigured()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone ?? null,
      },
    },
  })

  if (error) throw error
  return data
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
