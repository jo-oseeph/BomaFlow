import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateUnit } from '../../hooks/useUnitMutations'


const unitSchema = z.object({

  buildingName:
    z.string().optional(),

  floor:
    z.number().optional(),

  unitNumber:
    z.string()
      .min(
        1,
        'Unit number is required',
      ),


  bedrooms:
    z.number()
      .min(0)
      .optional(),


  bathrooms:
    z.number()
      .min(0)
      .optional(),


  sizeSqm:
    z.number()
      .min(0)
      .optional(),


  rentAmount:
    z.number()
      .min(
        0,
        'Rent amount is required',
      ),


  deposit:
    z.number()
      .min(0)
      .optional(),


  serviceCharge:
    z.number()
      .min(0)
      .optional(),


  status:
    z.enum([
      'vacant',
      'occupied',
      'reserved',
      'maintenance',
    ]),


})


type UnitForm =
  z.infer<typeof unitSchema>



export default function AddUnitPage() {

  const navigate =
    useNavigate()


  const { propertyId } =
    useParams()



  const createUnit =
    useCreateUnit()



  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<UnitForm>({

      defaultValues: {

        buildingName: '',

        floor: undefined,

        unitNumber: '',

        bedrooms: 0,

        bathrooms: 0,

        sizeSqm: 0,

        rentAmount: 0,

        deposit: 0,

        serviceCharge: 0,

        status: 'vacant',

      },

    })




  async function onSubmit(
    values: UnitForm,
  ) {


    const parsed =
      unitSchema.safeParse(
        values,
      )


    if (!parsed.success) {


      for (
        const issue of parsed.error.issues
      ) {


        const field =
          issue.path[0]


        if (
          typeof field === 'string'
        ) {

          setError(
            field as keyof UnitForm,
            {
              message:
                issue.message,
            },
          )

        }

      }


      return

    }



    try {


      await createUnit.mutateAsync({

        propertyId:
          propertyId ?? '',


        ...parsed.data,

      })



      navigate(
        `/dashboard/properties/${propertyId}/units`,
      )


    } catch(error) {


      alert(
        error instanceof Error
          ? error.message
          : 'Failed to create unit.',
      )


    }


  }




  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Add Unit
        </h1>


        <p className="mt-1 text-sm text-slate-600">
          Create a new rental unit.
        </p>


      </div>



      <div className="rounded-xl border bg-white p-6 shadow-sm">


        <form
          onSubmit={
            handleSubmit(onSubmit)
          }
          className="space-y-6"
          noValidate
        >


          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


            <div>

              <label className="mb-1 block text-sm font-medium">
                Unit Number
              </label>


              <input
                className="w-full rounded-lg border px-3 py-2"
                placeholder="A101"
                {...register(
                  'unitNumber',
                )}
              />


              {
                errors.unitNumber && (

                  <p className="mt-1 text-sm text-red-600">
                    {errors.unitNumber.message}
                  </p>

                )
              }


            </div>



            <div>

              <label className="mb-1 block text-sm font-medium">
                Building Name
              </label>


              <input
                className="w-full rounded-lg border px-3 py-2"
                placeholder="Block A"
                {...register(
                  'buildingName',
                )}
              />


            </div>




            <div>

              <label className="mb-1 block text-sm font-medium">
                Floor
              </label>


              <input
                type="number"
                className="w-full rounded-lg border px-3 py-2"
                {...register(
                  'floor',
                  {
                    valueAsNumber: true,
                  },
                )}
              />

            </div>



            <div>

              <label className="mb-1 block text-sm font-medium">
                Bedrooms
              </label>


              <input
                type="number"
                className="w-full rounded-lg border px-3 py-2"
                {...register(
                  'bedrooms',
                  {
                    valueAsNumber: true,
                  },
                )}
              />

            </div>



            <div>

              <label className="mb-1 block text-sm font-medium">
                Bathrooms
              </label>


              <input
                type="number"
                className="w-full rounded-lg border px-3 py-2"
                {...register(
                  'bathrooms',
                  {
                    valueAsNumber: true,
                  },
                )}
              />

            </div>



            <div>

              <label className="mb-1 block text-sm font-medium">
                Size (sqm)
              </label>


              <input
                type="number"
                className="w-full rounded-lg border px-3 py-2"
                {...register(
                  'sizeSqm',
                  {
                    valueAsNumber: true,
                  },
                )}
              />

            </div>



            <div>

              <label className="mb-1 block text-sm font-medium">
                Monthly Rent
              </label>


              <input
                type="number"
                className="w-full rounded-lg border px-3 py-2"
                {...register(
                  'rentAmount',
                  {
                    valueAsNumber: true,
                  },
                )}
              />


            </div>



            <div>

              <label className="mb-1 block text-sm font-medium">
                Deposit
              </label>


              <input
                type="number"
                className="w-full rounded-lg border px-3 py-2"
                {...register(
                  'deposit',
                  {
                    valueAsNumber: true,
                  },
                )}
              />


            </div>



            <div>

              <label className="mb-1 block text-sm font-medium">
                Service Charge
              </label>


              <input
                type="number"
                className="w-full rounded-lg border px-3 py-2"
                {...register(
                  'serviceCharge',
                  {
                    valueAsNumber: true,
                  },
                )}
              />


            </div>



            <div>

              <label className="mb-1 block text-sm font-medium">
                Status
              </label>


              <select
                className="w-full rounded-lg border px-3 py-2"
                {...register(
                  'status',
                )}
              >

                <option value="vacant">
                  Vacant
                </option>

                <option value="occupied">
                  Occupied
                </option>

                <option value="reserved">
                  Reserved
                </option>

                <option value="maintenance">
                  Maintenance
                </option>


              </select>


            </div>


          </div>



          <button
            type="submit"
            disabled={
              isSubmitting ||
              createUnit.isPending
            }
            className="rounded-lg bg-slate-900 px-6 py-2 text-white disabled:opacity-50"
          >

            {
              createUnit.isPending
                ? 'Saving Unit...'
                : 'Save Unit'
            }

          </button>


        </form>


      </div>


    </div>

  )

}