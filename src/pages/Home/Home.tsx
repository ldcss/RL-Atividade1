import { useEffect, useState } from 'react';
import CategoryFilter from '../../components/Category/Category';
import Main from '../../components/Main/Main';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../utils/productsData';
import { useSearchParams } from 'react-router-dom';

interface HomeProps {
  favItems: number[];
  cartItems: number[];
  setFavItems: React.Dispatch<React.SetStateAction<number[]>>;
  setCartItems: React.Dispatch<React.SetStateAction<number[]>>;
}

export const Home = ({ favItems, cartItems, setFavItems, setCartItems }: HomeProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl);

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
    setFavItems((prev: number[]) =>
      prev.includes(productId) ? prev.filter((id: number) => id !== productId) : [...prev, productId],
    );
  };

  const addToCart = (productId: number) => {
    setCartItems((prev: any) => [...prev, productId]);
  };

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
