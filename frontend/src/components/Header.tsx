import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HouseIcon, PhoneIcon } from './icons'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT US', to: '/about' },
  { label: 'PROPERTIES', to: '/properties' },
  { label: 'SERVICES', to: '/services' },
  { label: 'CONTACT US', to: '/contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-navy text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-gold/20 text-gold">
            <HouseIcon className="h-6 w-6" />
          </div>
          <div>
            <div className="text-lg font-bold leading-tight tracking-wide">BomaFlow</div>
            <div className="text-[11px] font-light text-white/60">Find Your Perfect Home</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-xs font-medium tracking-widest transition-colors ${
                  isActive ? 'text-gold' : 'text-white/90 hover:text-gold'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="border-white/20 bg-white/5 text-gold hover:border-gold" />

          <div className="hidden items-center gap-2 md:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-gold">
              <PhoneIcon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-white/60">Call Us Anytime</div>
              <div className="text-sm font-semibold">+254 700 123456</div>
            </div>
          </div>

          <Link
            to="/login"
            className="hidden rounded border border-white/20 px-4 py-2.5 text-xs font-bold tracking-wide text-white transition-colors hover:border-gold hover:text-gold sm:inline-block"
          >
            LOGIN
          </Link>
          <Link
            to="/signup"
            className="hidden rounded bg-gold px-4 py-2.5 text-xs font-bold tracking-wide text-navy transition-colors hover:bg-gold-light sm:inline-block"
          >
            SIGN UP
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded border border-white/20 lg:hidden"
            aria-label="Toggle menu"
          >
            <span className="text-lg">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-widest ${
                    isActive ? 'text-gold' : 'text-white/90'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded border border-white/20 px-5 py-2.5 text-center text-xs font-bold tracking-wide text-white"
            >
              LOGIN
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="rounded bg-gold px-5 py-2.5 text-center text-xs font-bold tracking-wide text-navy"
            >
              SIGN UP
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
