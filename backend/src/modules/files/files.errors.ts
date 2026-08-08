/**
 * BomaFlow
 * Module: Files
 * File: files.errors.ts
 *
 * Purpose:
 * Custom errors related to file operations.
 */


export class FileNotFoundError extends Error {

  constructor(
    message = 'File not found',
  ) {

    super(message)

    this.name =
      'FileNotFoundError'

  }

}



export class FileCreationError extends Error {

  constructor(
    message = 'Failed to create file',
  ) {

    super(message)

    this.name =
      'FileCreationError'

  }

}



export class FileDeleteError extends Error {

  constructor(
    message = 'Failed to delete file',
  ) {

    super(message)

    this.name =
      'FileDeleteError'

  }

}