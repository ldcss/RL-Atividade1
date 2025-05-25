import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import CartPopup from './components/CartPopup/CartPopup';
import { products } from './utils/productsData';
import type { ProductInCart } from './types/ProductInCart';
import Wishlist from './pages/Wishlist/Wishlist';

function App() {
  const [favItems, setFavItems] = useState<number[]>([]); // Favorite Products IDs
  const [cartItems, setCartItems] = useState<number[]>([]); // Favorite Products IDs
  const [isCartOpen, setIsCartOpen] = useState(false); // Trigger Cart Popup

  // Atualiza a quantidade de um produto no carrinho
  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prev => {
      // Remove todas as ocorrências do ID
      const filtered = prev.filter(itemId => itemId !== id);
      // Adiciona a nova quantidade
      const newItems = Array(quantity).fill(id);
      return [...filtered, ...newItems];
    });
  };

  // Remove completamente o produto do carrinho
  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(itemId => itemId !== id));
  };

  return (
    <BrowserRouter>
      <div className='min-h-screen flex flex-col'>
        <Navbar cartItems={cartItems} favItems={favItems} onCartClick={() => setIsCartOpen(true)} />
        <Routes>
          <Route
            path='/'
            element={
              <Home favItems={favItems} cartItems={cartItems} setFavItems={setFavItems} setCartItems={setCartItems} />
            }
          />
          <Route path='/produto/:produtoId' element={<ProductDetail />} />
          <Route
            path='/wishlist'
            element={
              <Wishlist
                favoriteProductsIds={favItems}
                onToggleFavorite={id =>
                  setFavItems(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
                }
                onAddToCart={id => setCartItems(prev => (prev.includes(id) ? prev : [...prev, id]))}
                onAddAllToCart={() => {
                  setCartItems(prev => [...new Set([...prev, ...favItems])]);
                }}
                cartItems={cartItems}
              />
            }
          />
        </Routes>
        <CartPopup
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          //manipulação para agrupar produtos iguais
          items={Object.entries(
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
            .filter((item): item is ProductInCart => item !== null)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onItemClick={item => console.log('Item clicado:', item)}
          onCheckout={() => console.log('Finalizar compra')}
          onContinueShopping={() => setIsCartOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
