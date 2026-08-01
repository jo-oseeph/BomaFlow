import { Link, useParams } from 'react-router-dom'

import { useProperty } from '../../hooks/useProperties'
import { useUnitsByProperty } from '../../hooks/useUnits'


export default function PropertyDetailsPage() {

  const { propertyId } = useParams()


  const {
    data: property,
    isLoading,
    error,
  } = useProperty(
    propertyId ?? '',
  )


  const {
    data: units,
    isLoading: unitsLoading,
  } = useUnitsByProperty(
    propertyId ?? '',
  )


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



        <Link
          to={`/dashboard/properties/${property.id}/edit`}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
        >
          Edit Property
        </Link>


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

              <dd>
                {property.name}
              </dd>
            </div>



            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                Type
              </dt>

              <dd>
                {property.type ?? '-'}
              </dd>
            </div>



            <div className="flex justify-between">

              <dt className="font-medium text-slate-500">
                Status
              </dt>


              <dd>
                {property.status}
              </dd>

            </div>



            <div className="flex justify-between">

              <dt className="font-medium text-slate-500">
                Total Units
              </dt>


              <dd>
                {property.total_units}
              </dd>

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

              <dd>
                {property.county ?? '-'}
              </dd>
            </div>



            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                Town
              </dt>

              <dd>
                {property.town ?? '-'}
              </dd>
            </div>



            <div className="flex justify-between">
              <dt className="font-medium text-slate-500">
                Address
              </dt>

              <dd>
                {property.address ?? '-'}
              </dd>
            </div>



          </dl>


        </div>


      </div>





      <div className="rounded-xl border bg-white p-6 shadow-sm">


        <div className="flex items-center justify-between mb-4">


          <h2 className="text-lg font-semibold">
            Units
          </h2>


          <Link
            to={`/dashboard/properties/${property.id}/units/new`}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
          >
            Add Unit
          </Link>


        </div>



        {unitsLoading ? (

          <p className="text-slate-600">
            Loading units...
          </p>

        ) : units && units.length > 0 ? (

          <div className="space-y-3">


            {units.map((unit) => (

              <Link
                key={unit.id}
                to={`/dashboard/units/${unit.id}`}
                className="block rounded-lg border p-4 hover:bg-slate-50"
              >

                <div className="flex justify-between">


                  <div>

                    <p className="font-medium">
                      Unit {unit.unit_number}
                    </p>


                    <p className="text-sm text-slate-500">

                      {unit.bedrooms ?? 0} bedrooms ·

                      {' '}

                      {unit.bathrooms ?? 0} bathrooms

                    </p>


                  </div>



                  <div className="text-right">


                    <p className="font-medium">

                      KES {unit.rent_amount}

                    </p>


                    <p className="text-sm text-slate-500">

                      {unit.status}

                    </p>


                  </div>


                </div>


              </Link>

            ))}


          </div>


        ) : (

          <p className="text-slate-600">
            No units added yet.
          </p>

        )}


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



    </div>

  )

}