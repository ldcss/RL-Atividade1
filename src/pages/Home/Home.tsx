import { useEffect, useState } from 'react';
import CategoryFilter from '../../components/Category/Category';
import Main from '../../components/Main/Main';
import Navbar from '../../components/Navbar/Navbar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../utils/productsData';

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar cartItems={[]} favItems={[]} />
      <Main>
        <div className='flex flex-col items-center justify-center h-full'>
          {/* Seção de categorias */}
          <CategoryFilter onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />

          <div className='flex flex-wrap gap-8 justify-center mt-8'>
            {filteredProducts.map(product => {
              console.log(product.title);
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </div>
      </Main>
    </div>
  );
};

export default Home;
