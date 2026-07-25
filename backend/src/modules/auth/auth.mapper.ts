/**
 * BomaFlow
 * Module: Authentication
 * File: auth.mapper.ts
 *
 * Purpose:
 * Converts database entities into API responses.
 */


export const mapProfile = (
  profile: {
    id: string
    email: string | null
    full_name: string | null
    phone: string | null
    avatar_url: string | null
  } | null,
) => {

  if (!profile) {
    return null
  }

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    phone: profile.phone,
    avatarUrl: profile.avatar_url,
  }
}


export const mapRole = (
  role:
    | {
        role: string
      }
    | null,
) => {

  return role?.role ?? null
}