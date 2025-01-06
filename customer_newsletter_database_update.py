import psycopg2
from psycopg2 import sql

# Database connection details
DB_NAME = "ecommerce_db"
DB_USER = "admin"
DB_PASSWORD = "admin123"
DB_HOST = "localhost"
DB_PORT = "5432"

# Connect to the ecommerce database
conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
)
conn.autocommit = True
cursor = conn.cursor()

# Modify the Customers table to add subscription_status
try:
    cursor.execute("""
        ALTER TABLE Customers
        ADD COLUMN subscription_status VARCHAR DEFAULT 'unsubscribed';
    """)
    print("Added subscription_status column to Customers table!")
except psycopg2.Error as e:
    print(f"Error modifying Customers table: {e}")

# Create Subscription_History table
try:
    cursor.execute("""
        CREATE TABLE Subscription_History (
            history_id SERIAL PRIMARY KEY,
            customer_id INTEGER REFERENCES Customers(customer_id),
            status VARCHAR NOT NULL,
            changed_at TIMESTAMP DEFAULT now()
        );
    """)
    print("Created Subscription_History table!")
except psycopg2.Error as e:
    print(f"Error creating Subscription_History table: {e}")

# Close the connection
cursor.close()
conn.close()

print("Database schema updated successfully!")

