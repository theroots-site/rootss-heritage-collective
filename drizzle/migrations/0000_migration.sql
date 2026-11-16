CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  kind text NOT NULL,
  name text,
  email text NOT NULL,
  phone text,
  country text,
  topic text,
  quantity text,
  budget text,
  product_codes text[] NOT NULL DEFAULT '{}',
  message text,
  source_page text,
  status text NOT NULL DEFAULT 'new'
);

GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- No policies for anon/authenticated: visitors cannot read, change or delete enquiries.
-- Inserts happen only from server code with server-side credentials.

CREATE INDEX enquiries_created_at_idx ON public.enquiries (created_at DESC);
CREATE INDEX enquiries_kind_idx ON public.enquiries (kind);