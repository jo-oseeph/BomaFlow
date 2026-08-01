import { Link, useNavigate } from 'react-router-dom'

import { useProperties } from '../../hooks/useProperties'

export default function PropertiesDashboardPage() {
  const navigate = useNavigate()

  const {
    data: properties = [],
    isLoading,
    error,
  } = useProperties()

  const totalProperties = properties.length

  const totalUnits = properties.reduce(
    (sum, property) => sum + property.total_units,
    0,
  )

  const activeProperties = properties.filter(
    (property) => property.status === 'active',
  ).length

  const draftProperties = properties.filter(
    (property) => property.status === 'draft',
  ).length

  const stats = [
    {
      title: 'Total Properties',
      value: totalProperties,
    },
    {
      title: 'Total Units',
      value: totalUnits,
    },
    {
      title: 'Active Properties',
      value: activeProperties,
    },
    {
      title: 'Draft Properties',
      value: draftProperties,
    },
  ]

  function handleAddProperty() {
    navigate('/dashboard/properties/new')
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        Loading properties...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8">
        Failed to load properties.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Properties
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Manage properties, units, and occupancy.
          </p>
        </div>

        <button
          onClick={handleAddProperty}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {stat.title}
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Property List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Property
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  County
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Town
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Units
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {properties.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No properties found.
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                  <tr
                    key={property.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/dashboard/properties/${property.id}`}
                        className="font-semibold text-slate-900 hover:text-blue-600"
                      >
                        {property.name}
                      </Link>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {property.type ?? '-'}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {property.county ?? '-'}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {property.town ?? '-'}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {property.total_units}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          property.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}