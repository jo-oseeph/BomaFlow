/**
 * BomaFlow
 * Frontend Service
 * File: units.service.ts
 *
 * Purpose:
 * Handles communication between frontend
 * and backend Units API.
 */

import api from './api'


export type UnitStatus =
  | 'vacant'
  | 'occupied'
  | 'reserved'
  | 'maintenance'


export interface Unit {
  id: string

  property_id: string

  building_name: string | null

  floor: number | null

  unit_number: string

  bedrooms: number | null

  bathrooms: number | null

  size_sqm: number | null

  rent_amount: number

  deposit: number

  service_charge: number

  status: UnitStatus

  available_from: string | null

  features: Record<string, unknown> | null

  created_at: string

  updated_at: string
}


export interface CreateUnitPayload {

  propertyId: string

  buildingName?: string

  floor?: number

  unitNumber: string

  bedrooms?: number

  bathrooms?: number

  sizeSqm?: number

  rentAmount: number

  deposit?: number

  serviceCharge?: number

  status?: UnitStatus

  availableFrom?: string

  features?: Record<string, unknown>
}


export interface UpdateUnitPayload
  extends Partial<Omit<CreateUnitPayload, 'propertyId'>> {}


interface ApiResponse<T> {
  success: boolean

  data: T

  message?: string
}



export async function getUnitsByProperty(
  propertyId: string,
) {

  const response =
    await api.get<ApiResponse<Unit[]>>(
      `/units/property/${propertyId}`,
    )


  return response.data.data
}



export async function getUnit(
  id: string,
) {

  const response =
    await api.get<ApiResponse<Unit>>(
      `/units/${id}`,
    )


  return response.data.data
}



export async function createUnit(
  payload: CreateUnitPayload,
) {

  const response =
    await api.post<ApiResponse<Unit>>(
      '/units',
      payload,
    )


  return response.data.data
}



export async function updateUnit(
  id: string,
  payload: UpdateUnitPayload,
) {

  const response =
    await api.put<ApiResponse<Unit>>(
      `/units/${id}`,
      payload,
    )


  return response.data.data
}



export async function deleteUnit(
  id: string,
) {

  const response =
    await api.delete<ApiResponse<void>>(
      `/units/${id}`,
    )


  return response.data
}