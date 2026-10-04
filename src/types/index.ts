export interface ProductSpecification {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  formattedPrice: string;
  category: 'Tas' | 'Alat Tulis' | 'Aksesoris' | 'Elektronik';
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  description: string;
  specifications: ProductSpecification[];
  isPopular?: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  itemCount: number;
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentMethod: string;
  courier?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
}

export interface UserAddress {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  fullAddress: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'student' | 'member';
  campus?: string;
  addresses: UserAddress[];
}
