-- Run this entire script in Supabase SQL Editor, then paste ALL results back to the agent.
-- It collects FK names, RLS policies, listing data shape, and sample rows.

-- 1) Foreign key names (needed for listings -> units -> properties joins)
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table,
  tc.constraint_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND tc.table_name IN ('listings', 'units', 'properties', 'files')
ORDER BY tc.table_name, tc.constraint_name;

-- 2) RLS enabled + policies on tables the frontend reads
SELECT
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('listings', 'units', 'properties', 'files')
ORDER BY tablename;

SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('listings', 'units', 'properties', 'files')
ORDER BY tablename, policyname;

-- 3) Distinct listing statuses (app filters status = 'published')
SELECT status, COUNT(*) AS count
FROM public.listings
GROUP BY status
ORDER BY count DESC;

-- 4) Sample published listings with joined unit + property (what the app expects)
SELECT
  l.id AS listing_id,
  l.title,
  l.rent,
  l.deposit,
  l.status AS listing_status,
  u.id AS unit_id,
  u.bedrooms,
  u.bathrooms,
  u.size_sqm,
  p.id AS property_id,
  p.name AS property_name,
  p.type AS property_type,
  p.county,
  p.town,
  p.estate,
  p.address
FROM public.listings l
JOIN public.units u ON u.id = l.unit_id
JOIN public.properties p ON p.id = u.property_id
WHERE l.status = 'published'
ORDER BY l.rank_score DESC NULLS LAST
LIMIT 5;

-- 5) Public files linked to listings/properties/units (for card images)
SELECT
  entity_type,
  entity_id,
  bucket,
  path,
  is_public,
  sort_order
FROM public.files
WHERE is_public = true
  AND entity_type IN ('listing', 'property', 'unit')
ORDER BY entity_type, sort_order
LIMIT 20;

-- 6) Storage buckets (confirm bucket names match files.bucket)
SELECT id, name, public
FROM storage.buckets
ORDER BY name;
