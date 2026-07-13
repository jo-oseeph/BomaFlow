import { Link, Outlet, useLocation } from 'react-router-dom'
import { HouseIcon } from '../icons'
import ThemeToggle from '../ThemeToggle'

export default function AuthLayout() {
  const { pathname } = useLocation()
  const isSignup = pathname === '/signup'

  return (
    <div className="min-h-screen bg-page text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col lg:flex-row">
        <div className="relative flex flex-1 flex-col justify-between bg-navy px-8 py-10 text-white lg:px-12 lg:py-12">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded bg-gold/20 text-gold">
                <HouseIcon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-wide">BomaFlow</div>
                <div className="text-[11px] text-white/60">Find Your Perfect Home</div>
              </div>
            </Link>
            <ThemeToggle className="border-white/20 bg-white/5 text-gold hover:border-gold" />
          </div>

          <div className="my-12 max-w-md">
            <span className="mb-4 block text-xs font-semibold tracking-[0.2em] text-gold">
              {isSignup ? 'JOIN BOMAFLOW' : 'WELCOME BACK'}
            </span>
            <h1 className="mb-4 text-3xl font-bold leading-tight lg:text-4xl">
              {isSignup ? (
                <>
                  Start your journey to a{' '}
                  <span className="text-gold">better rental experience</span>
                </>
              ) : (
                <>
                  Your trusted platform for{' '}
                  <span className="text-gold">rental properties</span> in Kenya
                </>
              )}
            </h1>
            <p className="text-sm leading-relaxed text-white/70">
              {isSignup
                ? 'Create an account to save listings, apply for rentals, and manage your profile in one place.'
                : 'Sign in to manage listings, track applications, and find your next home with verified property records.'}
            </p>
          </div>

          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} BomaFlow. Secure access powered by Supabase.
          </p>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
        </div>

        {/* Form panel */}
        <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
