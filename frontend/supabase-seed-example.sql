-- BomaFlow seed example — run in Supabase SQL Editor
--
-- RLS requirements for public visitors (anon key):
--   listings.status  = 'published'
--   properties.status = 'verified'
--   units readable when parent property is verified
--
-- Step 1 (optional): See available auth users
SELECT id, email, created_at FROM auth.users ORDER BY created_at;

-- Step 2: Seed one verified property + unit + published listing
-- Uses the oldest auth.users row automatically (no manual UUID needed).
-- To target a specific user, set v_landlord_email below instead of NULL.

DO $$
DECLARE
  v_landlord_email text := NULL;  -- e.g. 'you@example.com' or leave NULL for first user
  v_landlord_id uuid;
  v_property_id uuid := gen_random_uuid();
  v_unit_id uuid := gen_random_uuid();
  v_listing_id uuid := gen_random_uuid();
BEGIN
  IF v_landlord_email IS NOT NULL THEN
    SELECT id INTO v_landlord_id
    FROM auth.users
    WHERE email = v_landlord_email
    LIMIT 1;

    IF v_landlord_id IS NULL THEN
      RAISE EXCEPTION 'No auth.users row found for email: %', v_landlord_email;
    END IF;
  ELSE
    SELECT id INTO v_landlord_id
    FROM auth.users
    ORDER BY created_at ASC
    LIMIT 1;

    IF v_landlord_id IS NULL THEN
      RAISE EXCEPTION 'No users in auth.users. Sign up first at /signup, then re-run this seed.';
    END IF;
  END IF;

  INSERT INTO public.properties (
    id,
    landlord_id,
    name,
    type,
    description,
    county,
    town,
    estate,
    address,
    status
  ) VALUES (
    v_property_id,
    v_landlord_id,
    'Kilimani Heights',
    'Apartment',
    'Modern apartment block in Kilimani',
    'Nairobi',
    'Nairobi',
    'Kilimani',
    'Argwings Kodhek Road, Nairobi',
    'verified'
  );

  INSERT INTO public.units (
    id,
    property_id,
    unit_number,
    bedrooms,
    bathrooms,
    size_sqm,
    rent_amount,
    deposit,
    status
  ) VALUES (
    v_unit_id,
    v_property_id,
    'A-101',
    2,
    2,
    85,
    45000,
    90000,
    'vacant'
  );

  INSERT INTO public.listings (
    id,
    unit_id,
    title,
    description,
    rent,
    deposit,
    status,
    published_at,
    rank_score
  ) VALUES (
    v_listing_id,
    v_unit_id,
    'Modern 2-Bed Apartment in Kilimani',
    'Bright 2-bedroom unit with parking and security.',
    45000,
    90000,
    'published',
    now(),
    100
  );

  RAISE NOTICE 'Seeded for landlord %', v_landlord_id;
  RAISE NOTICE 'property %, unit %, listing %', v_property_id, v_unit_id, v_listing_id;
END $$;

-- Step 3: Verify the public-visible chain (should return 1 row)
SELECT
  l.id,
  l.title,
  l.rent,
  l.status AS listing_status,
  p.name,
  p.status AS property_status,
  u.unit_number
FROM public.listings l
JOIN public.units u ON u.id = l.unit_id
JOIN public.properties p ON p.id = u.property_id
WHERE l.status = 'published'
  AND p.status = 'verified';
