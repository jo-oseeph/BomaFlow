/**
 * BomaFlow
 * Module: Properties
 * File: properties.errors.ts
 */


export class PropertyError extends Error {
  statusCode: number

  constructor(
    message: string,
    statusCode = 400,
  ) {
    super(message)

    this.name = 'PropertyError'
    this.statusCode = statusCode
  }
}


export class PropertyNotFoundError extends PropertyError {
  constructor() {
    super('Property not found', 404)

    this.name = 'PropertyNotFoundError'
  }
}


export class PropertyCreationError extends PropertyError {
  constructor(
    message = 'Property creation failed',
  ) {
    super(message, 400)

    this.name = 'PropertyCreationError'
  }
}


export class PropertyUpdateError extends PropertyError {
  constructor(
    message = 'Property update failed',
  ) {
    super(message, 400)

    this.name = 'PropertyUpdateError'
  }
}


export class PropertyDeleteError extends PropertyError {
  constructor(
    message = 'Property deletion failed',
  ) {
    super(message, 400)

    this.name = 'PropertyDeleteError'
  }
}