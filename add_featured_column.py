import psycopg2
from psycopg2 import sql

# Database connection parameters
db_config = {
    'dbname': 'ecommerce_db',  # Your database name
    'user': 'admin',           # Your database username
    'password': 'admin123',    # Your database password
    'host': 'localhost',       # Your database host
    'port': '5432'             # Your database port
}

# SQL query to add the `featured` column
add_featured_column_query = """
ALTER TABLE products ADD COLUMN featured BOOLEAN DEFAULT FALSE;
"""

def add_featured_column():
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()

        # Execute the SQL query to add the `featured` column
        cursor.execute(add_featured_column_query)
        conn.commit()  # Commit the transaction

        print("✅ Successfully added the `featured` column to the `products` table.")

    except psycopg2.Error as e:
        print(f"❌ Error: {e}")
    finally:
        # Close the database connection
        if conn:
            cursor.close()
            conn.close()
            print("✅ Database connection closed.")

# Run the function
add_featured_column()

