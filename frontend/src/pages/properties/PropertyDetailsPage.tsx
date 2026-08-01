import { Link, useParams } from 'react-router-dom'

import { useProperty } from '../../hooks/useProperties'

export default function PropertyDetailsPage() {
  const { propertyId } = useParams()

  const {
    data: property,
    isLoading,
    error,
  } = useProperty(propertyId ?? '')

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <p className="text-slate-600">
          Loading property...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8">
        <h2 className="text-lg font-semibold text-red-700">
          Failed to load property
        </h2>

        <p className="mt-2 text-red-600">
          {error instanceof Error
            ? error.message
            : 'Something went wrong.'}
        </p>

        <Link
          to="/dashboard/properties"
          className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Back to Properties
        </Link>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">
          Property not found
        </h2>

        <Link
          to="/dashboard/properties"
          className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Back to Properties
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {property.name}
          </h1>

          <p className="mt-2 text-slate-600">
            Property Details
          </p>
        </div>

        <div className="flex gap-3">
          <Link
  to={`/dashboard/properties/${property.id}/edit`}
  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
>
  Edit Property
</Link>

          <button
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete Property
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Basic Information
          </h2>

          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                Name
              </dt>

              <dd>{property.name}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                Type
              </dt>

              <dd>{property.type ?? '-'}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                Status
              </dt>

              <dd>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                  {property.status}
                </span>
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                Units
              </dt>

              <dd>{property.total_units}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                Year Built
              </dt>

              <dd>{property.year_built ?? '-'}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Location
          </h2>

          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                County
              </dt>

              <dd>{property.county ?? '-'}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                Constituency
              </dt>

              <dd>{property.constituency ?? '-'}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                Ward
              </dt>

              <dd>{property.ward ?? '-'}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                Town
              </dt>

              <dd>{property.town ?? '-'}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                Estate
              </dt>

              <dd>{property.estate ?? '-'}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                Address
              </dt>

              <dd>{property.address ?? '-'}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Description
        </h2>

        <p className="text-slate-600">
          {property.description ??
            'No description has been provided for this property.'}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          System Information
        </h2>

        <dl className="space-y-3">
          <div className="flex justify-between">
            <dt className="font-medium text-slate-500">
              Created
            </dt>

            <dd>
              {new Date(
                property.created_at,
              ).toLocaleString()}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-slate-500">
              Last Updated
            </dt>

            <dd>
              {new Date(
                property.updated_at,
              ).toLocaleString()}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-slate-500">
              Verification Score
            </dt>

            <dd>{property.verification_score}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-slate-500">
              Trust Score
            </dt>

            <dd>{property.trust_score}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}