/**
 * BomaFlow
 * Module: Files
 * File: files.repository.ts
 *
 * Purpose:
 * Handles all database operations related to files.
 */

import { Prisma } from '@prisma/client'

import { prisma } from '../../config/prisma.js'

import type {
  CreateFileInput,
} from './files.types.js'



export const createFile = async (
  data: CreateFileInput,
) => {

  return prisma.files.create({

    data: {

      owner_id:
        data.ownerId ?? null,

      entity_type:
        data.entityType,

      entity_id:
        data.entityId ?? null,

      purpose:
        data.purpose ?? null,

      bucket:
        data.bucket,

      path:
        data.path,

      mime:
        data.mime ?? null,

      size:
        data.size ?? null,

      checksum:
        data.checksum ?? null,

      sort_order:
        data.sortOrder ?? 0,

      is_public:
        data.isPublic ?? false,

      metadata:
        data.metadata
          ? (data.metadata as Prisma.InputJsonValue)
          : Prisma.JsonNull,

    },

  })

}



export const findFilesByEntity = async (
  entityType: string,
  entityId: string,
) => {

  return prisma.files.findMany({

    where: {

      entity_type:
        entityType,

      entity_id:
        entityId,

    },

    orderBy: {

      sort_order:
        'asc',

    },

  })

}



export const findFileById = async (
  id: string,
) => {

  return prisma.files.findUnique({

    where: {

      id,

    },

  })

}



export const deleteFile = async (
  id: string,
) => {

  return prisma.files.delete({

    where: {

      id,

    },

  })

}