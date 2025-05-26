import { useEffect, useState } from 'react';
import CategoryFilter from '../../components/Category/Category';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../utils/productsData';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../../hooks/ShopContext/ShopContext';

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl);
  const { favItems, toggleFavorite, addToCart } = useShop();

  // Novo estado para controlar a transição
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState(
    selectedCategory ? products.filter(product => product.category === selectedCategory) : products,
  );

  // Efeito para filtrar produtos e gerenciar a animação
  useEffect(() => {
    // 1. Inicia a transição de saída (fade out)
    setIsTransitioning(true);

    // 2. Define um tempo limite para permitir a animação de saída
    const transitionTimeout = setTimeout(() => {
      // 3. Atualiza a URL da categoria
      if (selectedCategory) {
        setSearchParams({ category: selectedCategory });
      } else {
        searchParams.delete('category');
        setSearchParams(searchParams);
      }

      // 4. Atualiza os produtos exibidos
      const newFilteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;
      setDisplayedProducts(newFilteredProducts);

      // 5. Permite a transição de entrada (fade in)
      setIsTransitioning(false);
    }, 400); // Duração da animação de saída (300ms)

    // Limpa o timeout se o componente for desmontado ou se a categoria mudar novamente
    return () => clearTimeout(transitionTimeout);
  }, [selectedCategory, setSearchParams, searchParams]); // Dependências: categoria selecionada e searchParams

  return (
    <div className='flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full'>
      <CategoryFilter onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
      <div
        className={`
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full
          transition-opacity duration-300 transform ease-in-out
          ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
        `}
      >
        {displayedProducts.map(product => {
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
  );
};

export default Home;
