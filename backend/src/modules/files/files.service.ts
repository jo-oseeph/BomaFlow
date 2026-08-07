/**
 * BomaFlow
 * Module: Files
 * File: files.service.ts
 *
 * Purpose:
 * Contains business logic related to files.
 */

import {
  createFile,
  findFilesByEntity,
  findFileById,
  deleteFile,
} from './files.repository.js'

import {
  FileCreationError,
  FileDeleteError,
  FileNotFoundError,
} from './files.errors.js'

import {
  uploadFileToStorage,
  deleteFileFromStorage,
} from '../../services/storage.service.js'

import type {
  CreateFileInput,
} from './files.types.js'


export const uploadAndCreateFileService = async (
  data: CreateFileInput & {
    buffer: Buffer
    contentType: string
  },
) => {

  try {

    await uploadFileToStorage(
      data.bucket,
      data.path,
      data.buffer,
      data.contentType,
    )


    return await createFile({

      ...(data.ownerId !== undefined && {
        ownerId: data.ownerId,
      }),

      entityType:
        data.entityType,

      ...(data.entityId !== undefined && {
        entityId: data.entityId,
      }),

      ...(data.purpose !== undefined && {
        purpose: data.purpose,
      }),

      bucket:
        data.bucket,

      path:
        data.path,

      ...(data.mime !== undefined && {
        mime: data.mime,
      }),

      ...(data.size !== undefined && {
        size: data.size,
      }),

      ...(data.checksum !== undefined && {
        checksum: data.checksum,
      }),

      ...(data.sortOrder !== undefined && {
        sortOrder: data.sortOrder,
      }),

      ...(data.isPublic !== undefined && {
        isPublic: data.isPublic,
      }),

      ...(data.metadata !== undefined && {
        metadata: data.metadata,
      }),

    })


  } catch (error) {

    throw new FileCreationError(
      error instanceof Error
        ? error.message
        : undefined,
    )

  }

}



export const createFileService = async (
  data: CreateFileInput,
) => {

  try {

    return await createFile(data)

  } catch (error) {

    throw new FileCreationError(
      error instanceof Error
        ? error.message
        : undefined,
    )

  }

}



export const getFilesByEntityService = async (
  entityType: string,
  entityId: string,
) => {

  return findFilesByEntity(
    entityType,
    entityId,
  )

}



export const getFileByIdService = async (
  id: string,
) => {

  const file =
    await findFileById(id)


  if (!file) {

    throw new FileNotFoundError()

  }


  return file

}



export const deleteFileService = async (
  id: string,
) => {

  const existingFile =
    await findFileById(id)


  if (!existingFile) {

    throw new FileNotFoundError()

  }


  try {

    await deleteFileFromStorage(
      existingFile.bucket,
      existingFile.path,
    )


    return await deleteFile(id)

  } catch (error) {

    throw new FileDeleteError(
      error instanceof Error
        ? error.message
        : undefined,
    )

  }

}