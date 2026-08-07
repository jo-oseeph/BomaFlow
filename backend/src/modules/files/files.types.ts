/**
 * BomaFlow
 * Module: Files
 * File: files.types.ts
 */

import type {
  FILE_ENTITY_TYPES,
  FILE_PURPOSES,
} from './files.constants.js'

export type FileEntityType =
  (typeof FILE_ENTITY_TYPES)[number]

export type FilePurpose =
  (typeof FILE_PURPOSES)[number]


export interface CreateFileInput {
  ownerId?: string | null

  entityType: FileEntityType

  entityId?: string | null

  purpose?: FilePurpose | null

  bucket: string

  path: string

  mime?: string | null

  size?: number | null

  checksum?: string | null

  sortOrder?: number

  isPublic?: boolean

  metadata?: Record<string, unknown> | null
}


export interface FileResponse {
  id: string

  owner_id: string | null

  entity_type: string

  entity_id: string | null

  purpose: string | null

  bucket: string

  path: string

  mime: string | null

  size: number | null

  checksum: string | null

  sort_order: number

  is_public: boolean

  metadata: unknown

  created_at: Date
}