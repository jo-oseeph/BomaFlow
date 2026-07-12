export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      listings: {
        Row: {
          id: string
          unit_id: string
          title: string
          description: string | null
          rent: number
          deposit: number
          status: string
          published_at: string | null
          expires_at: string | null
          view_count: number
          rank_score: number
          metadata: Json | null
          created_at: string
          updated_at: string
        }
      }
      units: {
        Row: {
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
          status: string
          available_from: string | null
          features: Json | null
          created_at: string
          updated_at: string
        }
      }
      properties: {
        Row: {
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
          verification_score: number
          trust_score: number
          trust_factors: Json | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
      }
      files: {
        Row: {
          id: string
          owner_id: string | null
          entity_type: string
          entity_id: string | null
          purpose: string | null
          bucket: string
          path: string
          mime: string | null
          size: number | null
          checksum: string | null
          sort_order: number
          is_public: boolean
          metadata: Json | null
          created_at: string
        }
      }
    }
  }
}

export type DbListing = Database['public']['Tables']['listings']['Row']
export type DbUnit = Database['public']['Tables']['units']['Row']
export type DbProperty = Database['public']['Tables']['properties']['Row']
export type DbFile = Database['public']['Tables']['files']['Row']

export type ListingWithRelations = DbListing & {
  units: DbUnit & {
    properties: DbProperty
  }
}
