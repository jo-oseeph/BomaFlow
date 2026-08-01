import { Link, useParams } from 'react-router-dom'

import { useUnit } from '../../hooks/useUnits'


export default function UnitDetailsPage() {

  const { unitId } = useParams()


  const {
    data: unit,
    isLoading,
    error,
  } = useUnit(
    unitId ?? '',
  )



  if (isLoading) {

    return (

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <p className="text-slate-600">
          Loading unit...
        </p>

      </div>

    )

  }



  if (error) {

    return (

      <div className="rounded-xl border border-red-200 bg-red-50 p-8">

        <h2 className="text-lg font-semibold text-red-700">
          Failed to load unit
        </h2>


        <p className="mt-2 text-red-600">

          {
            error instanceof Error
              ? error.message
              : 'Something went wrong.'
          }

        </p>

      </div>

    )

  }



  if (!unit) {

    return (

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <h2 className="text-xl font-semibold">
          Unit not found
        </h2>


        <Link
          to="/dashboard"
          className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-white"
        >

          Back Dashboard

        </Link>


      </div>

    )

  }



  return (

    <div className="space-y-6">


      <div className="flex items-start justify-between">


        <div>

          <h1 className="text-3xl font-bold text-slate-900">

            Unit {unit.unit_number}

          </h1>


          <p className="mt-1 text-sm text-slate-600">

            Unit details and rental information.

          </p>


        </div>



        <div className="flex gap-3">


          <Link

            to={`/dashboard/properties/${unit.property_id}/units/${unit.id}/edit`}

            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"

          >

            Edit Unit

          </Link>



          <button

            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"

          >

            Delete Unit

          </button>


        </div>


      </div>





      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">


        <div className="rounded-xl border bg-white p-6 shadow-sm">


          <h2 className="mb-4 text-lg font-semibold">

            Unit Information

          </h2>



          <dl className="space-y-3">


            <div className="flex justify-between">

              <dt className="text-slate-500">
                Unit Number
              </dt>


              <dd>
                {unit.unit_number}
              </dd>

            </div>



            <div className="flex justify-between">

              <dt className="text-slate-500">
                Building
              </dt>


              <dd>
                {unit.building_name ?? '-'}
              </dd>

            </div>



            <div className="flex justify-between">

              <dt className="text-slate-500">
                Floor
              </dt>


              <dd>
                {unit.floor ?? '-'}
              </dd>

            </div>



            <div className="flex justify-between">

              <dt className="text-slate-500">
                Bedrooms
              </dt>


              <dd>
                {unit.bedrooms ?? '-'}
              </dd>

            </div>



            <div className="flex justify-between">

              <dt className="text-slate-500">
                Bathrooms
              </dt>


              <dd>
                {unit.bathrooms ?? '-'}
              </dd>

            </div>



          </dl>


        </div>





        <div className="rounded-xl border bg-white p-6 shadow-sm">


          <h2 className="mb-4 text-lg font-semibold">

            Rental Information

          </h2>



          <dl className="space-y-3">


            <div className="flex justify-between">

              <dt className="text-slate-500">
                Monthly Rent
              </dt>


              <dd>
                KES {unit.rent_amount}
              </dd>


            </div>




            <div className="flex justify-between">

              <dt className="text-slate-500">
                Deposit
              </dt>


              <dd>
                KES {unit.deposit}
              </dd>


            </div>





            <div className="flex justify-between">

              <dt className="text-slate-500">
                Service Charge
              </dt>


              <dd>
                KES {unit.service_charge}
              </dd>


            </div>





            <div className="flex justify-between">

              <dt className="text-slate-500">
                Status
              </dt>


              <dd>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">

                  {unit.status}

                </span>

              </dd>


            </div>


          </dl>


        </div>


      </div>





      <div className="rounded-xl border bg-white p-6 shadow-sm">


        <h2 className="mb-4 text-lg font-semibold">

          System Information

        </h2>



        <dl className="space-y-3">


          <div className="flex justify-between">

            <dt className="text-slate-500">
              Created
            </dt>


            <dd>
              {new Date(
                unit.created_at,
              ).toLocaleString()}
            </dd>


          </div>



          <div className="flex justify-between">

            <dt className="text-slate-500">
              Updated
            </dt>


            <dd>
              {new Date(
                unit.updated_at,
              ).toLocaleString()}
            </dd>


          </div>


        </dl>


      </div>


    </div>

  )

}