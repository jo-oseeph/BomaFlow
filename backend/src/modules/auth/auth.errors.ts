/**
 * BomaFlow
 * Module: Authentication
 * File: auth.errors.ts
 */

export class AuthError extends Error {
  statusCode: number

  constructor(
    message: string,
    statusCode = 401,
  ) {
    super(message)

    this.name = 'AuthError'
    this.statusCode = statusCode
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super('Invalid email or password', 401)

    this.name = 'InvalidCredentialsError'
  }
}

export class UserCreationError extends AuthError {
  constructor(message = 'User creation failed') {
    super(message, 400)

    this.name = 'UserCreationError'
  }
}

export class UnauthorizedError extends AuthError {
  constructor() {
    super('Unauthorized access', 401)

    this.name = 'UnauthorizedError'
  }
}