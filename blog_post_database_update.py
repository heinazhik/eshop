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

# Create Blog_Categories table
try:
    cursor.execute("""
        CREATE TABLE Blog_Categories (
            category_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL UNIQUE
        );
    """)
    print("Created Blog_Categories table!")
except psycopg2.Error as e:
    print(f"Error creating Blog_Categories table: {e}")

# Create Blog_Authors table
try:
    cursor.execute("""
        CREATE TABLE Blog_Authors (
            author_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            email VARCHAR UNIQUE NOT NULL,
            bio TEXT
        );
    """)
    print("Created Blog_Authors table!")
except psycopg2.Error as e:
    print(f"Error creating Blog_Authors table: {e}")

# Create Blog_Posts table
try:
    cursor.execute("""
        CREATE TABLE Blog_Posts (
            post_id SERIAL PRIMARY KEY,
            title VARCHAR NOT NULL,
            content TEXT NOT NULL,
            excerpt TEXT,
            author_id INTEGER REFERENCES Blog_Authors(author_id),
            category_id INTEGER REFERENCES Blog_Categories(category_id),
            published_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now()
        );
    """)
    print("Created Blog_Posts table!")
except psycopg2.Error as e:
    print(f"Error creating Blog_Posts table: {e}")

# Create Blog_Comments table
try:
    cursor.execute("""
        CREATE TABLE Blog_Comments (
            comment_id SERIAL PRIMARY KEY,
            post_id INTEGER REFERENCES Blog_Posts(post_id),
            author_name VARCHAR NOT NULL,
            author_email VARCHAR NOT NULL,
            content TEXT NOT NULL,
            commented_at TIMESTAMP DEFAULT now()
        );
    """)
    print("Created Blog_Comments table!")
except psycopg2.Error as e:
    print(f"Error creating Blog_Comments table: {e}")

# Close the connection
cursor.close()
conn.close()

print("Database schema updated successfully to support Blog service!")

