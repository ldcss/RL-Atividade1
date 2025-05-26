import type { ProductInCart } from '../types/ProductInCart';
import { products } from './productsData';

export function getGroupedCartItems(cartItems: number[]): ProductInCart[] {
  return Object.entries(
    cartItems.reduce<Record<number, number>>((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {}),
  )
    .map(([id, quantity]) => {
      const product = products.find(p => p.id === Number(id));
      if (!product) return null;
      return {
        ...product,
        quantity,
      };
    })
    .filter((item): item is ProductInCart => item !== null);
}
