DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'customers' 
        AND column_name = 'name'
    ) THEN
        ALTER TABLE customers ADD COLUMN name VARCHAR(255);
    END IF;

    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'customers' 
        AND column_name = 'phone'
    ) THEN
        ALTER TABLE customers ADD COLUMN phone VARCHAR(20);
    END IF;

    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'customers' 
        AND column_name = 'subscription_status'
    ) THEN
        ALTER TABLE customers ADD COLUMN subscription_status VARCHAR(50) DEFAULT 'none';
    END IF;
END $$;
