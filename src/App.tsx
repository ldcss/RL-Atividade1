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
import { ShopProvider } from './components/ShopContext/ShopContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false); // Trigger Cart Popup

  return (
    <ShopProvider>
      <BrowserRouter>
        <div className='min-h-screen flex flex-col'>
          <Navbar onCartClick={() => setIsCartOpen(true)} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/produto/:produtoId'
              element={
                <ProductDetail
                  images={[]} // ou passe imagens relevantes
                  specifications={{}}
                  reviews={[]} // ou passe reviews relevantes
                  onAddReview={review => {
                    console.log('review:', review);
                  }}
                />
              }
            />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/checkout' element={<CheckoutForm />} />
          </Routes>
          <CartPopup
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onItemClick={item => console.log('Item clicado:', item)}
            onContinueShopping={() => setIsCartOpen(false)}
          />
        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
