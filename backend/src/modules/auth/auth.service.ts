/**
 * BomaFlow
 * Module: Authentication
 * File: auth.service.ts
 *
 * Purpose:
 * Contains authentication business logic.
 */
import {
  supabase,
  supabaseAdmin,
} from '../../config/supabase.js'
import {
  assignUserRole,
  createUserProfile,
  findUserProfile,
  findUserRole,
} from './auth.repository.js'
import {
  mapProfile,
  mapRole,
} from './auth.mapper.js'
import {
  InvalidCredentialsError,
  UnauthorizedError,
  UserCreationError,
} from './auth.errors.js'
import type {
  LoginInput,
  SignupInput,
} from './auth.validation.js'

export const signUp = async (
  input: SignupInput,
) => {
  const {
    data,
    error,
  } = await supabaseAdmin.auth.admin.createUser({
    email: input.email,
    password: input.password,
    email_confirm: false,
  })
  if (error) {
    throw new UserCreationError(error.message)
  }
  if (!data.user) {
    throw new UserCreationError()
  }
  await createUserProfile({
    id: data.user.id,
    email: input.email,
    fullName: input.full_name,
    phone: input.phone ?? null,
  })
  await assignUserRole({
    userId: data.user.id,
    role: input.role,
  })
  return {
    id: data.user.id,
    email: data.user.email,
  }
}
export const login = async (
  input: LoginInput,
) => {
  const {
    data,
    error,
  } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  })
  if (error) {
    throw new InvalidCredentialsError()
  }
  return {
    user: data.user,
    session: data.session,
  }
}
export const getCurrentUser = async (
  token: string,
) => {
  const {
    data,
    error,
  } = await supabase.auth.getUser(token)
  if (error || !data.user) {
    throw new UnauthorizedError()
  }
  const profile = await findUserProfile(data.user.id)
  const role = await findUserRole(data.user.id)
  return {
    user: data.user,
    profile: mapProfile(profile),
    role: mapRole(role),
  }
}