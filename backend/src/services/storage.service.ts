/**
 * BomaFlow
 * Service: Storage
 * File: storage.service.ts
 *
 * Purpose:
 * Handles file uploads and deletions in Supabase Storage.
 */

import {
  supabaseAdmin,
} from '../config/supabase.js'


export const uploadFileToStorage = async (
  bucket: string,
  path: string,
  file: Buffer,
  contentType: string,
) => {

  const {
    error,
  } =
    await supabaseAdmin
      .storage
      .from(bucket)
      .upload(
        path,
        file,
        {
          contentType,
          upsert: false,
        },
      )

  if (error) {
    throw new Error(
      error.message,
    )
  }

  return {
    bucket,
    path,
  }
}


export const deleteFileFromStorage = async (
  bucket: string,
  path: string,
) => {

  const {
    error,
  } =
    await supabaseAdmin
      .storage
      .from(bucket)
      .remove([
        path,
      ])

  if (error) {
    throw new Error(
      error.message,
    )
  }

  return true
}