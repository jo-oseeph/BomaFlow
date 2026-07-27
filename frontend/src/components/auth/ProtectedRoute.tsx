import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { hasRole, type AuthRole } from '../../lib/permissions'

interface ProtectedRouteProps {
  allowedRoles?: AuthRole[]
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, role, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !hasRole(role as AuthRole | null, allowedRoles)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}