/**
 * BomaFlow
 * Module: Files
 * File: files.schema.ts
 */

import { z } from 'zod'

import {
  FILE_ENTITY_TYPES,
  FILE_PURPOSES,
} from './files.constants.js'


export const createFileSchema =
  z.object({

    ownerId:
      z.string()
        .uuid()
        .optional(),

    entityType:
      z.enum(FILE_ENTITY_TYPES),

    entityId:
      z.string()
        .uuid()
        .optional(),

    purpose:
      z.enum(FILE_PURPOSES)
        .optional(),

    bucket:
      z.string()
        .min(1),

    path:
      z.string()
        .min(1),

    mime:
      z.string()
        .optional(),

    size:
      z.number()
        .int()
        .min(0)
        .optional(),

    checksum:
      z.string()
        .optional(),

    sortOrder:
      z.number()
        .int()
        .min(0)
        .optional(),

    isPublic:
      z.boolean()
        .optional(),

    metadata:
      z.record(
        z.string(),
        z.unknown(),
      )
      .optional(),

  })


export const updateFileSchema =
  createFileSchema
    .partial()