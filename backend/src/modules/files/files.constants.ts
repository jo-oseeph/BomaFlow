/**
 * BomaFlow
 * Module: Files
 * File: files.constants.ts
 */

export const FILE_ENTITY_TYPES = [
  'property',
  'unit',
  'lease',
  'tenant',
  'payment',
  'invoice',
  'maintenance',
  'user',
] as const


export const FILE_PURPOSES = [
  'image',
  'document',
  'agreement',
  'receipt',
  'identity',
  'attachment',
] as const


export const FILE_UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024,

  ALLOWED_MIME_TYPES: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
  ],
} as const