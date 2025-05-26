import { useEffect, useState } from 'react';
import CategoryFilter from '../../components/Category/Category';
import Main from '../../components/Main/Main';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../utils/productsData';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../../components/ShopContext/ShopContext';

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl);
  const { favItems, toggleFavorite, addToCart } = useShop();

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

  return (
    <div className='min-h-screen flex flex-col'>
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
    </div>
  );
};

export default Home;
