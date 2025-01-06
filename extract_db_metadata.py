import psycopg2
from psycopg2 import sql

# Database connection parameters
DB_USER = "admin"
DB_PASSWORD = "admin123"
DB_NAME = "ecommerce_db"
DB_HOST = "localhost"
DB_PORT = "5432"

# Function to connect to the database
def connect_to_db():
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        return conn
    except Exception as e:
        print(f"Error: {e}")
        return None

# Function to extract schema, tables, and indexes
def extract_db_metadata(conn):
    metadata = {
        'schemas': [],
        'tables': {},
        'indexes': {}
    }

    try:
        with conn.cursor() as cur:
            # Extract schemas
            cur.execute("SELECT schema_name FROM information_schema.schemata;")
            schemas = cur.fetchall()
            metadata['schemas'] = [schema[0] for schema in schemas]

            # Extract tables and their columns
            for schema in metadata['schemas']:
                cur.execute(sql.SQL("""
                    SELECT table_name, column_name, data_type, is_nullable
                    FROM information_schema.columns
                    WHERE table_schema = %s;
                """), [schema])
                tables = cur.fetchall()
                for table in tables:
                    table_name = table[0]
                    column_name = table[1]
                    data_type = table[2]
                    is_nullable = table[3]

                    if table_name not in metadata['tables']:
                        metadata['tables'][table_name] = {'columns': []}

                    metadata['tables'][table_name]['columns'].append({
                        'column_name': column_name,
                        'data_type': data_type,
                        'is_nullable': is_nullable
                    })

            # Extract indexes
            cur.execute("""
                SELECT schemaname, tablename, indexname, indexdef
                FROM pg_indexes
                WHERE schemaname NOT LIKE 'pg_%';
            """)
            indexes = cur.fetchall()
            for index in indexes:
                schema_name = index[0]
                table_name = index[1]
                index_name = index[2]
                index_def = index[3]

                if table_name not in metadata['indexes']:
                    metadata['indexes'][table_name] = []

                metadata['indexes'][table_name].append({
                    'index_name': index_name,
                    'index_definition': index_def
                })

    except Exception as e:
        print(f"Error: {e}")
    finally:
        return metadata

# Main function
def main():
    conn = connect_to_db()
    if conn:
        metadata = extract_db_metadata(conn)
        conn.close()

        # Print or process the metadata as needed
        print("Schemas:", metadata['schemas'])
        print("Tables:", metadata['tables'])
        print("Indexes:", metadata['indexes'])

if __name__ == "__main__":
    main()

