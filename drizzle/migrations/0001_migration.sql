GRANT INSERT ON public.enquiries TO anon, authenticated;

CREATE POLICY "Visitors can submit enquiries"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND char_length(email) BETWEEN 3 AND 254
  AND char_length(kind) BETWEEN 1 AND 40
  AND coalesce(char_length(message), 0) <= 5000
  AND coalesce(array_length(product_codes, 1), 0) <= 100
);