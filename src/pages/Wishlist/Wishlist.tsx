import { useState, useMemo } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsCart3, BsGrid3X3Gap, BsList, BsFilter, BsShare } from 'react-icons/bs';
import { MdSort } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { products } from '../../utils/productsData';
import type { Product } from '../../types/Product';
import type { WishlistProps } from '../../types/WishlistProps';
import WishlistProductCard from '../../components/WishlistProductCard/WishlistProductCard';

const Wishlist = ({ favoriteProductsIds, onToggleFavorite, onAddToCart, onAddAllToCart, cartItems }: WishlistProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'price-low' | 'price-high' | 'rating'>('recent');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(
    products.filter(product => favoriteProductsIds.includes(product.id)),
  );

  // Obtém categorias únicas
  const categories = useMemo(() => {
    const cats = Array.from(new Set(favoriteProducts.map(p => p.category)));
    return ['all', ...cats];
  }, [favoriteProducts]);

  // Filtra e ordena produtos
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
        // Assume recent is by ID (higher ID = more recent)
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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  // Empty state
  if (favoriteProducts.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50'>
        {/* Breadcrumb */}
        <div className='bg-white border-b'>
          <div className='max-w-6xl mx-auto px-4 py-3'>
            <nav className='text-sm text-gray-600'>
              <Link to='/' className='hover:text-gray-900'>
                Home
              </Link>{' '}
              <span className='mx-2'>/</span> <span className='text-gray-900'>Meus Favoritos</span>
            </nav>
          </div>
        </div>

        {/* Empty State */}
        <div className='max-w-6xl mx-auto px-4 py-16'>
          <div className='text-center'>
            <AiOutlineHeart className='w-24 h-24 text-gray-300 mx-auto mb-6' />
            <h1 className='text-3xl font-bold text-gray-900 mb-4'>Sua lista de favoritos está vazia</h1>
            <p className='text-gray-600 mb-8 max-w-md mx-auto'>
              Explore nossos produtos e adicione seus favoritos clicando no ícone do coração
            </p>
            <Link
              to='/'
              className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200'
            >
              Explorar Produtos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Breadcrumb */}
      <div className='bg-white border-b'>
        <div className='max-w-6xl mx-auto px-4 py-3'>
          <nav className='text-sm text-gray-600'>
            <Link to='/' className='hover:text-gray-900'>
              Home
            </Link>{' '}
            <span className='mx-2'>/</span> <span className='text-gray-900'>Meus Favoritos</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className='bg-white border-b'>
        <div className='max-w-6xl mx-auto px-4 py-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
                <AiFillHeart className='w-6 h-6 text-red-500' />
                Meus Favoritos
              </h1>
              <p className='text-gray-600 mt-1'>{favoriteProducts.length} produtos salvos</p>
            </div>

            <div className='flex items-center gap-3'>
              {/* Add All to Cart */}
              {favoriteProducts.length > 0 && (
                <button
                  onClick={onAddAllToCart}
                  className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2'
                >
                  <BsCart3 className='w-4 h-4' />
                  Adicionar Todos
                </button>
              )}

              {/* Share */}
              <button
                onClick={handleShareWishlist}
                className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2'
              >
                <BsShare className='w-4 h-4' />
                Compartilhar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className='bg-white border-b'>
        <div className='max-w-6xl mx-auto px-4 py-4'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            {/* Left Controls */}
            <div className='flex items-center gap-4'>
              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas as categorias' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Right Controls */}
            <div className='flex items-center gap-4'>
              {/* Sort */}
              <div className='flex items-center gap-2'>
                <MdSort className='w-4 h-4 text-gray-600' />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value='recent'>Mais recentes</option>
                  <option value='price-low'>Menor preço</option>
                  <option value='price-high'>Maior preço</option>
                  <option value='rating'>Melhor avaliação</option>
                </select>
              </div>

              {/* View Mode */}
              <div className='flex border border-gray-300 rounded-lg overflow-hidden'>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BsGrid3X3Gap className='w-4 h-4' />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BsList className='w-4 h-4' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className='max-w-6xl mx-auto px-4 py-8'>
        {filteredAndSortedProducts.length === 0 ? (
          <div className='text-center py-16'>
            <BsFilter className='w-16 h-16 text-gray-300 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>Nenhum produto encontrado</h3>
            <p className='text-gray-600'>Tente ajustar os filtros para ver mais produtos</p>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
            }`}
          >
            {filteredAndSortedProducts.map(product => (
              <WishlistProductCard
                key={product.id}
                product={product}
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
                isOnCart={cartItems.includes(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
