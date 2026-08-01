import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  createProperty,
  updateProperty,
  deleteProperty,
  type CreatePropertyPayload,
  type UpdatePropertyPayload,
} from '../services/properties.service'

import { propertyKeys } from './useProperties'

export function useCreateProperty() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      payload: CreatePropertyPayload,
    ) => createProperty(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: propertyKeys.all,
      })
    },
  })
}

export function useUpdateProperty() {
  const queryClient = useQueryClient()

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

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: propertyKeys.all,
      })

      queryClient.invalidateQueries({
        queryKey: propertyKeys.detail(
          variables.id,
        ),
      })
    },
  })
}

export function useDeleteProperty() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      deleteProperty(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: propertyKeys.all,
      })
    },
  })
}