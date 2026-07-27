import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { signOut } from '../../lib/auth'
import { hasRole, type AuthRole } from '../../lib/permissions'

interface NavItem {
  name: string
  path: string
  roles?: AuthRole[] // omit to show to everyone
}

const navigation: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard' },
  {
    name: 'Properties',
    path: '/dashboard/properties',
    roles: ['landlord', 'manager', 'admin'],
  },
  {
    name: 'Tenants',
    path: '/dashboard/tenants',
    roles: ['landlord', 'manager', 'admin'],
  },
  {
    name: 'Leases',
    path: '/dashboard/leases',
    roles: ['landlord', 'manager', 'tenant', 'admin'],
  },
  {
    name: 'Payments',
    path: '/dashboard/payments',
    roles: ['landlord', 'manager', 'tenant', 'admin'],
  },
  {
    name: 'Maintenance',
    path: '/dashboard/maintenance',
    roles: ['landlord', 'manager', 'tenant', 'technician', 'admin'],
  },
  {
    name: 'Listings',
    path: '/dashboard/listings',
    roles: ['landlord', 'manager', 'tenant', 'admin'],
  },
  {
    name: 'Reports',
    path: '/dashboard/reports',
    roles: ['landlord', 'manager', 'admin'],
  },
  { name: 'Settings', path: '/dashboard/settings' },
]

export default function DashboardLayout() {
  const { user, role } = useAuth()
  const navigate = useNavigate()

  const visibleNavigation = navigation.filter(
    (item) => !item.roles || hasRole(role as AuthRole | null, item.roles),
  )

  async function handleSignOut() {
    try {
      await signOut()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-slate-900 text-white">
        <div className="border-b border-slate-700 p-6">
          <h1 className="text-2xl font-bold">BomaFlow</h1>
          <p className="mt-2 text-xs text-slate-300">
            Rental Management Platform
          </p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {visibleNavigation.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded px-4 py-2 transition ${
                      isActive
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="rounded bg-red-600 px-4 py-2 text-sm text-white"
            >
              Sign Out
            </button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}