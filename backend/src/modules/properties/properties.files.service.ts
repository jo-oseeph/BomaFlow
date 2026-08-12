/**
 * BomaFlow
 * Module: Properties
 * File: properties.files.service.ts
 *
 * Purpose:
 * Handles property-specific file operations while enforcing
 * property ownership through the authenticated landlord.
 */

import {
  uploadAndCreateFileService,
  getFilesByEntityService,
  deleteFileService,
} from '../files/files.service.js'

import {
  createSignedUrlForStorageFile,
} from '../../services/storage.service.js'

import {
  findPropertyByIdForLandlord,
} from './properties.repository.js'

import {
  PropertyNotFoundError,
} from './properties.errors.js'

type PropertyFilePurpose =
  | 'image'
  | 'document'
  | 'agreement'
  | 'attachment'

interface UploadPropertyFileData {
  buffer: Buffer
  contentType: string
  mime: string
  size: number
  purpose?: PropertyFilePurpose
  sortOrder?: number
  isPublic?: boolean
  metadata?: Record<string, unknown>
}

const getFileExtension = (
  mime: string,
) => {
  switch (mime) {
    case 'image/jpeg':
      return 'jpg'

    case 'image/png':
      return 'png'

    case 'image/webp':
      return 'webp'

    case 'application/pdf':
      return 'pdf'

    default:
      return 'bin'
  }
}

const getPropertyFileBucket = (
  purpose: PropertyFilePurpose,
) => {
  switch (purpose) {
    case 'image':
      return 'property-images'

    case 'document':
      return 'property-documents'

    case 'agreement':
      return 'property-documents'

    case 'attachment':
      return 'property-documents'

    default:
      return 'property-documents'
  }
}

export const uploadPropertyFileService = async (
  propertyId: string,
  landlordId: string,
  data: UploadPropertyFileData,
) => {
  const property =
    await findPropertyByIdForLandlord(
      propertyId,
      landlordId,
    )

  if (!property) {
    throw new PropertyNotFoundError()
  }

  const purpose =
    data.purpose ?? 'image'

  const extension =
    getFileExtension(
      data.mime,
    )

  const bucket =
    getPropertyFileBucket(
      purpose,
    )

  const path =
    `properties/${propertyId}/${purpose}/${crypto.randomUUID()}.${extension}`

  return uploadAndCreateFileService({
    entityType: 'property',
    entityId: propertyId,
    purpose,
    bucket,
    path,
    mime: data.mime,
    size: data.size,

    ...(data.sortOrder !== undefined && {
      sortOrder: data.sortOrder,
    }),

    isPublic:
      data.isPublic ?? false,

    ...(data.metadata !== undefined && {
      metadata: data.metadata,
    }),

    buffer: data.buffer,
    contentType: data.contentType,
  })
}

export const getPropertyFilesService = async (
  propertyId: string,
  landlordId: string,
) => {
  const property =
    await findPropertyByIdForLandlord(
      propertyId,
      landlordId,
    )

  if (!property) {
    throw new PropertyNotFoundError()
  }

  const files =
    await getFilesByEntityService(
      'property',
      propertyId,
    )

  return Promise.all(
    files.map(
      async (file) => ({
        ...file,
        url:
          await createSignedUrlForStorageFile(
            file.bucket,
            file.path,
          ),
      }),
    ),
  )
}

export const deletePropertyFileService = async (
  propertyId: string,
  fileId: string,
  landlordId: string,
) => {
  const property =
    await findPropertyByIdForLandlord(
      propertyId,
      landlordId,
    )

  if (!property) {
    throw new PropertyNotFoundError()
  }

  const files =
    await getFilesByEntityService(
      'property',
      propertyId,
    )

  const fileBelongsToProperty =
    files.some(
      (file) =>
        file.id === fileId,
    )

  if (!fileBelongsToProperty) {
    throw new PropertyNotFoundError()
  }

  return deleteFileService(
    fileId,
  )
}