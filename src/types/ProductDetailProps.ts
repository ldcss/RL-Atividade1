import type { Review } from './Review';

export interface ReviewInput {
  rating: number;
  comment: string;
}

export interface ProductDetailProps {
  images?: string[];
  specifications?: Record<string, string>;
  reviews?: Review[];
  onAddReview?: (review: ReviewInput) => void;
}
