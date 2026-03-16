
-- Orders table
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL,
  dealer text NOT NULL,
  phone text NOT NULL,
  product text NOT NULL,
  qty integer NOT NULL DEFAULT 1,
  width numeric NOT NULL DEFAULT 30,
  height numeric NOT NULL DEFAULT 84,
  status text NOT NULL DEFAULT 'Pending',
  order_date date NOT NULL DEFAULT CURRENT_DATE,
  urgent boolean NOT NULL DEFAULT false,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Inventory table
CREATE TABLE public.inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  unit text NOT NULL DEFAULT 'pcs',
  stock integer NOT NULL DEFAULT 0,
  min_stock integer NOT NULL DEFAULT 0,
  reorder_qty integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- RLS policies: admin full access
CREATE POLICY "Admins can manage orders" ON public.orders FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage inventory" ON public.inventory FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed default inventory
INSERT INTO public.inventory (name, unit, stock, min_stock, reorder_qty) VALUES
  ('PVC Foam Board', 'sheets', 320, 100, 200),
  ('MS Square Pipe', 'pcs', 180, 60, 150),
  ('PVC Hollow Sheet 5mm', 'sheets', 90, 80, 200),
  ('Foil No. 2 (Dark Walnut)', 'rolls', 12, 8, 20),
  ('Foil No. 3 (Mahogany)', 'rolls', 6, 8, 20),
  ('Foil No. 4 (Cherry Red)', 'rolls', 15, 8, 20),
  ('Foil No. 7 (Honey Oak)', 'rolls', 22, 8, 20),
  ('Foil No. 8 (Golden Walnut)', 'rolls', 4, 8, 20),
  ('Foil No. 9 (Rosewood)', 'rolls', 9, 8, 20),
  ('Foil No. 11 (Teak)', 'rolls', 18, 8, 20),
  ('Foil No. 12 (Chestnut)', 'rolls', 7, 8, 20),
  ('Foil No. 13 (Medium Brown)', 'rolls', 11, 8, 20),
  ('PVC Film (Top Coat)', 'rolls', 5, 10, 20),
  ('Carton Box (Packing)', 'pcs', 200, 50, 150);

-- Seed default orders
INSERT INTO public.orders (order_number, dealer, phone, product, qty, width, height, status, order_date, urgent, notes) VALUES
  ('ORD-001', 'Rajesh Hardware, Ahmedabad', '9876543210', 'ZN-13 (Foil 2)', 8, 30, 84, 'Dispatched', '2026-03-14', false, 'Ground floor delivery'),
  ('ORD-002', 'Mehta Interiors, Surat', '9765432109', 'WPC-102 (Foil 8)', 15, 32, 84, 'Ready', '2026-03-15', true, 'Urgent order'),
  ('ORD-003', 'Patel Builders, Vadodara', '9654321098', 'ZN-07 (Foil 13)', 20, 28, 78, 'Production', '2026-03-16', false, 'Site delivery needed'),
  ('ORD-004', 'Shah Constructions, Vapi', '9543210987', 'WPC-105 (Foil 4)', 6, 24, 72, 'Pending', '2026-03-17', false, ''),
  ('ORD-005', 'Krishna Doors, Bharuch', '9432109876', 'ZN-15 (Foil 4)', 12, 30, 84, 'Pending', '2026-03-17', true, 'Payment pending');
