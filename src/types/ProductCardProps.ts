import type { Product } from './Product';

export interface ProductCardProps {
  product: Product;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}
