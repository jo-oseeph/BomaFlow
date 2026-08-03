/**
 * BomaFlow
 * Frontend Service
 * File: properties.service.ts
 *
 * Purpose:
 * Handles communication between the frontend
 * and the backend Properties API.
 */

import api from './api'


export interface Property {
  id: string
  org_id: string | null
  landlord_id: string

  name: string
  type: string | null
  description: string | null

  county: string | null
  constituency: string | null
  ward: string | null
  town: string | null
  estate: string | null
  address: string | null

  lat: number | null
  lng: number | null

  year_built: number | null
  total_units: number

  status: string

  verification_score: string
  trust_score: string
  trust_factors: unknown
  metadata: unknown

  created_at: string
  updated_at: string
}


export interface CreatePropertyPayload {
  name: string

  type?: string
  description?: string

  county?: string
  constituency?: string
  ward?: string
  town?: string
  estate?: string
  address?: string

  lat?: number
  lng?: number

  yearBuilt?: number
  totalUnits?: number
}


export interface UpdatePropertyPayload
  extends Partial<CreatePropertyPayload> {
  status?: 'draft' | 'active' | 'inactive' | 'archived'
}


interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}


export async function getProperties() {

  const response =
    await api.get<ApiResponse<Property[]>>(
      '/properties',
    )

  return response.data.data
}


export async function getProperty(
  id: string,
) {

  const response =
    await api.get<ApiResponse<Property>>(
      `/properties/${id}`,
    )

  return response.data.data
}


export async function createProperty(
  payload: CreatePropertyPayload,
) {

  const response =
    await api.post<ApiResponse<Property>>(
      '/properties',
      payload,
    )

  return response.data.data
}


export async function updateProperty(
  id: string,
  payload: UpdatePropertyPayload,
) {

  const response =
    await api.put<ApiResponse<Property>>(
      `/properties/${id}`,
      payload,
    )

  return response.data.data
}
export async function deleteProperty(
  id: string,
) {

  const response =
    await api.delete<ApiResponse<void>>(
      `/properties/${id}`,
    )

  return response.data
}


export async function archiveProperty(
  id: string,
) {

  const response =
    await api.patch<ApiResponse<Property>>(
      `/properties/${id}/archive`,
    )

  return response.data.data
}


export async function restoreProperty(
  id: string,
) {

  const response =
    await api.patch<ApiResponse<Property>>(
      `/properties/${id}/restore`,
    )

  return response.data.data
}