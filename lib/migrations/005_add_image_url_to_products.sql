DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'image_url'
    ) THEN
        ALTER TABLE products ADD COLUMN image_url TEXT;
        CREATE INDEX idx_products_image_url ON products(image_url);
    END IF;
END $$;
