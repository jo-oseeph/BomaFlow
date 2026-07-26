/**
 * BomaFlow
 * Frontend Context
 * File: AuthContext.tsx
 *
 * Purpose:
 * Manages frontend authentication state
 * and synchronises with BomaFlow backend.
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";
import { setAccessToken } from "../lib/auth-token";

import {
  getCurrentUser,
  type BackendProfile,
} from "../services/auth.service";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: BackendProfile | null;
  role: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<BackendProfile | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadBackendUser() {
    try {
      const response = await getCurrentUser();

      setProfile(response.data.profile);
      setRole(response.data.role);
    } catch (error) {
      console.error("Failed to load backend user", error);

      setProfile(null);
      setRole(null);
    }
  }

  useEffect(() => {
    async function initializeAuth() {
      const { data } = await supabase.auth.getSession();
      const currentSession = data.session;

      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setAccessToken(currentSession?.access_token ?? null);

      if (currentSession) {
        await loadBackendUser();
      }

      setLoading(false);
    }

    void initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setAccessToken(newSession?.access_token ?? null);

      if (newSession) {
        // Deferred so this runs after the Supabase client releases
        // its internal auth lock, which it holds while dispatching
        // this callback. Calling backend/API code synchronously here
        // is safe, but any code path that touches supabase.auth.*
        // again (e.g. via the axios interceptor) would deadlock
        // without this deferral.
        setTimeout(() => {
          void loadBackendUser();
        }, 0);
      } else {
        setProfile(null);
        setRole(null);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({ user, session, profile, role, loading }),
    [user, session, profile, role, loading],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}