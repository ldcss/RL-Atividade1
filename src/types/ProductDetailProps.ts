import type { Review } from './Review';

export interface ProductDetailProps {
  images?: string[];
  specifications?: { [key: string]: string };
  reviews?: Review[];
  onAddReview?: (review: { rating: number; comment: string }) => void;
}
