export type ShopContextType = {
  favItems: number[];
  cartItems: number[];
  toggleFavorite: (id: number) => void;
  toggleCart: (id: number) => void;
  addToCart: (productId: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  handleUpdateCartQuantity: (productId: number, quantity: number) => void;
  removeItem: (id: number) => void;
  addAllToCart: () => void;
  clearCart: () => void;
};
