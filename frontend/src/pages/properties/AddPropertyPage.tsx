import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateProperty } from '../../hooks/usePropertyMutations'

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
    .number({
      invalid_type_error: 'Total units must be a number',
    })
    .min(0),

  yearBuilt: z.number().optional(),
})

type PropertyForm = z.infer<typeof propertySchema>

export default function AddPropertyPage() {
  const navigate = useNavigate()

  const createProperty = useCreateProperty()

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<PropertyForm>({
    defaultValues: {
      name: '',
      type: '',
      description: '',
      county: '',
      constituency: '',
      ward: '',
      town: '',
      estate: '',
      address: '',
      totalUnits: 0,
      yearBuilt: undefined,
    },
  })

  async function onSubmit(values: PropertyForm) {
    const parsed = propertySchema.safeParse(values)

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0]

        if (typeof field === 'string') {
          setError(field as keyof PropertyForm, {
            message: issue.message,
          })
        }
      }

      return
    }

    try {
      await createProperty.mutateAsync(parsed.data)

      navigate('/dashboard/properties')
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to create property.',
      )
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Add Property
        </h1>

        <p className="mt-1 text-sm text-slate-600">
          Create a new property in BomaFlow.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Property Name
              </label>

              <input
                type="text"
                placeholder="Greenview Apartments"
                className="w-full rounded-lg border px-3 py-2"
                {...register('name')}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Property Type
              </label>

              <input
                type="text"
                placeholder="Apartment"
                className="w-full rounded-lg border px-3 py-2"
                {...register('type')}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                County
              </label>

              <input
                type="text"
                placeholder="Nairobi"
                className="w-full rounded-lg border px-3 py-2"
                {...register('county')}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Town / City
              </label>

              <input
                type="text"
                placeholder="Westlands"
                className="w-full rounded-lg border px-3 py-2"
                {...register('town')}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Estate
              </label>

              <input
                type="text"
                placeholder="Kilimani"
                className="w-full rounded-lg border px-3 py-2"
                {...register('estate')}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Address
              </label>

              <input
                type="text"
                placeholder="Kindaruma Road"
                className="w-full rounded-lg border px-3 py-2"
                {...register('address')}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Total Units
              </label>

              <input
                type="number"
                className="w-full rounded-lg border px-3 py-2"
                {...register('totalUnits', {
                  valueAsNumber: true,
                })}
              />

              {errors.totalUnits && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.totalUnits.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Year Built
              </label>

              <input
                type="number"
                className="w-full rounded-lg border px-3 py-2"
                {...register('yearBuilt', {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Optional description..."
              className="w-full rounded-lg border px-3 py-2"
              {...register('description')}
            />
          </div>

          <button
            type="submit"
            disabled={
              isSubmitting ||
              createProperty.isPending
            }
            className="rounded-lg bg-slate-900 px-6 py-2 text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createProperty.isPending
              ? 'Saving Property...'
              : 'Save Property'}
          </button>
        </form>
      </div>
    </div>
  )
}