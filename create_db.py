import psycopg2
from psycopg2 import sql

# Database connection details
DB_NAME = "ecommerce_db"
DB_USER = "your_username"
DB_PASSWORD = "your_password"
DB_HOST = "localhost"
DB_PORT = "5432"

# Connect to PostgreSQL (default 'postgres' database to create the new database)
conn = psycopg2.connect(
    dbname="postgres",
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
)
conn.autocommit = True
cursor = conn.cursor()

# Create the ecommerce database
try:
    cursor.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(DB_NAME)))
    print(f"Database '{DB_NAME}' created successfully!")
except psycopg2.Error as e:
    print(f"Error creating database: {e}")

# Close the connection to the default database
cursor.close()
conn.close()

# Connect to the new ecommerce database
conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
)
conn.autocommit = True
cursor = conn.cursor()

# Create tables
try:
    # Products Table
    cursor.execute("""
        CREATE TABLE Products (
            product_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            category VARCHAR,
            price DECIMAL NOT NULL,
            stock_quantity INTEGER DEFAULT 0,
            description TEXT,
            created_at TIMESTAMP DEFAULT now()
        );
        CREATE INDEX idx_products_name ON Products (name);
        CREATE INDEX idx_products_category ON Products (category);
    """)

    # Customers Table
    cursor.execute("""
        CREATE TABLE Customers (
            customer_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            email VARCHAR UNIQUE NOT NULL,
            phone VARCHAR,
            address JSONB,
            registration_date TIMESTAMP DEFAULT now(),
            newsletter_opt_in BOOLEAN DEFAULT FALSE
        );
        CREATE INDEX idx_customers_email ON Customers (email);
    """)

    # Logistics_Partners Table
    cursor.execute("""
        CREATE TABLE Logistics_Partners (
            partner_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            region VARCHAR,
            contact_details JSONB
        );
    """)

    # Orders Table
    cursor.execute("""
        CREATE TABLE Orders (
            order_id SERIAL PRIMARY KEY,
            customer_id INTEGER REFERENCES Customers(customer_id),
            status VARCHAR,
            total_amount DECIMAL NOT NULL,
            created_at TIMESTAMP DEFAULT now()
        );
    """)

    # Order_Items Table
    cursor.execute("""
        CREATE TABLE Order_Items (
            order_item_id SERIAL PRIMARY KEY,
            order_id INTEGER REFERENCES Orders(order_id),
            product_id INTEGER REFERENCES Products(product_id),
            quantity INTEGER NOT NULL,
            price DECIMAL NOT NULL
        );
    """)

    # Sales_Reports Table
    cursor.execute("""
        CREATE TABLE Sales_Reports (
            report_id SERIAL PRIMARY KEY,
            date_range JSONB NOT NULL,
            total_sales DECIMAL,
            orders_count INTEGER
        );
    """)

    print("All tables created successfully!")

except psycopg2.Error as e:
    print(f"Error creating tables: {e}")

# Close the connection
cursor.close()
conn.close()

