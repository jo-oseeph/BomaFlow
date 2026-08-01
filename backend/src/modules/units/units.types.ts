/**
 * BomaFlow
 * Module: Units
 * File: units.types.ts
 */

export type UnitStatus =
  | 'vacant'
  | 'occupied'
  | 'reserved'
  | 'maintenance'


export interface CreateUnitInput {
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

  availableFrom?: Date

  features?: Record<string, unknown>
}


export interface UpdateUnitInput {
  buildingName?: string

  floor?: number

  unitNumber?: string

  bedrooms?: number

  bathrooms?: number

  sizeSqm?: number

  rentAmount?: number

  deposit?: number

  serviceCharge?: number

  status?: UnitStatus

  availableFrom?: Date

  features?: Record<string, unknown>
}


export interface UnitResponse {
  id: string

  propertyId: string

  buildingName?: string

  floor?: number

  unitNumber: string

  bedrooms?: number

  bathrooms?: number

  sizeSqm?: number

  rentAmount: number

  deposit: number

  serviceCharge: number

  status: UnitStatus

  availableFrom?: Date

  features?: Record<string, unknown>

  createdAt: Date

  updatedAt: Date
}