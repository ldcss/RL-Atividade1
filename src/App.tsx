import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import CartPopup from './components/CartPopup/CartPopup';
import Wishlist from './pages/Wishlist/Wishlist';
import CheckoutForm from './pages/CheckoutForm/CheckoutForm';
import { ShopProvider } from './hooks/ShopContext/ShopContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ShopProvider>
      <BrowserRouter>
        <div className='min-h-screen flex flex-col bg-gray-50 font-sans antialiased'>
          <Navbar onCartClick={() => setIsCartOpen(true)} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/product/:produtoId'
              element={
                <ProductDetail
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
