DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'featured'
    ) THEN
        ALTER TABLE products ADD COLUMN featured BOOLEAN DEFAULT FALSE;
    END IF;
END $$;
