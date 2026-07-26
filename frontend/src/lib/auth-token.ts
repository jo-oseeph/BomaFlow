/**
 * BomaFlow
 * In-memory access token store
 *
 * Purpose:
 * Holds the current Supabase access token outside of React state,
 * so the axios interceptor (api.ts) can read it synchronously
 * without calling supabase.auth.getSession() itself.
 *
 * Why this exists:
 * Calling supabase.auth.getSession() from inside the axios
 * interceptor caused a deadlock when the request was triggered
 * from within a Supabase onAuthStateChange callback, because the
 * Supabase client holds an internal lock while dispatching that
 * event, and getSession() needs the same lock to resolve.
 *
 * AuthContext is the single source of truth that keeps this
 * value in sync with the current session.
 */

let currentAccessToken: string | null = null;

export function setAccessToken(token: string | null) {
  currentAccessToken = token;
}

export function getAccessToken(): string | null {
  return currentAccessToken;
}