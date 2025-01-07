import psycopg2
from psycopg2 import sql

# Database connection parameters
DB_NAME = "ecommerce_db"
DB_USER = "admin"
DB_PASSWORD = "admin123"
DB_HOST = "localhost"
DB_PORT = "5432"

# Connect to the PostgreSQL database
def connect_to_db():
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        print("Connected to the database successfully!")
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None

# Check if a constraint exists
def constraint_exists(cursor, table_name, constraint_name):
    try:
        cursor.execute("""
            SELECT 1
            FROM information_schema.table_constraints
            WHERE table_name = %s AND constraint_name = %s;
        """, (table_name, constraint_name))
        return cursor.fetchone() is not None
    except Exception as e:
        print(f"Error checking constraint existence: {e}")
        return False

# Create missing tables and constraints
def create_missing_database_objects(conn):
    try:
        cursor = conn.cursor()

        # Create the `logistics_partners` table (if not exists)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS logistics_partners (
                partner_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                region VARCHAR(255),
                contact_details JSONB
            );
        """)

        # Create the `sales_reports` table (if not exists)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS sales_reports (
                report_id SERIAL PRIMARY KEY,
                date_range JSONB NOT NULL,
                total_sales NUMERIC,
                orders_count INTEGER
            );
        """)

        # Create the `order_items` table (if not exists)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS order_items (
                order_item_id SERIAL PRIMARY KEY,
                order_id INTEGER,
                product_id INTEGER,
                quantity INTEGER NOT NULL,
                price NUMERIC NOT NULL
            );
        """)

        # Add missing foreign key constraints (if they don't already exist)
        if not constraint_exists(cursor, "orders", "orders_customer_id_fkey"):
            cursor.execute("""
                ALTER TABLE orders
                ADD CONSTRAINT orders_customer_id_fkey
                FOREIGN KEY (customer_id) REFERENCES customers(customer_id);
            """)

        if not constraint_exists(cursor, "order_items", "order_items_order_id_fkey"):
            cursor.execute("""
                ALTER TABLE order_items
                ADD CONSTRAINT order_items_order_id_fkey
                FOREIGN KEY (order_id) REFERENCES orders(order_id);
            """)

        if not constraint_exists(cursor, "order_items", "order_items_product_id_fkey"):
            cursor.execute("""
                ALTER TABLE order_items
                ADD CONSTRAINT order_items_product_id_fkey
                FOREIGN KEY (product_id) REFERENCES products(product_id);
            """)

        # Commit the changes
        conn.commit()
        print("Missing database objects created successfully!")
    except Exception as e:
        print(f"Error creating database objects: {e}")
        conn.rollback()
    finally:
        if cursor:
            cursor.close()

# Main function
def main():
    conn = connect_to_db()
    if conn:
        create_missing_database_objects(conn)
        conn.close()
        print("Database connection closed.")

if __name__ == "__main__":
    main()

