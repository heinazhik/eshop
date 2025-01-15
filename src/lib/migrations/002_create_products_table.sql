CREATE TABLE public.products (
    product_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    category VARCHAR(255),
    stock_quantity INTEGER,
    CONSTRAINT products_pkey PRIMARY KEY (product_id)
);

CREATE INDEX idx_products_name ON public.products USING btree (name);
CREATE INDEX idx_products_category ON public.products USING btree (category);