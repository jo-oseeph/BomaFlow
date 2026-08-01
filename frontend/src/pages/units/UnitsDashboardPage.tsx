import { Link, useNavigate, useParams } from 'react-router-dom'

import { useUnitsByProperty } from '../../hooks/useUnits'


export default function UnitsDashboardPage() {

  const navigate = useNavigate()

  const { propertyId } = useParams()


  const {
    data: units = [],
    isLoading,
    error,
  } = useUnitsByProperty(
    propertyId ?? '',
  )



  const totalUnits = units.length

  const vacantUnits =
    units.filter(
      (unit) =>
        unit.status === 'vacant',
    ).length


  const occupiedUnits =
    units.filter(
      (unit) =>
        unit.status === 'occupied',
    ).length


  const maintenanceUnits =
    units.filter(
      (unit) =>
        unit.status === 'maintenance',
    ).length



  const stats = [
    {
      title: 'Total Units',
      value: totalUnits,
    },
    {
      title: 'Vacant Units',
      value: vacantUnits,
    },
    {
      title: 'Occupied Units',
      value: occupiedUnits,
    },
    {
      title: 'Maintenance',
      value: maintenanceUnits,
    },
  ]



  function handleAddUnit() {

    navigate(
      `/dashboard/properties/${propertyId}/units/new`,
    )

  }



  if (isLoading) {

    return (
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        Loading units...
      </div>
    )

  }



  if (error) {

    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8">
        Failed to load units.
      </div>
    )

  }



  return (

    <div className="space-y-6">


      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Units
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Manage property units, rent and occupancy.
          </p>

        </div>


        <button
          onClick={handleAddUnit}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Add Unit
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
            Unit List
          </h2>

        </div>



        <div className="overflow-x-auto">

          <table className="min-w-full divide-y divide-slate-200">


            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Unit
                </th>


                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Bedrooms
                </th>


                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Rent
                </th>


                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>


              </tr>

            </thead>



            <tbody className="divide-y divide-slate-100">


              {
                units.length === 0 ? (

                  <tr>

                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No units found.
                    </td>

                  </tr>

                ) : (

                  units.map((unit) => (

                    <tr
                      key={unit.id}
                      className="hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">

                        <Link
                          to={`/dashboard/properties/${propertyId}/units/${unit.id}`}
                          className="font-semibold text-slate-900 hover:text-blue-600"
                        >

                          {unit.unit_number}

                        </Link>

                      </td>


                      <td className="px-6 py-4 text-sm text-slate-600">

                        {unit.bedrooms ?? '-'}

                      </td>


                      <td className="px-6 py-4 text-sm text-slate-600">

                        KES {unit.rent_amount}

                      </td>


                      <td className="px-6 py-4">

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">

                          {unit.status}

                        </span>

                      </td>


                    </tr>

                  ))

                )
              }


            </tbody>


          </table>


        </div>


      </div>


    </div>

  )

}