CREATE TABLE public.orders (
    order_id INTEGER NOT NULL,
    customer_id INTEGER,
    total_amount NUMERIC NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    status VARCHAR(255),
    CONSTRAINT orders_pkey PRIMARY KEY (order_id)
);