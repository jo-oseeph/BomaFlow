export type PropertyStatus =
  | 'active'
  | 'inactive'

export interface Property {
  id: string
  name: string
  propertyCode: string

  address: string
  city: string
  county: string

  totalUnits: number
  occupiedUnits: number
  vacantUnits: number

  status: PropertyStatus

  createdAt: string
  updatedAt: string
}