/**
 * BomaFlow
 * Module: Files
 * File: files.controller.ts
 */

import type { RequestHandler } from 'express'

import {
  uploadAndCreateFileService,
  deleteFileService,
  getFileByIdService,
  getFilesByEntityService,
} from './files.service.js'


export const createFileController: RequestHandler = async (
  req,
  res,
  next,
) => {

  try {

    if (!req.file) {

      res.status(400).json({
        success: false,
        message: 'No file uploaded',
      })

      return
    }


    const file =
      await uploadAndCreateFileService({

        ...req.body,

        buffer:
          req.file.buffer,

        contentType:
          req.file.mimetype,

        mime:
          req.file.mimetype,

        size:
          req.file.size,

      })


    res.status(201).json({

      success: true,

      message:
        'File uploaded successfully',

      data:
        file,

    })


  } catch (error) {

    next(error)

  }

}



export const getFilesByEntityController: RequestHandler =
async (
  req,
  res,
  next,
) => {

  try {

    const {
      entityType,
      entityId,
    } = req.params


    if (
      typeof entityType !== 'string' ||
      typeof entityId !== 'string'
    ) {

      res.status(400).json({

        success: false,

        message:
          'Invalid route parameters',

      })

      return

    }


    const files =
      await getFilesByEntityService(
        entityType,
        entityId,
      )


    res.status(200).json({

      success: true,

      data:
        files,

    })


  } catch (error) {

    next(error)

  }

}



export const getFileByIdController: RequestHandler =
async (
  req,
  res,
  next,
) => {

  try {

    const {
      id,
    } = req.params


    if (
      typeof id !== 'string'
    ) {

      res.status(400).json({

        success: false,

        message:
          'Invalid file ID',

      })

      return

    }


    const file =
      await getFileByIdService(id)


    res.status(200).json({

      success: true,

      data:
        file,

    })


  } catch (error) {

    next(error)

  }

}



export const deleteFileController: RequestHandler =
async (
  req,
  res,
  next,
) => {

  try {

    const {
      id,
    } = req.params


    if (
      typeof id !== 'string'
    ) {

      res.status(400).json({

        success: false,

        message:
          'Invalid file ID',

      })

      return

    }


    await deleteFileService(id)


    res.status(200).json({

      success: true,

      message:
        'File deleted successfully',

    })


  } catch (error) {

    next(error)

  }

}