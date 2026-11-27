CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL,
  service VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  total_amount NUMERIC(12, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_customers
  FOREIGN KEY (customer_id),
  REFERENCES customers(id)
);

INSERT INTO customers (full_name, phone)
VALUES('Aishat Olasupo', '08012345678');
RETURNING id

SELECT * FROM customers;

SELECT * FROM customers
WHERE id = 1;

UPDATE customers
SET phone = '08099998888'
WHERE id = 1;

DELETE FROM customers
WHERE id = 1;


