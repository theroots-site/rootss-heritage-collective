-- Roles ---------------------------------------------------------------
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Admin allow-list (service role only)
CREATE TABLE public.admin_emails (
  email text PRIMARY KEY CHECK (email = lower(email)),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.admin_emails TO service_role;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.grant_admin_if_allowed()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL
     AND EXISTS (SELECT 1 FROM public.admin_emails a WHERE a.email = lower(NEW.email)) THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_grant_admin
  AFTER INSERT OR UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.grant_admin_if_allowed();

CREATE OR REPLACE FUNCTION public.admin_emails_backfill()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  SELECT u.id, 'admin' FROM auth.users u
  WHERE lower(u.email) = NEW.email AND u.email_confirmed_at IS NOT NULL
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_admin_email_added
  AFTER INSERT ON public.admin_emails
  FOR EACH ROW EXECUTE FUNCTION public.admin_emails_backfill();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Products --------------------------------------------------------------
CREATE TABLE public.products (
  slug text PRIMARY KEY CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND char_length(slug) <= 120),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  code text CHECK (char_length(code) <= 120),
  line text NOT NULL DEFAULT 'dhokra',
  collection text NOT NULL,
  size text CHECK (char_length(size) <= 120),
  craft text NOT NULL DEFAULT 'Dhokra lost-wax casting',
  material text NOT NULL DEFAULT 'Brass, bronze and bell metal',
  description text NOT NULL DEFAULT '' CHECK (char_length(description) <= 4000),
  images text[] NOT NULL DEFAULT '{}',
  availability text NOT NULL DEFAULT 'on-enquiry'
    CHECK (availability IN ('in-stock','pre-order','made-to-order','on-enquiry','sold-out')),
  price numeric(12,2) CHECK (price IS NULL OR price >= 0),
  options text CHECK (char_length(options) <= 300),
  more_designs boolean NOT NULL DEFAULT false,
  featured boolean NOT NULL DEFAULT false,
  hidden boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can add products" ON public.products FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can edit products" ON public.products FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Collection status -----------------------------------------------------
CREATE TABLE public.collection_settings (
  slug text PRIMARY KEY,
  status text NOT NULL DEFAULT 'live' CHECK (status IN ('live','coming-soon','hidden')),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.collection_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.collection_settings TO authenticated;
GRANT ALL ON public.collection_settings TO service_role;
ALTER TABLE public.collection_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view collection status" ON public.collection_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can add collection status" ON public.collection_settings FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can change collection status" ON public.collection_settings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete collection status" ON public.collection_settings FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER collection_settings_touch BEFORE UPDATE ON public.collection_settings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Enquiries: admin inbox -------------------------------------------------
ALTER TABLE public.enquiries ADD COLUMN admin_note text;
GRANT SELECT, UPDATE, DELETE ON public.enquiries TO authenticated;
CREATE POLICY "Admins can read enquiries" ON public.enquiries FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update enquiries" ON public.enquiries FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete enquiries" ON public.enquiries FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Advisor rate limit ------------------------------------------------------
CREATE TABLE public.advisor_requests (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  client_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.advisor_requests TO service_role;
ALTER TABLE public.advisor_requests ENABLE ROW LEVEL SECURITY;
CREATE INDEX advisor_requests_key_time_idx ON public.advisor_requests (client_key, created_at DESC);

CREATE OR REPLACE FUNCTION public.advisor_allow(_client_key text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE recent int; total int;
BEGIN
  IF _client_key IS NULL OR char_length(_client_key) > 128 THEN RETURN false; END IF;
  DELETE FROM public.advisor_requests WHERE created_at < now() - interval '2 days';
  SELECT count(*) INTO recent FROM public.advisor_requests
    WHERE client_key = _client_key AND created_at > now() - interval '1 hour';
  SELECT count(*) INTO total FROM public.advisor_requests
    WHERE created_at > now() - interval '1 hour';
  IF recent >= 8 OR total >= 300 THEN RETURN false; END IF;
  INSERT INTO public.advisor_requests (client_key) VALUES (_client_key);
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.advisor_allow(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.advisor_allow(text) TO anon, authenticated, service_role;

-- Image folder -----------------------------------------------------------
CREATE POLICY "Anyone can view brand images" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'rootss-images');
CREATE POLICY "Admins can upload brand images" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'rootss-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can replace brand images" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'rootss-images' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'rootss-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete brand images" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'rootss-images' AND public.has_role(auth.uid(), 'admin'));