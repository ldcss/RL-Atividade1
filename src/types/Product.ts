export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  badges: string[];
  rating: number;
  reviewCount: number;
  category: string;
  isFavorite: boolean;
  isOnCart: boolean;
  onFavorite?: () => void;
  onAddToCart?: () => void;
}
