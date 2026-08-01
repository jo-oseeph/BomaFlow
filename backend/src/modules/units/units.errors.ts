/**
 * BomaFlow
 * Module: Units
 * File: units.errors.ts
 */


export class UnitError extends Error {
  statusCode: number

  constructor(
    message: string,
    statusCode = 400,
  ) {
    super(message)

    this.name = 'UnitError'
    this.statusCode = statusCode
  }
}


export class UnitNotFoundError extends UnitError {
  constructor() {
    super('Unit not found', 404)

    this.name = 'UnitNotFoundError'
  }
}


export class UnitCreationError extends UnitError {
  constructor(
    message = 'Unit creation failed',
  ) {
    super(message, 400)

    this.name = 'UnitCreationError'
  }
}


export class UnitUpdateError extends UnitError {
  constructor(
    message = 'Unit update failed',
  ) {
    super(message, 400)

    this.name = 'UnitUpdateError'
  }
}


export class UnitDeleteError extends UnitError {
  constructor(
    message = 'Unit deletion failed',
  ) {
    super(message, 400)

    this.name = 'UnitDeleteError'
  }
}