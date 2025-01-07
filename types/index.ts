export interface Customer {
  customer_id: number;
  name: string;
  email: string;
  phone?: string;
  registration_date: string;
  newsletter_opt_in: boolean;
  subscription_status: string;
}

export interface Order {
  order_id: number;
  customer_id?: number;
  created_at: string;
  status: string;
  total_amount: number;
}

export interface OrderItem {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}