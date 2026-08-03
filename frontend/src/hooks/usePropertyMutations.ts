import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'


import {
  createProperty,
  updateProperty,
  deleteProperty,
  archiveProperty,
  restoreProperty,

  type CreatePropertyPayload,
  type UpdatePropertyPayload,

} from '../services/properties.service'


import {
  propertyKeys,
} from './useProperties'



export function useCreateProperty() {

  const queryClient =
    useQueryClient()


  return useMutation({

    mutationFn: (
      payload: CreatePropertyPayload,
    ) =>
      createProperty(
        payload,
      ),


    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey:
          propertyKeys.all,

      })

    },

  })

}



export function useUpdateProperty() {

  const queryClient =
    useQueryClient()


  return useMutation({

    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: UpdatePropertyPayload
    }) =>
      updateProperty(
        id,
        payload,
      ),


    onSuccess: (
      _,
      variables,
    ) => {

      queryClient.invalidateQueries({

        queryKey:
          propertyKeys.all,

      })


      queryClient.invalidateQueries({

        queryKey:
          propertyKeys.detail(
            variables.id,
          ),

      })

    },

  })

}
export function useDeleteProperty() {

  const queryClient =
    useQueryClient()


  return useMutation({

    mutationFn: (
      id: string,
    ) =>
      deleteProperty(
        id,
      ),


    onSuccess: (
      _,
      id,
    ) => {

      queryClient.invalidateQueries({

        queryKey:
          propertyKeys.all,

      })


      queryClient.removeQueries({

        queryKey:
          propertyKeys.detail(
            id,
          ),

      })

    },

  })

}



export function useArchiveProperty() {

  const queryClient =
    useQueryClient()


  return useMutation({

    mutationFn: (
      id: string,
    ) =>
      archiveProperty(
        id,
      ),


    onSuccess: (
      data,
    ) => {

      queryClient.invalidateQueries({

        queryKey:
          propertyKeys.all,

      })


      queryClient.invalidateQueries({

        queryKey:
          propertyKeys.detail(
            data.id,
          ),

      })

    },

  })

}



export function useRestoreProperty() {

  const queryClient =
    useQueryClient()


  return useMutation({

    mutationFn: (
      id: string,
    ) =>
      restoreProperty(
        id,
      ),


    onSuccess: (
      data,
    ) => {

      queryClient.invalidateQueries({

        queryKey:
          propertyKeys.all,

      })


      queryClient.invalidateQueries({

        queryKey:
          propertyKeys.detail(
            data.id,
          ),

      })

    },

  })

}