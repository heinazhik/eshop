import sys
from PyQt6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QTabWidget, QVBoxLayout, QHBoxLayout,
    QLabel, QLineEdit, QPushButton, QTableWidget, QTableWidgetItem, QMessageBox,
    QComboBox, QSpinBox, QDoubleSpinBox, QCheckBox, QTextEdit, QFileDialog, QMenuBar, QMenu
)
from PyQt6.QtCore import Qt
import psycopg2
from datetime import datetime
import json

class DatabaseManager:
    def __init__(self):
        self.conn = psycopg2.connect(
            dbname="ecommerce_db",
            user="admin",
            password="admin123",
            host="localhost"
        )
        self.cur = self.conn.cursor()

    def close(self):
        self.cur.close()
        self.conn.close()

    def execute_query(self, query, params=None):
        try:
            self.cur.execute(query, params)
            self.conn.commit()
            try:
                return self.cur.fetchall()
            except:
                return None
        except Exception as e:
            QMessageBox.critical(None, "Database Error", f"Error executing query: {str(e)}")
            return None

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("E-commerce Management System")
        self.setMinimumSize(800, 600)
        
        self.db = DatabaseManager()
        
        # Create main widget and layout
        main_widget = QWidget()
        self.setCentralWidget(main_widget)
        layout = QVBoxLayout(main_widget)
        
        # Create menu bar
        menubar = self.menuBar()
        file_menu = menubar.addMenu("File")
        
        # Add actions to the menu
        import_action = file_menu.addAction("Import")
        import_action.triggered.connect(self.import_tab_data)
        
        export_action = file_menu.addAction("Export")
        export_action.triggered.connect(self.export_tab_data)
        
        refresh_action = file_menu.addAction("Refresh")
        refresh_action.triggered.connect(self.refresh_tab)
        
        # Create tab widget
        self.tabs = QTabWidget()
        layout.addWidget(self.tabs)
        
        # Create tabs for products, customers, and orders
        self.products_tab = ProductsTab(self.db)
        self.customers_tab = CustomersTab(self.db)
        self.orders_tab = OrdersTab(self.db)
        
        self.tabs.addTab(self.products_tab, "Products")
        self.tabs.addTab(self.customers_tab, "Customers")
        self.tabs.addTab(self.orders_tab, "Orders")

    def refresh_tab(self):
        current_tab_index = self.tabs.currentIndex()
        if current_tab_index == 0:
            self.products_tab.load_data()
        elif current_tab_index == 1:
            self.customers_tab.load_data()
        elif current_tab_index == 2:
            self.orders_tab.load_data()

    def export_tab_data(self):
        current_tab_index = self.tabs.currentIndex()
        if current_tab_index == 0:
            self.export_data(self.products_tab.table, "Products")
        elif current_tab_index == 1:
            self.export_data(self.customers_tab.table, "Customers")
        elif current_tab_index == 2:
            self.export_data(self.orders_tab.table, "Orders")

    def import_tab_data(self):
        current_tab_index = self.tabs.currentIndex()
        if current_tab_index == 0:
            self.products_tab.import_data()
        elif current_tab_index == 1:
            self.customers_tab.import_data()
        elif current_tab_index == 2:
            self.orders_tab.import_data()

    def export_data(self, table, tab_name):
        file_path, _ = QFileDialog.getSaveFileName(self, "Save JSON", "", "JSON Files (*.json)")
        if file_path:
            data = []
            headers = [table.horizontalHeaderItem(i).text() for i in range(table.columnCount())]
            for row in range(table.rowCount()):
                row_data = {}
                for col in range(table.columnCount()):
                    item = table.item(row, col)
                    if item:
                        row_data[headers[col]] = item.text()
                    else:
                        row_data[headers[col]] = None
                data.append(row_data)
            try:
                with open(file_path, 'w') as f:
                    json.dump(data, f, indent=4)
                QMessageBox.information(self, "Success", f"{tab_name} data exported to {file_path}")
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Error exporting {tab_name} data: {str(e)}")

    def closeEvent(self, event):
        self.db.close()
        event.accept()

