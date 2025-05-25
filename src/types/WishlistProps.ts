export interface WishlistProps {
  favoriteProductsIds: number[];
  onToggleFavorite: (id: number) => void;
  onAddToCart: (id: number) => void;
  onAddAllToCart: () => void;
  cartItems: number[];
}
