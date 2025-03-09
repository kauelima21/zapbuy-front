export interface ProductRequest {
  name: string;
  description: string;
  price_in_cents: number;
  category: string;
}

export interface ProductResponse {
  name: string;
  description: string;
  product_id: string;
  store_slug: string;
  price_in_cents: number;
  category: string;
  status: string;
}
