import { supabase, isSupabaseConfigured } from './supabase'
import type { DbFile, ListingWithRelations } from '../types/database'
import {
  formatKES,
  type ListingCard,
  type SearchOptions,
} from '../types/listing'

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=280&fit=crop'

const LISTING_SELECT = `
  id,
  unit_id,
  title,
  description,
  rent,
  deposit,
  status,
  rank_score,
  view_count,
  published_at,
  metadata,
  units!listings_unit_id_fkey (
    id,
    property_id,
    bedrooms,
    bathrooms,
    size_sqm,
    unit_number,
    building_name,
    properties!units_property_id_fkey (
      id,
      name,
      type,
      county,
      town,
      estate,
      address
    )
  )
`

function formatLocation(property: ListingWithRelations['units']['properties']): string {
  return [property.estate, property.town, property.county].filter(Boolean).join(', ')
}

function formatArea(sizeSqm: number | null): string {
  if (!sizeSqm) return '—'
  return `${sizeSqm} sqm`
}

function getPublicFileUrl(file: DbFile): string {
  const { data } = supabase.storage.from(file.bucket).getPublicUrl(file.path)
  return data.publicUrl
}

async function fetchFilesByEntity(
  entityType: string,
  entityIds: string[],
): Promise<DbFile[]> {
  if (entityIds.length === 0) return []

  const { data, error } = await supabase
    .from('files')
    .select('*')
    .eq('entity_type', entityType)
    .in('entity_id', entityIds)
    .eq('is_public', true)
    .order('sort_order', { ascending: true })

  if (error || !data) return []
  return data as DbFile[]
}

async function fetchImagesForListings(
  listings: ListingWithRelations[],
): Promise<Map<string, string>> {
  const imageMap = new Map<string, string>()
  if (listings.length === 0) return imageMap

  const listingIds = listings.map((listing) => listing.id)
  const propertyIds = [...new Set(listings.map((listing) => listing.units.properties.id))]
  const unitIds = [...new Set(listings.map((listing) => listing.units.id))]

  const [listingFiles, propertyFiles, unitFiles] = await Promise.all([
    fetchFilesByEntity('listing', listingIds),
    fetchFilesByEntity('property', propertyIds),
    fetchFilesByEntity('unit', unitIds),
  ])

  const listingFileMap = groupFilesByEntityId(listingFiles)
  const propertyFileMap = groupFilesByEntityId(propertyFiles)
  const unitFileMap = groupFilesByEntityId(unitFiles)

  for (const listing of listings) {
    const file =
      listingFileMap.get(listing.id)?.[0] ??
      propertyFileMap.get(listing.units.properties.id)?.[0] ??
      unitFileMap.get(listing.units.id)?.[0]

    if (file) {
      imageMap.set(listing.id, getPublicFileUrl(file))
    }
  }

  return imageMap
}

function groupFilesByEntityId(files: DbFile[]): Map<string, DbFile[]> {
  const map = new Map<string, DbFile[]>()

  for (const file of files) {
    if (!file.entity_id) continue
    const existing = map.get(file.entity_id) ?? []
    existing.push(file)
    map.set(file.entity_id, existing)
  }

  return map
}

function normalizeListingRows(data: unknown): ListingWithRelations[] {
  if (!Array.isArray(data)) return []

  return data.map((row) => {
    const listing = row as Record<string, unknown>
    const units = listing.units as Record<string, unknown> | undefined

    if (!units) {
      throw new Error(
        'Unexpected listings response shape. Expected nested "units" relation from Supabase.',
      )
    }

    const properties = units.properties as Record<string, unknown> | undefined
    if (!properties) {
      throw new Error(
        'Unexpected listings response shape. Expected nested "units.properties" relation from Supabase.',
      )
    }

    return listing as unknown as ListingWithRelations
  })
}

export function mapListingToCard(
  listing: ListingWithRelations,
  imageMap: Map<string, string>,
): ListingCard {
  const property = listing.units.properties
  const location = formatLocation(property)

  return {
    id: listing.id,
    title: listing.title,
    description: listing.description,
    location: location || property.address || 'Kenya',
    county: property.county ?? '',
    town: property.town ?? '',
    type: property.type ?? 'Property',
    price: listing.rent,
    priceLabel: formatKES(listing.rent),
    deposit: listing.deposit,
    depositLabel: formatKES(listing.deposit),
    beds: listing.units.bedrooms ?? 0,
    baths: listing.units.bathrooms ?? 0,
    area: formatArea(listing.units.size_sqm),
    image: imageMap.get(listing.id) ?? PLACEHOLDER_IMAGE,
    rankScore: listing.rank_score,
    propertyId: property.id,
    unitId: listing.units.id,
    propertyName: property.name,
  }
}

async function fetchPublishedListings(limit?: number): Promise<ListingCard[]> {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in frontend/.env',
    )
  }

  let query = supabase
    .from('listings')
    .select(LISTING_SELECT)
    .eq('status', 'published')
    .order('rank_score', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch listings: ${error.message}`)
  }

  const rows = normalizeListingRows(data)
  const imageMap = await fetchImagesForListings(rows)
  return rows.map((row) => mapListingToCard(row, imageMap))
}

export async function fetchFeaturedListings(): Promise<ListingCard[]> {
  return fetchPublishedListings(4)
}

export async function fetchAllListings(): Promise<ListingCard[]> {
  return fetchPublishedListings()
}

export async function fetchListingById(id: string): Promise<ListingCard | null> {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in frontend/.env',
    )
  }

  const { data, error } = await supabase
    .from('listings')
    .select(LISTING_SELECT)
    .eq('id', id)
    .eq('status', 'published')
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to fetch listing: ${error.message}`)
  }

  if (!data) return null

  const [row] = normalizeListingRows([data])
  if (!row) return null

  const imageMap = await fetchImagesForListings([row])
  return mapListingToCard(row, imageMap)
}

export async function fetchSearchOptions(): Promise<SearchOptions> {
  if (!isSupabaseConfigured) {
    return { types: [], locations: [] }
  }

  const { data, error } = await supabase
    .from('listings')
    .select(LISTING_SELECT)
    .eq('status', 'published')

  if (error || !data) {
    return { types: [], locations: [] }
  }

  const rows = normalizeListingRows(data)
  const types = new Set<string>()
  const locations = new Set<string>()

  for (const row of rows) {
    const property = row.units.properties
    if (property.type) types.add(property.type)
    if (property.county) locations.add(property.county)
    if (property.town) locations.add(property.town)
  }

  return {
    types: [...types].sort(),
    locations: [...locations].sort(),
  }
}
