CREATE TABLE public.hotel_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone text,
  messenger text,
  email text,
  dates jsonb,
  composition jsonb,
  budget jsonb,
  priorities text[],
  style text,
  scenario text,
  consent boolean NOT NULL DEFAULT false,
  source text NOT NULL DEFAULT 'hotels-maldives',
  raw jsonb
);

ALTER TABLE public.hotel_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a hotel lead"
ON public.hotel_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);