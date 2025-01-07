CREATE TABLE public.order_items (
    order_item_id INTEGER NOT NULL,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    CONSTRAINT order_items_pkey PRIMARY KEY (order_item_id)
);