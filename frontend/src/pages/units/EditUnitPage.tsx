import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

import {
  useUnit,
} from '../../hooks/useUnits'

import {
  useUpdateUnit,
} from '../../hooks/useUnitMutations'


export default function EditUnitPage() {
  const {
    unitId,
  } = useParams()

  const navigate = useNavigate()

  const {
    data: unit,
    isLoading,
    error,
  } = useUnit(unitId ?? '')


  const updateMutation =
    useUpdateUnit()


  const [form, setForm] = useState({
    unitNumber: '',
    buildingName: '',
    floor: '',
    bedrooms: '',
    bathrooms: '',
    rentAmount: '',
    deposit: '',
    serviceCharge: '',
  })


  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        Loading unit...
      </div>
    )
  }


  if (error || !unit) {
    return (
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">
          Unable to load unit
        </h2>

        <Link
          to="/dashboard/properties"
          className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Back
        </Link>
      </div>
    )
  }


  const submit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault()

    await updateMutation.mutateAsync({
      id: unit.id,

      payload: {
        unitNumber:
          form.unitNumber || unit.unit_number,

        buildingName:
          form.buildingName || unit.building_name || undefined,

        floor:
          form.floor
            ? Number(form.floor)
            : undefined,

        bedrooms:
          form.bedrooms
            ? Number(form.bedrooms)
            : undefined,

        bathrooms:
          form.bathrooms
            ? Number(form.bathrooms)
            : undefined,

        rentAmount:
          form.rentAmount
            ? Number(form.rentAmount)
            : undefined,

        deposit:
          form.deposit
            ? Number(form.deposit)
            : undefined,

        serviceCharge:
          form.serviceCharge
            ? Number(form.serviceCharge)
            : undefined,
      },
    })


    navigate(
      `/dashboard/units/${unit.id}`,
    )
  }


  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Edit Unit
        </h1>

        <p className="mt-2 text-slate-600">
          Update unit information.
        </p>
      </div>


      <form
        onSubmit={submit}
        className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
      >

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">


          <input
            placeholder={unit.unit_number}
            value={form.unitNumber}
            onChange={(e) =>
              setForm({
                ...form,
                unitNumber: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />


          <input
            placeholder={unit.building_name ?? 'Building name'}
            value={form.buildingName}
            onChange={(e) =>
              setForm({
                ...form,
                buildingName: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />


          <input
            placeholder="Floor"
            type="number"
            value={form.floor}
            onChange={(e) =>
              setForm({
                ...form,
                floor: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />


          <input
            placeholder="Bedrooms"
            type="number"
            value={form.bedrooms}
            onChange={(e) =>
              setForm({
                ...form,
                bedrooms: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />


          <input
            placeholder="Bathrooms"
            type="number"
            value={form.bathrooms}
            onChange={(e) =>
              setForm({
                ...form,
                bathrooms: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />


          <input
            placeholder="Rent amount"
            type="number"
            value={form.rentAmount}
            onChange={(e) =>
              setForm({
                ...form,
                rentAmount: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />


          <input
            placeholder="Deposit"
            type="number"
            value={form.deposit}
            onChange={(e) =>
              setForm({
                ...form,
                deposit: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />


          <input
            placeholder="Service charge"
            type="number"
            value={form.serviceCharge}
            onChange={(e) =>
              setForm({
                ...form,
                serviceCharge: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

        </div>


        <div className="flex gap-3">

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="rounded-lg bg-slate-900 px-5 py-2 text-white"
          >
            {updateMutation.isPending
              ? 'Saving...'
              : 'Save Changes'}
          </button>


          <Link
            to={`/dashboard/units/${unit.id}`}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </Link>

        </div>

      </form>

    </div>
  )
}