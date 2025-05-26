import { useState, useMemo } from 'react';
import { AiFillHeart } from 'react-icons/ai'; // Mantido para o ícone no header
import { BsCart3, BsFilter, BsShare } from 'react-icons/bs'; // Removido BsGrid3X3Gap, BsList
import { MdSort } from 'react-icons/md'; // Mantido para o ícone de ordenação
import { FaRocket } from 'react-icons/fa'; // Importado para o logo (conceitual)
import { Link } from 'react-router-dom';
import { products } from '../../utils/productsData';
import ProductCard from '../../components/ProductCard/ProductCard';
import EmptyWishlist from '../../components/EmptyWishlist/EmptyWishlist';
import { useShop } from '../../hooks/ShopContext/ShopContext';
import { categories as allCategories } from '../../utils/categoriesData';

const Wishlist = () => {
  const { favItems, toggleFavorite, addAllToCart } = useShop();
  // Removido o estado de viewMode
  const [sortBy, setSortBy] = useState<'recent' | 'price-low' | 'price-high' | 'rating'>('recent');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const favoriteProducts = useMemo(() => {
    return products.filter(product => favItems.includes(product.id));
  }, [favItems]);

  const categories = useMemo(() => {
    const uniqueCategoryIds = Array.from(new Set(favoriteProducts.map(p => p.category)));
    const categoryNames = uniqueCategoryIds.map(id => {
      const category = allCategories.find(cat => cat.id === id);
      return category ? category.name : 'Outros';
    });
    return [
      { id: 'all', name: 'Todas as categorias' },
      ...uniqueCategoryIds.map(id => ({ id, name: categoryNames[uniqueCategoryIds.indexOf(id)] })),
    ];
  }, [favoriteProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = favoriteProducts.filter(
      product => filterCategory === 'all' || product.category === filterCategory,
    );

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [favoriteProducts, filterCategory, sortBy]);

  const handleShareWishlist = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Minha Lista de Desejos',
        text: `Confira minha lista de desejos com ${favoriteProducts.length} produtos incríveis!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (favoriteProducts.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className='min-h-screen bg-gray-50 font-sans antialiased'>
      {/* Container principal para o fundo branco */}
      <div className='bg-white shadow-sm border-b border-gray-100 pb-8'>
        {/* Adicionado padding inferior */}
        {/* Breadcrumb */}
        <div className='max-w-6xl mx-auto px-4 py-4'>
          <nav className='text-sm text-gray-500'>
            <Link to='/' className='hover:text-blue-600 transition-colors duration-200 hover:cursor-pointer'>
              Home
            </Link>
            <span className='mx-2'>/</span>
            <span className='text-gray-800 font-medium'>Meus Favoritos</span>
          </nav>
        </div>
        {/* Header da Wishlist (agora dentro do fundo branco) */}
        <div className='max-w-6xl mx-auto px-4 pt-8'>
          {/* pt-8 para espaçamento do breadcrumb */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6'>
            <div className='flex items-center gap-3'>
              <h1 className='text-3xl font-extrabold text-gray-900'>Minha Lista de Desejos</h1>
            </div>
            <div className='flex items-center gap-4'>
              {/* Add All to Cart */}
              {favoriteProducts.length > 0 && (
                <button
                  onClick={addAllToCart}
                  className='bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg hover:cursor-pointer'
                >
                  <BsCart3 className='w-5 h-5' />
                  Adicionar Todos
                </button>
              )}
              {/* Share */}
              <button
                onClick={handleShareWishlist}
                className='p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md hover:cursor-pointer'
              >
                <BsShare className='w-6 h-6 text-gray-600' />
              </button>
            </div>
          </div>
          {/* Contador de produtos abaixo do título, dentro do contêiner principal */}
          <p className='text-gray-600 mt-2 text-lg px-4 sm:px-0'>
            {/* Adicionado px-4 para alinhamento em mobile */}
            {favoriteProducts.length} produtos salvos
          </p>
        </div>
      </div>
      {/* Fim do contêiner principal com fundo branco */}
      {/* Filtros e Controles */}
      <div className='py-6 border-b border-gray-100'>
        {/* Removido bg-gray-50 pois o fundo será do body */}
        <div className='max-w-6xl mx-auto px-4'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6'>
            {/* Left Controls (Category Filter) */}
            <div className='flex items-center gap-4'>
              <label htmlFor='category-filter' className='sr-only'>
                Filtrar por Categoria
              </label>
              <select
                id='category-filter'
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className='border border-gray-300 rounded-lg px-4 py-2 text-base text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_12px] pr-8 hover:cursor-pointer'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23374151' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
                }}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Right Controls (Sort) - Removido View Mode Buttons */}
            <div className='flex items-center gap-4'>
              {/* Removido o gap-4 para o icon de ordenar */}
              {/* Sort */}
              <label htmlFor='sort-by' className='sr-only'>
                Ordenar por
              </label>
              <select
                id='sort-by'
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className='border border-gray-300 rounded-lg px-4 py-2 text-base text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_12px] pr-8 hover:cursor-pointer'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23374151' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
                }}
              >
                <option value='recent'>Mais recentes</option>
                <option value='price-low'>Menor preço</option>
                <option value='price-high'>Maior preço</option>
                <option value='rating'>Melhor avaliação</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Produtos da Wishlist */}
      <div className='max-w-6xl mx-auto px-4 py-10'>
        {filteredAndSortedProducts.length === 0 ? (
          <div className='text-center py-16 bg-white rounded-xl shadow-lg'>
            <BsFilter className='w-20 h-20 text-gray-300 mx-auto mb-6' />
            <h3 className='text-xl font-semibold text-gray-900 mb-3'>Nenhum produto encontrado</h3>
            <p className='text-gray-600 text-base'>Tente ajustar os filtros para ver mais produtos.</p>
          </div>
        ) : (
          <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {/* Apenas Grid */}
            {filteredAndSortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorited={favItems.includes(product.id)}
                onToggleFavorite={() => toggleFavorite(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
