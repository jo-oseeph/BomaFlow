import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useProperty } from '../../hooks/useProperties'
import { useUpdateProperty } from '../../hooks/usePropertyMutations'


const propertySchema = z.object({
  name: z
    .string()
    .min(2, 'Property name must be at least 2 characters'),

  type: z.string().optional(),

  description: z.string().optional(),

  county: z.string().optional(),

  constituency: z.string().optional(),

  ward: z.string().optional(),

  town: z.string().optional(),

  estate: z.string().optional(),

  address: z.string().optional(),

  totalUnits: z
    .number()
    .min(0),

  yearBuilt: z
    .number()
    .optional(),
})


type PropertyForm = z.infer<typeof propertySchema>


export default function EditPropertyPage() {

  const navigate = useNavigate()

  const { propertyId } = useParams()


  const {
    data: property,
    isLoading,
  } = useProperty(propertyId ?? '')


  const updateProperty =
    useUpdateProperty()


  const {
    register,
    handleSubmit,
  } = useForm<PropertyForm>({
    values: property
      ? {
          name: property.name ?? '',
          type: property.type ?? '',
          description: property.description ?? '',
          county: property.county ?? '',
          constituency: property.constituency ?? '',
          ward: property.ward ?? '',
          town: property.town ?? '',
          estate: property.estate ?? '',
          address: property.address ?? '',
          totalUnits: property.total_units ?? 0,
          yearBuilt: property.year_built ?? undefined,
        }
      : undefined,
  })


  async function onSubmit(
    values: PropertyForm,
  ) {

    if (!propertyId) {
      return
    }


    const parsed =
      propertySchema.safeParse(values)


    if (!parsed.success) {
      return
    }


    await updateProperty.mutateAsync({
      id: propertyId,
      payload: parsed.data,
    })


    navigate(
      `/dashboard/properties/${propertyId}`,
    )
  }


  if (isLoading) {
    return (
      <div className="p-6">
        Loading property...
      </div>
    )
  }


  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Edit Property
        </h1>

        <p className="mt-1 text-sm text-slate-600">
          Update property information.
        </p>
      </div>


      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <form
          onSubmit={
            handleSubmit(onSubmit)
          }
          className="space-y-4"
        >


          {[
            ['name','Property Name'],
            ['type','Type'],
            ['county','County'],
            ['constituency','Constituency'],
            ['ward','Ward'],
            ['town','Town'],
            ['estate','Estate'],
            ['address','Address'],
          ].map(([field,label]) => (

            <div key={field}>

              <label className="mb-1 block text-sm font-medium text-slate-700">
                {label}
              </label>

              <input
                className="w-full rounded-lg border px-3 py-2"
                {...register(
                  field as keyof PropertyForm
                )}
              />

            </div>

          ))}


          <div>

            <label className="mb-1 block text-sm font-medium text-slate-700">
              Total Units
            </label>

            <input
              type="number"
              className="w-full rounded-lg border px-3 py-2"
              {...register(
                'totalUnits',
                {
                  valueAsNumber:true,
                }
              )}
            />

          </div>


          <div>

            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              className="w-full rounded-lg border px-3 py-2"
              {...register('description')}
            />

          </div>


          <button
            type="submit"
            disabled={updateProperty.isPending}
            className="rounded-lg bg-slate-900 px-5 py-2 text-white hover:bg-slate-800"
          >

            {
              updateProperty.isPending
              ? 'Saving...'
              : 'Save Changes'
            }

          </button>


        </form>

      </div>

    </div>
  )
}