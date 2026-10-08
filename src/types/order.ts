export interface DemoCustomerInfo {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  pincode: string;
  addressSummary?: string; // e.g. masked or neighborhood
}

export interface DemoOrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  lineTotal: number;
}

export interface DemoOrder {
  orderId: string;
  createdAt: string;
  items: DemoOrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customerName: string;
  customerCity: string;
  customerState: string;
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
}
