import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function completeSignIn() {
      const hashParams = new URLSearchParams(window.location.hash.slice(1))
      const queryParams = new URLSearchParams(window.location.search)

      const authError =
        hashParams.get('error_description') ??
        hashParams.get('error') ??
        queryParams.get('error_description') ??
        queryParams.get('error')

      if (authError) {
        if (active) setError(authError)
        return
      }

      const { data, error: sessionError } = await supabase.auth.getSession()

      if (!active) return

      if (sessionError) {
        setError(sessionError.message)
        return
      }

      if (data.session) {
        navigate('/dashboard', { replace: true })
        return
      }

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          navigate('/dashboard', { replace: true })
        }
      })

      window.setTimeout(async () => {
        if (!active) return
        const { data: retry } = await supabase.auth.getSession()
        if (retry.session) {
          navigate('/dashboard', { replace: true })
        } else {
          setError('Sign-in could not be completed. Please try again.')
        }
        listener.subscription.unsubscribe()
      }, 3000)

      return () => {
        listener.subscription.unsubscribe()
      }
    }

    void completeSignIn()

    return () => {
      active = false
    }
  }, [navigate])

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-page px-6 text-center">
        <p className="mb-2 text-lg font-semibold text-foreground">Sign-in failed</p>
        <p className="mb-6 max-w-md text-sm text-muted">{error}</p>
        <Link
          to="/login"
          className="rounded bg-navy px-6 py-3 text-xs font-bold tracking-wide text-white"
        >
          BACK TO LOGIN
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-page">
      <p className="text-sm text-muted">Signing you in...</p>
    </div>
  )
}