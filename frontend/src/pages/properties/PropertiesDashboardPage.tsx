import { useNavigate } from 'react-router-dom'
import { properties } from '../../data/properties'

export default function PropertiesDashboardPage() {
  const navigate = useNavigate()

  const totalProperties = properties.length

  const totalUnits = properties.reduce(
    (sum, property) => sum + property.totalUnits,
    0,
  )

  const occupiedUnits = properties.reduce(
    (sum, property) => sum + property.occupiedUnits,
    0,
  )

  const vacantUnits = properties.reduce(
    (sum, property) => sum + property.vacantUnits,
    0,
  )

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
      title: 'Occupied Units',
      value: occupiedUnits,
    },
    {
      title: 'Vacant Units',
      value: vacantUnits,
    },
  ]

  function handleAddProperty() {
    navigate('/dashboard/properties/new')
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
                  Location
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Units
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Occupied
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Vacant
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">
                        {property.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {property.propertyCode}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {property.address}, {property.city}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {property.totalUnits}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {property.occupiedUnits}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {property.vacantUnits}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {property.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}