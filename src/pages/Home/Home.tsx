import { useEffect, useState } from 'react';
import CategoryFilter from '../../components/Category/Category';
import Main from '../../components/Main/Main';
import Navbar from '../../components/Navbar/Navbar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../utils/productsData';
import { useSearchParams } from 'react-router-dom';
import CartPopup from '../../components/CartPopup/CartPopup';
import type { ProductInCart } from '../../types/ProductInCart';

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl);
  const [favItems, setFavItems] = useState<number[]>([]); // Favorite Products IDs
  const [cartItems, setCartItems] = useState<number[]>([]); // Favorite Products IDs
  const [isCartOpen, setIsCartOpen] = useState(false); // Trigger Cart Popup

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  useEffect(() => {
    // Quando a categoria mudar, atualize a URL
    if (selectedCategory) {
      setSearchParams({ category: selectedCategory });
    } else {
      searchParams.delete('category');
      setSearchParams(searchParams);
    }
  }, [selectedCategory, setSearchParams]);

  const toggleFavorite = (productId: number) => {
    setFavItems(prev => (prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]));
  };

  const addToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId]);
  };

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
    <div className='min-h-screen flex flex-col'>
      <Navbar cartItems={cartItems} favItems={favItems} onCartClick={() => setIsCartOpen(true)} />
      <Main>
        <div className='flex flex-col items-center justify-center h-full'>
          {/* Seção de categorias */}
          <CategoryFilter onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />

          <div className='flex flex-wrap gap-8 justify-center mt-8'>
            {filteredProducts.map(product => {
              product.onFavorite = () => toggleFavorite(product.id);
              product.onAddToCart = () => addToCart(product.id);

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorited={favItems.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                />
              );
            })}
          </div>
        </div>
      </Main>
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
  );
};

export default Home;
