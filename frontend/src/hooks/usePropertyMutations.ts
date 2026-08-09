import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  createProperty,
  updateProperty,
  deleteProperty,
  archiveProperty,
  restoreProperty,
  uploadPropertyFile,
  getPropertyFiles,
  deletePropertyFile,

  type CreatePropertyPayload,
  type UpdatePropertyPayload,
  type UploadPropertyFileOptions,
} from '../services/properties.service'

import {
  propertyKeys,
} from './useProperties'

export const propertyFileKeys = {
  all: ['property-files'] as const,

  list: (propertyId: string) =>
    [
      ...propertyFileKeys.all,
      propertyId,
    ] as const,
}

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

export function usePropertyFiles(
  propertyId: string,
) {
  return useQuery({
    queryKey:
      propertyFileKeys.list(
        propertyId,
      ),

    queryFn: () =>
      getPropertyFiles(
        propertyId,
      ),

    enabled:
      Boolean(propertyId),
  })
}

export function useUploadPropertyFile() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: ({
      propertyId,
      options,
    }: {
      propertyId: string
      options: UploadPropertyFileOptions
    }) =>
      uploadPropertyFile(
        propertyId,
        options,
      ),

    onSuccess: (
      _data,
      variables,
    ) => {
      queryClient.invalidateQueries({
        queryKey:
          propertyFileKeys.list(
            variables.propertyId,
          ),
      })
    },
  })
}

export function useDeletePropertyFile() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: ({
      propertyId,
      fileId,
    }: {
      propertyId: string
      fileId: string
    }) =>
      deletePropertyFile(
        propertyId,
        fileId,
      ),

    onSuccess: (
      _data,
      variables,
    ) => {
      queryClient.invalidateQueries({
        queryKey:
          propertyFileKeys.list(
            variables.propertyId,
          ),
      })
    },
  })
}