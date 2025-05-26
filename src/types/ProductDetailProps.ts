import type { Review } from './Review';
interface ReviewInput {
  rating: number;
  comment: string;
}

export interface ProductDetailProps {
  images?: string[];
  specifications?: Record<string, string>;
  reviews?: Review[];
  onAddReview?: (review: ReviewInput) => void;
  onToggleCart: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  favItems: number[];
  cartItems: number[];
}
