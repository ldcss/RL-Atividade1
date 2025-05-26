import type { ProductInCart } from './ProductInCart';

export interface CheckoutFormProps {
  cartItems?: ProductInCart[];
  onOrderComplete?: (orderData: any) => void;
}
