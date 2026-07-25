/**
 * BomaFlow
 * Module: Authentication
 * File: auth.controller.ts
 *
 * Purpose:
 * Handles HTTP requests and responses.
 */

import type { RequestHandler } from 'express'

import {
  getCurrentUser,
  login,
  signUp,
} from './auth.service.js'


export const signUpController: RequestHandler = async (
  req,
  res,
  next,
) => {

  try {

    const user = await signUp(
      req.body,
    )

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: user,
    })

  } catch (error) {

    next(error)

  }
}



export const loginController: RequestHandler = async (
  req,
  res,
  next,
) => {

  try {

    const session = await login(
      req.body,
    )

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: session,
    })

  } catch (error) {

    next(error)

  }
}



export const meController: RequestHandler = async (
  req,
  res,
  next,
) => {

  try {

    const authorization =
      req.headers.authorization


    if (!authorization?.startsWith('Bearer ')) {

      res.status(401).json({
        success: false,
        message: 'Unauthorized access',
      })

      return
    }


    const token =
      authorization.replace(
        'Bearer ',
        '',
      )


    const user =
      await getCurrentUser(token)


    res.status(200).json({
      success: true,
      data: user,
    })


  } catch (error) {

    next(error)

  }
}