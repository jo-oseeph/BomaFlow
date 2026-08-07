/**
 * BomaFlow
 * Middleware
 * File: upload.ts
 *
 * Purpose:
 * Handles multipart file uploads.
 */

import multer from 'multer'

import {
  FILE_UPLOAD_LIMITS,
} from '../modules/files/files.constants.js'


const storage =
  multer.memoryStorage()


const allowedMimeTypes =
  [...FILE_UPLOAD_LIMITS.ALLOWED_MIME_TYPES] as string[]


export const upload =
  multer({

    storage,

    limits: {
      fileSize:
        FILE_UPLOAD_LIMITS.MAX_FILE_SIZE,
    },

    fileFilter: (
      _req,
      file,
      callback,
    ) => {

      if (
        allowedMimeTypes.includes(
          file.mimetype,
        )
      ) {

        callback(
          null,
          true,
        )

        return
      }

      callback(
        new Error(
          'Unsupported file type',
        ),
      )
    },

  })