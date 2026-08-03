import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import {
  useState,
} from 'react'

import {
  useProperty,
} from '../../hooks/useProperties'

import {
  useUnitsByProperty,
} from '../../hooks/useUnits'

import {
  useDeleteProperty,
  useArchiveProperty,
  useRestoreProperty,
} from '../../hooks/usePropertyMutations'

import ConfirmDialog from '../../components/common/ConfirmDialog'


export default function PropertyDetailsPage() {

  const navigate =
    useNavigate()

  const { propertyId } =
    useParams()


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


  const deleteProperty =
    useDeleteProperty()


  const archiveProperty =
    useArchiveProperty()


  const restoreProperty =
    useRestoreProperty()



  const [
    showDeleteDialog,
    setShowDeleteDialog,
  ] = useState(false)


  const [
    showArchiveDialog,
    setShowArchiveDialog,
  ] = useState(false)


  const [
    showRestoreDialog,
    setShowRestoreDialog,
  ] = useState(false)



  const [
    actionError,
    setActionError,
  ] = useState<string | null>(null)



  const totalUnits =
    units?.length ?? 0


  const vacantUnits =
    units?.filter(
      (unit) =>
        unit.status === 'vacant',
    ).length ?? 0


  const occupiedUnits =
    units?.filter(
      (unit) =>
        unit.status === 'occupied',
    ).length ?? 0


  const maintenanceUnits =
    units?.filter(
      (unit) =>
        unit.status === 'maintenance',
    ).length ?? 0


  const occupancyRate =
    totalUnits > 0
      ? Math.round(
          (occupiedUnits / totalUnits) * 100,
        )
      : 0



  async function handleDelete() {

    if (!property) {
      return
    }


    try {

      setActionError(null)


      await deleteProperty.mutateAsync(
        property.id,
      )


      setShowDeleteDialog(false)


      navigate(
        '/dashboard/properties',
      )


    } catch {

      setShowDeleteDialog(false)


      setActionError(
        'Unable to delete property. This property still contains units. Remove units first or archive the property.',
      )

    }

  }



  async function handleArchive() {

    if (!property) {
      return
    }


    try {

      setActionError(null)


      await archiveProperty.mutateAsync(
        property.id,
      )


      setShowArchiveDialog(false)


    } catch {

      setShowArchiveDialog(false)


      setActionError(
        'Unable to archive property.',
      )

    }

  }



  async function handleRestore() {

    if (!property) {
      return
    }


    try {

      setActionError(null)


      await restoreProperty.mutateAsync(
        property.id,
      )


      setShowRestoreDialog(false)


    } catch {

      setShowRestoreDialog(false)


      setActionError(
        'Unable to restore property.',
      )

    }

  }
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

          {
            error instanceof Error
              ? error.message
              : 'Something went wrong.'
          }

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



      {actionError && (

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">

          <h2 className="text-lg font-semibold text-red-700">
            Property Action Failed
          </h2>


          <p className="mt-2 text-red-600">
            {actionError}
          </p>

        </div>

      )}





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





          {
            property.status === 'archived'
              ? (

                <button

                  type="button"

                  onClick={() => {

                    setActionError(null)

                    setShowRestoreDialog(true)

                  }}

                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"

                >

                  Restore Property

                </button>

              )

              : (

                <button

                  type="button"

                  onClick={() => {

                    setActionError(null)

                    setShowArchiveDialog(true)

                  }}

                  className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"

                >

                  Archive Property

                </button>

              )

          }





          <button

            type="button"

            onClick={() => {

              setActionError(null)

              setShowDeleteDialog(true)

            }}

            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"

          >

            Delete Property

          </button>


        </div>


      </div>





      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">


        <div className="rounded-xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Total Units
          </p>

          <p className="mt-2 text-3xl font-bold">
            {totalUnits}
          </p>

        </div>



        <div className="rounded-xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Vacant
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {vacantUnits}
          </p>

        </div>



        <div className="rounded-xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Occupied
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {occupiedUnits}
          </p>

        </div>



        <div className="rounded-xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Maintenance
          </p>

          <p className="mt-2 text-3xl font-bold text-amber-600">
            {maintenanceUnits}
          </p>

        </div>



        <div className="rounded-xl border bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Occupancy Rate
          </p>

          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {occupancyRate}%
          </p>

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


          <h2 className="mb-4 text-lg-semibold">
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


        <div className="mb-4 flex items-center justify-between">


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





        {
          unitsLoading ? (

            <p className="text-slate-600">
              Loading units...
            </p>


          ) : units && units.length > 0 ? (


            <div className="space-y-3">


              {
                units.map((unit) => (

                  <Link

                    key={unit.id}

                    to={`/dashboard/properties/${property.id}/units/${unit.id}`}

                    className="block rounded-lg border p-4 hover:bg-slate-50"

                  >


                    <div className="flex justify-between">


                      <div>

                        <p className="font-medium">
                          Unit {unit.unit_number}
                        </p>


                        <p className="text-sm text-slate-500">

                          {unit.bedrooms ?? 0} bedrooms · {unit.bathrooms ?? 0} bathrooms

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

                ))

              }


            </div>


          ) : (


            <p className="text-slate-600">
              No units added yet.
            </p>


          )

        }


      </div>





      <div className="rounded-xl border bg-white p-6 shadow-sm">


        <h2 className="mb-4 text-lg font-semibold">
          Description
        </h2>


        <p className="text-slate-600">

          {
            property.description ??
            'No description has been provided for this property.'
          }

        </p>


      </div>





      <ConfirmDialog

        open={showArchiveDialog}

        title="Archive Property"

        message={
          <>
            Are you sure you want to archive{' '}

            <strong>
              {property.name}
            </strong>

            ?

            <br />

            <br />

            Archived properties will no longer appear as active properties.
          </>
        }

        confirmText="Archive Property"

        confirmVariant="danger"

        loading={
          archiveProperty.isPending
        }

        onCancel={() =>
          setShowArchiveDialog(false)
        }

        onConfirm={
          handleArchive
        }

      />





      <ConfirmDialog

        open={showRestoreDialog}

        title="Restore Property"

        message={
          <>
            Are you sure you want to restore{' '}

            <strong>
              {property.name}
            </strong>

            ?

          </>
        }

        confirmText="Restore Property"

        loading={
          restoreProperty.isPending
        }

        onCancel={() =>
          setShowRestoreDialog(false)
        }

        onConfirm={
          handleRestore
        }

      />





      <ConfirmDialog

        open={showDeleteDialog}

        title="Delete Property"

        message={

          <>

            Are you sure you want to delete{' '}

            <strong>
              {property.name}
            </strong>

            ?

            <br />

            <br />

            This action cannot be undone.

          </>

        }

        confirmText="Delete Property"

        confirmVariant="danger"

        loading={
          deleteProperty.isPending
        }

        onCancel={() =>
          setShowDeleteDialog(false)
        }

        onConfirm={
          handleDelete
        }

      />



    </div>

  )

}