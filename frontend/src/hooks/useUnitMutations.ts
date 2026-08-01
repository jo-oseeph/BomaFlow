/**
 * BomaFlow
 * Hook: useUnitMutations.ts
 *
 * Purpose:
 * React Query mutations for unit CRUD operations.
 */


import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'


import {
  createUnit,
  updateUnit,
  deleteUnit,

  type CreateUnitPayload,
  type UpdateUnitPayload,

} from '../services/units.service'


import {
  unitKeys,
} from './useUnits'



export function useCreateUnit() {

  const queryClient =
    useQueryClient()


  return useMutation({

    mutationFn: (
      payload: CreateUnitPayload,
    ) =>
      createUnit(
        payload,
      ),


    onSuccess: (
      data,
    ) => {

      queryClient.invalidateQueries({

        queryKey:
          unitKeys.byProperty(
            data.property_id,
          ),

      })

    },

  })

}





export function useUpdateUnit() {

  const queryClient =
    useQueryClient()


  return useMutation({

    mutationFn: ({
      id,
      payload,
    }: {
      id: string

      payload: UpdateUnitPayload

    }) =>
      updateUnit(
        id,
        payload,
      ),



    onSuccess: (
      data,
      variables,
    ) => {


      queryClient.invalidateQueries({

        queryKey:
          unitKeys.byProperty(
            data.property_id,
          ),

      })


      queryClient.invalidateQueries({

        queryKey:
          unitKeys.detail(
            variables.id,
          ),

      })

    },

  })

}





export function useDeleteUnit() {

  const queryClient =
    useQueryClient()


  return useMutation({

    mutationFn: (
      id: string,
    ) =>
      deleteUnit(
        id,
      ),



    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey:
          unitKeys.all,

      })

    },

  })

}