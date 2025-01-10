export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category: string;
  created_at: Date;
  stock_quantity: number;
  featured: boolean;
}

export interface Customer {
  customer_id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  registration_date: string;
  newsletter_opt_in: boolean;
  subscription_status: string;
}

export interface Order {
  order_id: number;
  customer_id?: number;
  status: string;
  total_amount: number;
  created_at: string;
}

export interface OrderItem {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  loading: boolean;
}

export interface Option {
  value: string;
  label: string;
}
