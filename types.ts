
export enum Category {
  SMARTPHONE = 'Smartphone',
  TABLET = 'Tablet',
  ACCESSORY = 'Accessory',
  WEARABLE = 'Wearable'
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  stock: number;
  specs: {
    screen: string;
    ram: string;
    battery: string;
    storage: string;
  };
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'agent';
  timestamp: Date;
}
