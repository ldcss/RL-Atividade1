import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import CartPopup from './components/CartPopup/CartPopup';
import { products } from './utils/productsData';
import type { ProductInCart } from './types/ProductInCart';
import Wishlist from './pages/Wishlist/Wishlist';
import { parseArrayOfNumbers } from './utils/parseArrayOfNumbers';
import CheckoutForm from './pages/CheckoutForm/CheckoutForm';
import { parseCartItems } from './utils/parsedCartItems';

function App() {
  const [favItems, setFavItems] = useState<number[]>([]); // Favorite Products IDs
  const [cartItems, setCartItems] = useState<number[]>([]); // Favorite Products IDs
  const [isCartOpen, setIsCartOpen] = useState(false); // Trigger Cart Popup
  const [isInitialized, setIsInitialized] = useState(false); //

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

  const handleToggleFavorite = (id: number) => {
    setFavItems(prev => (prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]));
  };

  const handleToggleCart = (id: number) => {
    setCartItems(prev => (prev.includes(id) ? prev.filter(cartId => cartId !== id) : [...prev, id]));
  };

  const handleUpdateCartQuantity = (productId: number, quantity: number) => {
    setCartItems(prev => {
      const filtered = prev.filter(id => id !== productId);
      const newItems = Array(quantity).fill(productId);
      return [...filtered, ...newItems];
    });
  };

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('favItems', JSON.stringify(favItems));
    }
  }, [favItems, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // Carrega dados salvos do localStorage ao iniciar
  useEffect(() => {
    const savedFavs = localStorage.getItem('favItems');
    const savedCart = localStorage.getItem('cartItems');

    if (savedFavs) {
      setFavItems(parseArrayOfNumbers(localStorage.getItem('favItems')));
    }

    if (savedCart) {
      setCartItems(parseArrayOfNumbers(localStorage.getItem('cartItems')));
    }
    setIsInitialized(true);
  }, []);

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
          <Route
            path='/produto/:produtoId'
            element={
              <ProductDetail
                images={[]} // ou passe imagens relevantes
                specifications={{}}
                reviews={[]} // ou passe reviews relevantes
                onAddReview={review => {}}
                onToggleCart={handleToggleCart}
                onToggleFavorite={handleToggleFavorite}
                favItems={favItems}
                cartItems={cartItems}
                onUpdateCartQuantity={handleUpdateCartQuantity}
              />
            }
          />
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
          <Route
            path='/checkout'
            element={
              <CheckoutForm
                cartItems={parseCartItems(cartItems)}
                onOrderComplete={data => {
                  console.log('Pedido finalizado com sucesso:', data);
                  setCartItems([]); // Limpa o carrinho após o pedido
                }}
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
          onContinueShopping={() => setIsCartOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
