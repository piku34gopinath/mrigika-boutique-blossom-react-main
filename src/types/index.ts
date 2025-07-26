export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'sarees' | 'lehengas' | 'customized' | 'kids';
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}