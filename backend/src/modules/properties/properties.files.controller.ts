/**
 * BomaFlow
 * Module: Properties
 * File: properties.files.controller.ts
 *
 * Purpose:
 * Handles HTTP requests for property file operations.
 */

import type { RequestHandler } from 'express'

import {
  deletePropertyFileService,
  getPropertyFilesService,
  uploadPropertyFileService,
} from './properties.files.service.js'

export const uploadPropertyFileController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const propertyId = req.params.id

    if (
      typeof propertyId !== 'string' ||
      !propertyId
    ) {
      res.status(400).json({
        success: false,
        message: 'Invalid property id',
      })

      return
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No file uploaded',
      })

      return
    }

    const purpose =
      typeof req.body.purpose === 'string'
        ? req.body.purpose
        : undefined

    const sortOrder =
      typeof req.body.sortOrder === 'string'
        ? Number(req.body.sortOrder)
        : undefined

    const isPublic =
      typeof req.body.isPublic === 'string'
        ? req.body.isPublic === 'true'
        : undefined

    const file =
      await uploadPropertyFileService(
        propertyId,
        req.user!.id,
        {
          buffer: req.file.buffer,
          contentType: req.file.mimetype,
          mime: req.file.mimetype,
          size: req.file.size,
          ...(purpose !== undefined && {
            purpose: purpose as
              | 'image'
              | 'document'
              | 'agreement'
              | 'attachment',
          }),
          ...(sortOrder !== undefined &&
            Number.isInteger(sortOrder) &&
            sortOrder >= 0 && {
              sortOrder,
            }),
          ...(isPublic !== undefined && {
            isPublic,
          }),
        },
      )

    res.status(201).json({
      success: true,
      message: 'Property file uploaded successfully',
      data: file,
    })
  } catch (error) {
    next(error)
  }
}

export const getPropertyFilesController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const propertyId = req.params.id

    if (
      typeof propertyId !== 'string' ||
      !propertyId
    ) {
      res.status(400).json({
        success: false,
        message: 'Invalid property id',
      })

      return
    }

    const files =
      await getPropertyFilesService(
        propertyId,
        req.user!.id,
      )

    res.status(200).json({
      success: true,
      data: files,
    })
  } catch (error) {
    next(error)
  }
}

export const deletePropertyFileController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const propertyId = req.params.id
    const fileId = req.params.fileId

    if (
      typeof propertyId !== 'string' ||
      !propertyId ||
      typeof fileId !== 'string' ||
      !fileId
    ) {
      res.status(400).json({
        success: false,
        message: 'Invalid property or file id',
      })

      return
    }

    await deletePropertyFileService(
      propertyId,
      fileId,
      req.user!.id,
    )

    res.status(200).json({
      success: true,
      message: 'Property file deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
