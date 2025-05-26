import { createContext, useContext, useEffect, useState } from 'react';
import { parseArrayOfNumbers } from '../../utils/parseArrayOfNumbers';
import type { ShopContextType } from '../../types/ShopContextType';

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [favItems, setFavItems] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedFavs = localStorage.getItem('favItems');
    const savedCart = localStorage.getItem('cartItems');

    if (savedFavs) setFavItems(parseArrayOfNumbers(savedFavs));
    if (savedCart) setCartItems(parseArrayOfNumbers(savedCart));

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) localStorage.setItem('favItems', JSON.stringify(favItems));
  }, [favItems, isInitialized]);

  useEffect(() => {
    if (isInitialized) localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems, isInitialized]);

  const toggleFavorite = (id: number) =>
    setFavItems(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));

  const toggleCart = (id: number) =>
    setCartItems(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));

  const addToCart = (productId: number) => {
    setCartItems((prev: any) => [...prev, productId]);
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev => {
      const filtered = prev.filter(itemId => itemId !== id);
      return [...filtered, ...Array(quantity).fill(id)];
    });
  };

  const handleUpdateCartQuantity = (productId: number, quantity: number) => {
    setCartItems(prev => {
      const filtered = prev.filter(id => id !== productId);
      const newItems = Array(quantity).fill(productId);
      return [...filtered, ...newItems];
    });
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(itemId => itemId !== id));
  };

  const addAllToCart = () => {
    setCartItems(prev => [...new Set([...prev, ...favItems])]);
  };

  const clearCart = () => setCartItems([]);

  return (
    <ShopContext.Provider
      value={{
        favItems,
        cartItems,
        toggleFavorite,
        toggleCart,
        addToCart,
        updateQuantity,
        handleUpdateCartQuantity,
        removeItem,
        addAllToCart,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop deve ser usado dentro de ShopProvider');
  }
  return context;
};
