import type { ProductInCart } from '../types/ProductInCart';
import { products } from './productsData';

const parseCartItems = (cartItems: number[]) => {
  const parsedCartItems: ProductInCart[] = Object.entries(
    cartItems.reduce<Record<number, number>>((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {}),
  )
    .map(([id, quantity]) => {
      const product = products.find(p => p.id === Number(id));
      return {
        ...product!,
        quantity,
      };
    })
    .filter((item): item is ProductInCart => item !== null);
  return parsedCartItems;
};

export { parseCartItems };
