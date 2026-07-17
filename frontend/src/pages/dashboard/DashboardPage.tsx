import { useAuth } from '../../context/AuthContext'

export default function DashboardPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="mt-4">
        User:
        {' '}
        {user?.email ?? 'Not signed in'}
      </p>
    </div>
  )
}