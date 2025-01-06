export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category: string;
  created_at: string;
  stock_quantity: number;
}
