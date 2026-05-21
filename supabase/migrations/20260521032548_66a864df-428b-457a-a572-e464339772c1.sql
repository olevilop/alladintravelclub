DROP POLICY IF EXISTS "Anyone can submit a hotel lead" ON public.hotel_leads;

CREATE POLICY "Anyone can submit a hotel lead with consent"
ON public.hotel_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (consent = true AND length(btrim(name)) > 0);