class ProductsTab(QWidget):
    def __init__(self, db):
        super().__init__()
        self.db = db
        self.setup_ui()
        self.load_data()

    def setup_ui(self):
        layout = QVBoxLayout(self)
        
        # Search section
        search_layout = QHBoxLayout()
        self.search_input = QLineEdit()
        self.search_input.setPlaceholderText("Search products...")
        search_button = QPushButton("Search")
        search_button.clicked.connect(self.search_products)
        search_layout.addWidget(self.search_input)
        search_layout.addWidget(search_button)
        layout.addLayout(search_layout)
        
        # Table
        self.table = QTableWidget()
        self.table.setColumnCount(8)  # Added checkbox column
        self.table.setHorizontalHeaderLabels([
            "ID", "Name", "Category", "Price", "Stock", "Description", "Featured", "Select"
        ])
        layout.addWidget(self.table)
        
        # Form for adding/editing
        form_layout = QHBoxLayout()
        
        self.name_input = QLineEdit()
        self.name_input.setPlaceholderText("Name")
        self.category_input = QLineEdit()
        self.category_input.setPlaceholderText("Category")
        self.price_input = QDoubleSpinBox()
        self.price_input.setMaximum(999999.99)
        self.stock_input = QSpinBox()
        self.stock_input.setMaximum(999999)
        self.description_input = QLineEdit()
        self.description_input.setPlaceholderText("Description")
        self.featured_checkbox = QCheckBox("Featured")

        form_layout.addWidget(self.name_input)
        form_layout.addWidget(self.category_input)
        form_layout.addWidget(self.price_input)
        form_layout.addWidget(self.stock_input)
        form_layout.addWidget(self.description_input)
        form_layout.addWidget(self.featured_checkbox)
        
        layout.addLayout(form_layout)
        
        # Buttons
        button_layout = QHBoxLayout()
        add_button = QPushButton("Add Product")
        update_button = QPushButton("Update Selected")
        delete_button = QPushButton("Delete Selected")
        
        add_button.clicked.connect(self.add_product)
        update_button.clicked.connect(self.update_product)
        delete_button.clicked.connect(self.delete_product)
        
        button_layout.addWidget(add_button)
        button_layout.addWidget(update_button)
        button_layout.addWidget(delete_button)
        layout.addLayout(button_layout)

    def load_data(self):
        results = self.db.execute_query("SELECT product_id, name, category, price, stock_quantity, description, featured FROM products")
        if results:
            self.table.setRowCount(len(results))
            for i, row in enumerate(results):
                for j, value in enumerate(row):
                    self.table.setItem(i, j, QTableWidgetItem(str(value)))
                # Add checkbox to the last column
                checkbox = QTableWidgetItem()
                checkbox.setCheckState(Qt.CheckState.Unchecked)
                self.table.setItem(i, 7, checkbox)
        else:
            self.table.setRowCount(0)

    def search_products(self):
        search_term = self.search_input.text()
        query = """
        SELECT product_id, name, category, price, stock_quantity, description, featured 
        FROM products 
        WHERE name ILIKE %s OR description ILIKE %s
        """
        results = self.db.execute_query(query, (f'%{search_term}%', f'%{search_term}%'))
        if results:
            self.table.setRowCount(len(results))
            for i, row in enumerate(results):
                for j, value in enumerate(row):
                    self.table.setItem(i, j, QTableWidgetItem(str(value)))
                # Add checkbox to the last column
                checkbox = QTableWidgetItem()
                checkbox.setCheckState(Qt.CheckState.Unchecked)
                self.table.setItem(i, 7, checkbox)
        else:
            self.table.setRowCount(0)

    def add_product(self):
        query = """
        INSERT INTO products (name, category, price, stock_quantity, description, featured)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        try:
            self.db.execute_query(query, (
                self.name_input.text(),
                self.category_input.text(),
                self.price_input.value(),
                self.stock_input.value(),
                self.description_input.text(),
                self.featured_checkbox.isChecked()
            ))
            self.load_data()
            QMessageBox.information(self, "Success", "Product added successfully!")
            self.clear_inputs()
        except Exception as e:
            QMessageBox.critical(self, "Error", f"Error adding product: {str(e)}")

    def update_product(self):
        selected_row = self.get_selected_row()
        if selected_row is None:
            QMessageBox.warning(self, "Warning", "No product selected!")
            return
        
        product_id = self.table.item(selected_row, 0).text()
        query = """
        UPDATE products 
        SET name=%s, category=%s, price=%s, stock_quantity=%s, description=%s, featured=%s
        WHERE product_id=%s
        """
        try:
            self.db.execute_query(query, (
                self.name_input.text(),
                self.category_input.text(),
                self.price_input.value(),
                self.stock_input.value(),
                self.description_input.text(),
                self.featured_checkbox.isChecked(),
                product_id
            ))
            self.load_data()
            QMessageBox.information(self, "Success", "Product updated successfully!")
            self.clear_inputs()
        except Exception as e:
            QMessageBox.critical(self, "Error", f"Error updating product: {str(e)}")

    def delete_product(self):
        selected_row = self.get_selected_row()
        if selected_row is None:
            QMessageBox.warning(self, "Warning", "No product selected!")
            return
        
        product_id = self.table.item(selected_row, 0).text()
        reply = QMessageBox.question(self, "Delete Product", "Are you sure you want to delete this product?",
                                     QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No)
        if reply == QMessageBox.StandardButton.Yes:
            query = "DELETE FROM products WHERE product_id = %s"
            try:
                self.db.execute_query(query, (product_id,))
                self.load_data()
                QMessageBox.information(self, "Success", "Product deleted successfully!")
                self.clear_inputs()
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Error deleting product: {str(e)}")

    def clear_inputs(self):
        self.name_input.clear()
        self.category_input.clear()
        self.price_input.setValue(0.0)
        self.stock_input.setValue(0)
        self.description_input.clear()
        self.featured_checkbox.setChecked(False)

    def get_selected_row(self):
        for row in range(self.table.rowCount()):
            if self.table.item(row, 7).checkState() == Qt.CheckState.Checked:
                return row
        return None

    def import_data(self):
        file_path, _ = QFileDialog.getOpenFileName(self, "Open JSON", "", "JSON Files (*.json)")
        if file_path:
            try:
                with open(file_path, 'r') as f:
                    data = json.load(f)
                    for item in data:
                        query = """
                        INSERT INTO products (name, category, price, stock_quantity, description, featured)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        """
                        self.db.execute_query(query, (
                            item.get("Name", ""),
                            item.get("Category", ""),
                            float(item.get("Price", 0)),
                            int(item.get("Stock", 0)),
                            item.get("Description", ""),
                            item.get("Featured", False)
                        ))
                self.load_data()
                QMessageBox.information(self, "Success", "Products imported successfully!")
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Error importing products: {str(e)}")

class CustomersTab(QWidget):
    def __init__(self, db):
        super().__init__()
        self.db = db
        self.setup_ui()
        self.load_data()

    def setup_ui(self):
        layout = QVBoxLayout(self)
        
        # Search section
        search_layout = QHBoxLayout()
        self.search_input = QLineEdit()
        self.search_input.setPlaceholderText("Search customers...")
        search_button = QPushButton("Search")
        search_button.clicked.connect(self.search_customers)
        search_layout.addWidget(self.search_input)
        search_layout.addWidget(search_button)
        layout.addLayout(search_layout)

        # Table
        self.table = QTableWidget()
        self.table.setColumnCount(8)  # Added checkbox column
        self.table.setHorizontalHeaderLabels([
            "ID", "Name", "Email", "Phone", "Address", "Registration Date", "Newsletter", "Select"
        ])
        layout.addWidget(self.table)
        
        # Form for adding/editing
        form_layout = QHBoxLayout()
        
        self.name_input = QLineEdit()
        self.name_input.setPlaceholderText("Name")
        self.email_input = QLineEdit()
        self.email_input.setPlaceholderText("Email")
        self.phone_input = QLineEdit()
        self.phone_input.setPlaceholderText("Phone")
        self.address_input = QTextEdit()
        self.address_input.setPlaceholderText("Address")
        self.newsletter_checkbox = QCheckBox("Newsletter Opt-In")
        
        form_layout.addWidget(self.name_input)
        form_layout.addWidget(self.email_input)
        form_layout.addWidget(self.phone_input)
        form_layout.addWidget(self.address_input)
        form_layout.addWidget(self.newsletter_checkbox)

        layout.addLayout(form_layout)
        
        # Buttons
        button_layout = QHBoxLayout()
        add_button = QPushButton("Add Customer")
        update_button = QPushButton("Update Selected")
        delete_button = QPushButton("Delete Selected")
        
        add_button.clicked.connect(self.add_customer)
        update_button.clicked.connect(self.update_customer)
        delete_button.clicked.connect(self.delete_customer)
        
        button_layout.addWidget(add_button)
        button_layout.addWidget(update_button)
        button_layout.addWidget(delete_button)
        layout.addLayout(button_layout)

    def load_data(self):
        results = self.db.execute_query("SELECT customer_id, name, email, phone, address, registration_date, newsletter_opt_in FROM customers")
        if results:
            self.table.setRowCount(len(results))
            for i, row in enumerate(results):
                for j, value in enumerate(row):
                    if j == 4 and value:
                        self.table.setItem(i, j, QTableWidgetItem(json.dumps(value)))
                    else:
                        self.table.setItem(i, j, QTableWidgetItem(str(value)))
                # Add checkbox to the last column
                checkbox = QTableWidgetItem()
                checkbox.setCheckState(Qt.CheckState.Unchecked)
                self.table.setItem(i, 7, checkbox)
        else:
            self.table.setRowCount(0)

    def search_customers(self):
        search_term = self.search_input.text()
        query = """
        SELECT customer_id, name, email, phone, address, registration_date, newsletter_opt_in
        FROM customers 
        WHERE name ILIKE %s OR email ILIKE %s
        """
        results = self.db.execute_query(query, (f'%{search_term}%', f'%{search_term}%'))
        if results:
            self.table.setRowCount(len(results))
            for i, row in enumerate(results):
                for j, value in enumerate(row):
                    if j == 4 and value:
                        self.table.setItem(i, j, QTableWidgetItem(json.dumps(value)))
                    else:
                        self.table.setItem(i, j, QTableWidgetItem(str(value)))
                # Add checkbox to the last column
                checkbox = QTableWidgetItem()
                checkbox.setCheckState(Qt.CheckState.Unchecked)
                self.table.setItem(i, 7, checkbox)
        else:
            self.table.setRowCount(0)

    def add_customer(self):
        query = """
        INSERT INTO customers (name, email, phone, address, newsletter_opt_in)
        VALUES (%s, %s, %s, %s, %s)
        """
        try:
            address_json = json.loads(self.address_input.toPlainText() or "{}")
            self.db.execute_query(query, (
                self.name_input.text(),
                self.email_input.text(),
                self.phone_input.text(),
                address_json,
                self.newsletter_checkbox.isChecked()
            ))
            self.load_data()
            QMessageBox.information(self, "Success", "Customer added successfully!")
            self.clear_inputs()
        except Exception as e:
            QMessageBox.critical(self, "Error", f"Error adding customer: {str(e)}")

    def update_customer(self):
        selected_row = self.get_selected_row()
        if selected_row is None:
            QMessageBox.warning(self, "Warning", "No customer selected!")
            return
        
        customer_id = self.table.item(selected_row, 0).text()
        query = """
        UPDATE customers 
        SET name=%s, email=%s, phone=%s, address=%s, newsletter_opt_in=%s
        WHERE customer_id=%s
        """
        try:
            address_json = json.loads(self.address_input.toPlainText() or "{}")
            self.db.execute_query(query, (
                self.name_input.text(),
                self.email_input.text(),
                self.phone_input.text(),
                address_json,
                self.newsletter_checkbox.isChecked(),
                customer_id
            ))
            self.load_data()
            QMessageBox.information(self, "Success", "Customer updated successfully!")
            self.clear_inputs()
        except Exception as e:
            QMessageBox.critical(self, "Error", f"Error updating customer: {str(e)}")

    def delete_customer(self):
        selected_row = self.get_selected_row()
        if selected_row is None:
            QMessageBox.warning(self, "Warning", "No customer selected!")
            return
        
        customer_id = self.table.item(selected_row, 0).text()
        reply = QMessageBox.question(self, "Delete Customer", "Are you sure you want to delete this customer?",
                                     QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No)
        if reply == QMessageBox.StandardButton.Yes:
            query = "DELETE FROM customers WHERE customer_id = %s"
            try:
                self.db.execute_query(query, (customer_id,))
                self.load_data()
                QMessageBox.information(self, "Success", "Customer deleted successfully!")
                self.clear_inputs()
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Error deleting customer: {str(e)}")

    def clear_inputs(self):
        self.name_input.clear()
        self.email_input.clear()
        self.phone_input.clear()
        self.address_input.clear()
        self.newsletter_checkbox.setChecked(False)

    def get_selected_row(self):
        for row in range(self.table.rowCount()):
            if self.table.item(row, 7).checkState() == Qt.CheckState.Checked:
                return row
        return None

    def import_data(self):
        file_path, _ = QFileDialog.getOpenFileName(self, "Open JSON", "", "JSON Files (*.json)")
        if file_path:
            try:
                with open(file_path, 'r') as f:
                    data = json.load(f)
                    for item in data:
                        query = """
                        INSERT INTO customers (name, email, phone, address, newsletter_opt_in)
                        VALUES (%s, %s, %s, %s, %s)
                        """
                        self.db.execute_query(query, (
                            item.get("Name", ""),
                            item.get("Email", ""),
                            item.get("Phone", ""),
                            json.dumps(item.get("Address", {})),
                            item.get("Newsletter Opt-In", False)
                        ))
                self.load_data()
                QMessageBox.information(self, "Success", "Customers imported successfully!")
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Error importing customers: {str(e)}")

class OrdersTab(QWidget):
    def __init__(self, db):
        super().__init__()
        self.db = db
        self.setup_ui()
        self.load_data()

    def setup_ui(self):
        layout = QVBoxLayout(self)
        
        # Search section
        search_layout = QHBoxLayout()
        self.search_input = QLineEdit()
        self.search_input.setPlaceholderText("Search orders...")
        search_button = QPushButton("Search")
        search_button.clicked.connect(self.search_orders)
        search_layout.addWidget(self.search_input)
        search_layout.addWidget(search_button)
        layout.addLayout(search_layout)
        
        # Table
        self.table = QTableWidget()
        self.table.setColumnCount(6)  # Added checkbox column
        self.table.setHorizontalHeaderLabels([
            "ID", "Customer", "Status", "Total Amount", "Created At", "Select"
        ])
        layout.addWidget(self.table)
        
        # Form for adding/editing
        form_layout = QHBoxLayout()
        
        self.customer_combo = QComboBox()
        self.customer_combo.addItem("Select Customer")
        self.load_customers_into_combobox()
        self.status_input = QLineEdit()
        self.status_input.setPlaceholderText("Status")
        self.total_amount_input = QDoubleSpinBox()
        self.total_amount_input.setMaximum(999999.99)
        
        form_layout.addWidget(self.customer_combo)
        form_layout.addWidget(self.status_input)
        form_layout.addWidget(self.total_amount_input)
        
        layout.addLayout(form_layout)

        # Order Items Section
        order_items_layout = QVBoxLayout()
        order_items_label = QLabel("Order Items")
        order_items_layout.addWidget(order_items_label)

        self.order_items_table = QTableWidget()
        self.order_items_table.setColumnCount(4)
        self.order_items_table.setHorizontalHeaderLabels(["Product", "Quantity", "Price", "Total"])
        order_items_layout.addWidget(self.order_items_table)

         # Order Items Form
        order_item_form_layout = QHBoxLayout()
        self.product_combo = QComboBox()
        self.product_combo.addItem("Select Product")
        self.load_products_into_combobox()
        self.quantity_spinbox = QSpinBox()
        self.quantity_spinbox.setMaximum(99999)
        self.price_spinbox = QDoubleSpinBox()
        self.price_spinbox.setMaximum(999999.99)
        order_item_form_layout.addWidget(self.product_combo)
        order_item_form_layout.addWidget(self.quantity_spinbox)
        order_item_form_layout.addWidget(self.price_spinbox)

        add_order_item_button = QPushButton("Add Item")
        add_order_item_button.clicked.connect(self.add_order_item)
        order_item_form_layout.addWidget(add_order_item_button)
        order_items_layout.addLayout(order_item_form_layout)

        layout.addLayout(order_items_layout)
        
        # Buttons
        button_layout = QHBoxLayout()
        add_button = QPushButton("Add Order")
        update_button = QPushButton("Update Selected")
        delete_button = QPushButton("Delete Selected")
        
        add_button.clicked.connect(self.add_order)
        update_button.clicked.connect(self.update_order)
        delete_button.clicked.connect(self.delete_order)
        
        button_layout.addWidget(add_button)
        button_layout.addWidget(update_button)
        button_layout.addWidget(delete_button)
        layout.addLayout(button_layout)
        
        self.selected_order_id = None # To keep track of the order_id when updating or deleting

    def load_data(self):
        results = self.db.execute_query("SELECT order_id, customer_id, status, total_amount, created_at FROM orders")
        if results:
            self.table.setRowCount(len(results))
            for i, row in enumerate(results):
                customer_name = self.get_customer_name(row[1])
                self.table.setItem(i, 0, QTableWidgetItem(str(row[0])))
                self.table.setItem(i, 1, QTableWidgetItem(customer_name))
                self.table.setItem(i, 2, QTableWidgetItem(str(row[2])))
                self.table.setItem(i, 3, QTableWidgetItem(str(row[3])))
                self.table.setItem(i, 4, QTableWidgetItem(str(row[4])))
                # Add checkbox to the last column
                checkbox = QTableWidgetItem()
                checkbox.setCheckState(Qt.CheckState.Unchecked)
                self.table.setItem(i, 5, checkbox)
        else:
            self.table.setRowCount(0)
    
    def load_customers_into_combobox(self):
        customers = self.db.execute_query("SELECT customer_id, name FROM customers")
        if customers:
            for customer_id, name in customers:
                self.customer_combo.addItem(name, customer_id)

    def load_products_into_combobox(self):
        products = self.db.execute_query("SELECT product_id, name, price FROM products")
        if products:
           for product_id, name, price in products:
              self.product_combo.addItem(name, (product_id, price))
    
    def get_customer_name(self, customer_id):
        if customer_id:
            query = "SELECT name FROM customers WHERE customer_id = %s"
            result = self.db.execute_query(query, (customer_id,))
            if result:
                return result[0][0]
        return "Unknown"

    def search_orders(self):
         search_term = self.search_input.text()
         query = """
            SELECT o.order_id, o.customer_id, o.status, o.total_amount, o.created_at
            FROM orders o
            INNER JOIN customers c ON o.customer_id = c.customer_id
            WHERE o.order_id::text ILIKE %s OR c.name ILIKE %s OR o.status ILIKE %s
        """
         results = self.db.execute_query(query, (f'%{search_term}%', f'%{search_term}%', f'%{search_term}%'))
         if results:
            self.table.setRowCount(len(results))
            for i, row in enumerate(results):
                  customer_name = self.get_customer_name(row[1])
                  self.table.setItem(i, 0, QTableWidgetItem(str(row[0])))
                  self.table.setItem(i, 1, QTableWidgetItem(customer_name))
                  self.table.setItem(i, 2, QTableWidgetItem(str(row[2])))
                  self.table.setItem(i, 3, QTableWidgetItem(str(row[3])))
                  self.table.setItem(i, 4, QTableWidgetItem(str(row[4])))
                  # Add checkbox to the last column
                  checkbox = QTableWidgetItem()
                  checkbox.setCheckState(Qt.CheckState.Unchecked)
                  self.table.setItem(i, 5, checkbox)
         else:
              self.table.setRowCount(0)

    def add_order(self):
        selected_customer_index = self.customer_combo.currentIndex()
        if selected_customer_index == 0:
            QMessageBox.warning(self, "Warning", "Please select a customer for the order.")
            return

        customer_id = self.customer_combo.itemData(selected_customer_index)
        query = """
            INSERT INTO orders (customer_id, status, total_amount)
            VALUES (%s, %s, %s)
        """
        try:
             self.db.execute_query(query, (
                 customer_id,
                 self.status_input.text(),
                 self.total_amount_input.value()
            ))
             self.load_data()
             QMessageBox.information(self, "Success", "Order added successfully!")
             self.clear_inputs()
        except Exception as e:
              QMessageBox.critical(self, "Error", f"Error adding order: {str(e)}")

    def update_order(self):
        selected_row = self.get_selected_row()
        if selected_row is None:
             QMessageBox.warning(self, "Warning", "Please select an order to update")
             return
        
        order_id = self.table.item(selected_row, 0).text()
        selected_customer_index = self.customer_combo.currentIndex()
        if selected_customer_index == 0:
             QMessageBox.warning(self, "Warning", "Please select a customer for the order.")
             return
        customer_id = self.customer_combo.itemData(selected_customer_index)
        
        query = """
            UPDATE orders
            SET customer_id=%s, status=%s, total_amount=%s
            WHERE order_id=%s
        """
        try:
            self.db.execute_query(query, (
                customer_id,
                self.status_input.text(),
                self.total_amount_input.value(),
                order_id
            ))
            self.load_data()
            QMessageBox.information(self, "Success", "Order updated successfully!")
            self.clear_inputs()
        except Exception as e:
            QMessageBox.critical(self, "Error", f"Error updating order: {str(e)}")

    def delete_order(self):
        selected_row = self.get_selected_row()
        if selected_row is None:
            QMessageBox.warning(self, "Warning", "Please select an order to delete")
            return
        
        order_id = self.table.item(selected_row, 0).text()
        reply = QMessageBox.question(self, "Delete Order", "Are you sure you want to delete this order?",
                                     QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No)
        if reply == QMessageBox.StandardButton.Yes:
            try:
                # First delete order items related to this order
                delete_items_query = "DELETE FROM order_items WHERE order_id = %s"
                self.db.execute_query(delete_items_query, (order_id,))
                # Then delete the order
                delete_order_query = "DELETE FROM orders WHERE order_id = %s"
                self.db.execute_query(delete_order_query, (order_id,))

                self.load_data()
                QMessageBox.information(self, "Success", "Order deleted successfully!")
                self.clear_inputs()

            except Exception as e:
                QMessageBox.critical(self, "Error", f"Error deleting order: {str(e)}")

    def add_order_item(self):
         current_row = self.table.currentRow()
         if current_row < 0:
            QMessageBox.warning(self, "Warning", "Please select an order to add items to.")
            return

         order_id = self.table.item(current_row, 0).text()
         selected_product_index = self.product_combo.currentIndex()
         if selected_product_index == 0:
             QMessageBox.warning(self, "Warning", "Please select a product.")
             return

         product_data = self.product_combo.itemData(selected_product_index)
         product_id, product_price = product_data
         quantity = self.quantity_spinbox.value()
         price = self.price_spinbox.value()

         if quantity <= 0 or price <= 0:
            QMessageBox.warning(self, "Warning", "Quantity and price must be greater than zero.")
            return

         try:
             query = """
               INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES (%s, %s, %s, %s)
             """
             self.db.execute_query(query,(order_id,product_id,quantity, price))
             self.load_order_items(order_id)
             QMessageBox.information(self, "Success", "Order item added successfully")
         except Exception as e:
              QMessageBox.critical(self, "Error", f"Error adding order item: {str(e)}")

    def clear_inputs(self):
        self.customer_combo.setCurrentIndex(0)
        self.status_input.clear()
        self.total_amount_input.setValue(0.0)
        self.product_combo.setCurrentIndex(0)
        self.quantity_spinbox.setValue(0)
        self.price_spinbox.setValue(0.0)
        self.order_items_table.setRowCount(0)

    def load_order_items(self, order_id):
        query = """
        SELECT oi.product_id, oi.quantity, oi.price, p.name 
        FROM order_items oi
        JOIN products p ON oi.product_id = p.product_id
        WHERE order_id = %s
        """
        results = self.db.execute_query(query,(order_id,))
        if results:
            self.order_items_table.setRowCount(len(results))
            for i, row in enumerate(results):
                 product_name = row[3]
                 quantity = row[1]
                 price = row[2]
                 total = quantity * price
                 self.order_items_table.setItem(i,0, QTableWidgetItem(product_name))
                 self.order_items_table.setItem(i,1, QTableWidgetItem(str(quantity)))
                 self.order_items_table.setItem(i,2, QTableWidgetItem(str(price)))
                 self.order_items_table.setItem(i,3, QTableWidgetItem(str(total)))
        else:
             self.order_items_table.setRowCount(0)

    def get_selected_row(self):
        for row in range(self.table.rowCount()):
            if self.table.item(row, 5).checkState() == Qt.CheckState.Checked:
                return row
        return None

    def import_data(self):
        file_path, _ = QFileDialog.getOpenFileName(self, "Open JSON", "", "JSON Files (*.json)")
        if file_path:
            try:
                with open(file_path, 'r') as f:
                    data = json.load(f)
                    for item in data:
                        query = """
                        INSERT INTO orders (customer_id, status, total_amount)
                        VALUES (%s, %s, %s)
                        """
                        self.db.execute_query(query, (
                            item.get("Customer ID", ""),
                            item.get("Status", ""),
                            float(item.get("Total Amount", 0))
                        ))
                self.load_data()
                QMessageBox.information(self, "Success", "Orders imported successfully!")
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Error importing orders: {str(e)}")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())

