import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useProperties } from '../../hooks/useProperties'

export default function PropertiesDashboardPage() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [county, setCounty] = useState('')
  const [town, setTown] = useState('')
  const [propertyType, setPropertyType] = useState('')

  const {
    data: properties = [],
    isLoading,
    error,
  } = useProperties()

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        search.trim() === '' ||
        property.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (property.address ?? '')
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesStatus =
        status === '' ||
        property.status === status

      const matchesCounty =
        county === '' ||
        property.county === county

      const matchesTown =
        town === '' ||
        property.town === town

      const matchesType =
        propertyType === '' ||
        property.type === propertyType

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCounty &&
        matchesTown &&
        matchesType
      )
    })
  }, [
    properties,
    search,
    status,
    county,
    town,
    propertyType,
  ])

  const totalProperties =
    filteredProperties.length

  const totalUnits =
    filteredProperties.reduce(
      (sum, property) =>
        sum + property.total_units,
      0,
    )

  const activeProperties =
    filteredProperties.filter(
      property =>
        property.status === 'active',
    ).length

  const draftProperties =
    filteredProperties.filter(
      property =>
        property.status === 'draft',
    ).length

  const counties = [
    ...new Set(
      properties
        .map(p => p.county)
        .filter(Boolean),
    ),
  ] as string[]

  const towns = [
    ...new Set(
      properties
        .map(p => p.town)
        .filter(Boolean),
    ),
  ] as string[]

  const propertyTypes = [
    ...new Set(
      properties
        .map(p => p.type)
        .filter(Boolean),
    ),
  ] as string[]

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

  function clearFilters() {
    setSearch('')
    setStatus('')
    setCounty('')
    setTown('')
    setPropertyType('')
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        Loading properties...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Failed to load properties.
      </div>
    )
  }

  return (    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <input
            type="text"
            placeholder="Search property..."
            value={search}
            onChange={event =>
              setSearch(event.target.value)
            }
            className="rounded-lg border px-3 py-2"
          />

          <select
            value={status}
            onChange={event =>
              setStatus(event.target.value)
            }
            className="rounded-lg border px-3 py-2"
          >
            <option value="">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="draft">
              Draft
            </option>

            <option value="inactive">
              Inactive
            </option>

            <option value="archived">
              Archived
            </option>
          </select>

          <select
            value={county}
            onChange={event =>
              setCounty(event.target.value)
            }
            className="rounded-lg border px-3 py-2"
          >
            <option value="">
              All Counties
            </option>

            {counties.map(countyName => (
              <option
                key={countyName}
                value={countyName}
              >
                {countyName}
              </option>
            ))}
          </select>

          <select
            value={town}
            onChange={event =>
              setTown(event.target.value)
            }
            className="rounded-lg border px-3 py-2"
          >
            <option value="">
              All Towns
            </option>

            {towns.map(townName => (
              <option
                key={townName}
                value={townName}
              >
                {townName}
              </option>
            ))}
          </select>

          <select
            value={propertyType}
            onChange={event =>
              setPropertyType(
                event.target.value,
              )
            }
            className="rounded-lg border px-3 py-2"
          >
            <option value="">
              All Types
            </option>

            {propertyTypes.map(type => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(stat => (
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

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No properties match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredProperties.map(property => (
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
                            : property.status === 'draft'
                              ? 'bg-yellow-100 text-yellow-700'
                              : property.status === 'archived'
                                ? 'bg-slate-200 text-slate-700'
                                : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/dashboard/properties/${property.id}`}
                          className="rounded-md border px-3 py-1 text-sm hover:bg-slate-100"
                        >
                          View
                        </Link>

                        <Link
                          to={`/dashboard/properties/${property.id}/edit`}
                          className="rounded-md border px-3 py-1 text-sm hover:bg-slate-100"
                        >
                          Edit
                        </Link>
                      </div>
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