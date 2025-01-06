# Database connection details
# pip install psycopg2-binary faker
# DB_USER = "your_username"
# DB_PASSWORD = "your_password"
import psycopg2
from psycopg2 import sql
import random
from faker import Faker
import json  # Import json module to handle JSONB data

# Database connection details
DB_NAME = "ecommerce_db"
DB_USER = "admin"
DB_PASSWORD = "admin123"
DB_HOST = "localhost"
DB_PORT = "5432"

# Initialize Faker
fake = Faker()

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

# Function to generate dummy products
def generate_dummy_products(num_products=10):
    products = []
    for _ in range(num_products):
        product = {
            "name": fake.word().capitalize() + " " + fake.word().capitalize(),
            "category": random.choice(["Electronics", "Clothing", "Home & Kitchen", "Books", "Toys"]),
            "price": round(random.uniform(10, 500), 2),
            "stock_quantity": random.randint(10, 100),
            "description": fake.sentence()
        }
        products.append(product)
    return products

# Function to generate dummy customers
def generate_dummy_customers(num_customers=10):
    customers = []
    for _ in range(num_customers):
        customer = {
            "name": fake.name(),
            "email": fake.email(),
            "phone": fake.phone_number(),
            "address": {
                "street": fake.street_address(),
                "city": fake.city(),
                "state": fake.state(),
                "zipcode": fake.zipcode()
            },
            "newsletter_opt_in": random.choice([True, False])
        }
        customers.append(customer)
    return customers

# Function to generate dummy orders
def generate_dummy_orders(num_orders=20, num_customers=10, num_products=10):
    orders = []
    for _ in range(num_orders):
        order = {
            "customer_id": random.randint(1, num_customers),
            "status": random.choice(["Pending", "Shipped", "Delivered", "Cancelled"]),
            "total_amount": 0  # Will be calculated based on order items
        }
        orders.append(order)
    return orders

# Function to generate dummy order items
def generate_dummy_order_items(num_orders=20, num_products=10):
    order_items = []
    for order_id in range(1, num_orders + 1):
        num_items = random.randint(1, 5)
        for _ in range(num_items):
            product_id = random.randint(1, num_products)
            quantity = random.randint(1, 5)
            price = round(random.uniform(10, 500), 2)
            order_item = {
                "order_id": order_id,
                "product_id": product_id,
                "quantity": quantity,
                "price": price
            }
            order_items.append(order_item)
    return order_items

# Insert dummy products into the Products table
def insert_dummy_products(products):
    for product in products:
        cursor.execute("""
            INSERT INTO Products (name, category, price, stock_quantity, description)
            VALUES (%s, %s, %s, %s, %s)
        """, (product["name"], product["category"], product["price"], product["stock_quantity"], product["description"]))

# Insert dummy customers into the Customers table
def insert_dummy_customers(customers):
    for customer in customers:
        # Convert the address dictionary to a JSON string
        address_json = json.dumps(customer["address"])
        cursor.execute("""
            INSERT INTO Customers (name, email, phone, address, newsletter_opt_in)
            VALUES (%s, %s, %s, %s, %s)
        """, (customer["name"], customer["email"], customer["phone"], address_json, customer["newsletter_opt_in"]))

# Insert dummy orders into the Orders table
def insert_dummy_orders(orders):
    for order in orders:
        cursor.execute("""
            INSERT INTO Orders (customer_id, status, total_amount)
            VALUES (%s, %s, %s)
        """, (order["customer_id"], order["status"], order["total_amount"]))

# Insert dummy order items into the Order_Items table
def insert_dummy_order_items(order_items):
    for item in order_items:
        cursor.execute("""
            INSERT INTO Order_Items (order_id, product_id, quantity, price)
            VALUES (%s, %s, %s, %s)
        """, (item["order_id"], item["product_id"], item["quantity"], item["price"]))

# Update order total amounts based on order items
def update_order_totals(num_orders):
    for order_id in range(1, num_orders + 1):
        cursor.execute("""
            SELECT SUM(price * quantity) FROM Order_Items WHERE order_id = %s
        """, (order_id,))
        total_amount = cursor.fetchone()[0]
        cursor.execute("""
            UPDATE Orders SET total_amount = %s WHERE order_id = %s
        """, (total_amount, order_id))

# Generate and insert dummy data
num_products = 10
num_customers = 10
num_orders = 20

products = generate_dummy_products(num_products)
customers = generate_dummy_customers(num_customers)
orders = generate_dummy_orders(num_orders, num_customers, num_products)
order_items = generate_dummy_order_items(num_orders, num_products)

insert_dummy_products(products)
insert_dummy_customers(customers)
insert_dummy_orders(orders)
insert_dummy_order_items(order_items)
update_order_totals(num_orders)

# Close the connection
cursor.close()
conn.close()

print("Dummy data inserted successfully!")
