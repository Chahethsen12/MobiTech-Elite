
import { Category, Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: Category.SMARTPHONE,
    price: 1199,
    description: 'The ultimate iPhone with Titanium design and A17 Pro chip.',
    image: 'https://picsum.photos/seed/iphone15/400/300',
    stock: 12,
    specs: { screen: '6.7" OLED', ram: '8GB', battery: '4441mAh', storage: '256GB' },
    rating: 4.9
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: Category.SMARTPHONE,
    price: 1299,
    description: 'Galaxy AI is here. Experience the ultimate Android flagship.',
    image: 'https://picsum.photos/seed/s24u/400/300',
    stock: 8,
    specs: { screen: '6.8" AMOLED', ram: '12GB', battery: '5000mAh', storage: '512GB' },
    rating: 4.8
  },
  {
    id: '3',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    category: Category.SMARTPHONE,
    price: 999,
    description: 'The best camera in any smartphone, powered by Google AI.',
    image: 'https://picsum.photos/seed/p8p/400/300',
    stock: 15,
    specs: { screen: '6.7" LTPO', ram: '12GB', battery: '5050mAh', storage: '128GB' },
    rating: 4.7
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: Category.ACCESSORY,
    price: 349,
    description: 'Industry-leading noise cancellation for premium audio.',
    image: 'https://picsum.photos/seed/sony/400/300',
    stock: 20,
    specs: { screen: 'N/A', ram: 'N/A', battery: '30h', storage: 'N/A' },
    rating: 4.9
  },
  {
    id: '5',
    name: 'iPad Pro M2',
    brand: 'Apple',
    category: Category.TABLET,
    price: 1099,
    description: 'Performance beyond limits with the M2 chip.',
    image: 'https://picsum.photos/seed/ipad/400/300',
    stock: 5,
    specs: { screen: '12.9" Liquid Retina', ram: '16GB', battery: '10758mAh', storage: '1TB' },
    rating: 4.9
  },
  {
    id: '6',
    name: 'Nothing Phone (2)',
    brand: 'Nothing',
    category: Category.SMARTPHONE,
    price: 599,
    description: 'The unique Glyph Interface meets premium hardware.',
    image: 'https://picsum.photos/seed/nothing/400/300',
    stock: 10,
    specs: { screen: '6.7" OLED', ram: '12GB', battery: '4700mAh', storage: '256GB' },
    rating: 4.5
  }
];
