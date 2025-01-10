import psycopg2
from psycopg2 import sql

# Database connection parameters
DB_USER = "admin"
DB_PASSWORD = "admin123"
DB_HOST = "localhost"
DB_NAME = "ecommerce_db"
DB_PORT = 5432

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

# Add the 'featured' column to the 'products' table
def add_featured_column(conn):
    try:
        with conn.cursor() as cursor:
            # SQL to add the 'featured' column if it doesn't exist
            query = """
            ALTER TABLE products
            ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
            """
            cursor.execute(query)
            conn.commit()
            print("Added 'featured' column to the 'products' table.")
    except Exception as e:
        print(f"Error adding 'featured' column: {e}")

# Mark specific products as featured
def mark_products_as_featured(conn, product_ids):
    try:
        with conn.cursor() as cursor:
            # SQL to update the 'featured' column for specific products
            query = sql.SQL("""
            UPDATE products
            SET featured = TRUE
            WHERE product_id IN ({});
            """).format(sql.SQL(',').join(map(sql.Literal, product_ids)))
            cursor.execute(query)
            conn.commit()
            print(f"Marked products {product_ids} as featured.")
    except Exception as e:
        print(f"Error marking products as featured: {e}")

# Main function
def main():
    # Connect to the database
    conn = connect_to_db()
    if not conn:
        return

    try:
        # Add the 'featured' column
        add_featured_column(conn)

        # Mark specific products as featured (e.g., products with IDs 1-6)
        product_ids_to_feature = [1, 2, 3, 4, 5, 6]
        mark_products_as_featured(conn, product_ids_to_feature)

    finally:
        # Close the database connection
        if conn:
            conn.close()
            print("Database connection closed.")

# Run the script
if __name__ == "__main__":
    main()

