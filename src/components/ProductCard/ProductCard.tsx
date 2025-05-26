import type { ProductCardProps } from '../../types/ProductCardProps';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsCart3 } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, isFavorited, onToggleFavorite }: ProductCardProps) => {
  const badgeColors = [
    'bg-pink-500', // Rosa mais suave
    'bg-indigo-500', // Azul mais forte
  ];
  // Função para retornar uma cor de badge baseada no índice (para alternar as cores)
  const getBadgeColor = (index: number): string => {
    return badgeColors[index % badgeColors.length];
  };

  return (
    <div className='bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 flex flex-col'>
      {/* Image Container */}
      <div className='relative overflow-hidden'>
        <Link to={`/product/${product.id}`} className='block'>
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.title}
            className='w-full h-48 object-cover rounded-t-xl transition-transform duration-300 hover:scale-110'
          />
        </Link>

        {/* Badge */}
        <div className='absolute top-3 left-3 flex flex-col gap-1'>
          {product.badges.map((badge, index) => (
            <span
              key={index}
              className={`${getBadgeColor(index)} text-white text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm opacity-90`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className='absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300'
        >
          {isFavorited ? (
            <AiFillHeart className='w-5 h-5 text-red-500 hover:cursor-pointer' />
          ) : (
            <AiOutlineHeart className='w-5 h-5 text-gray-400 hover:text-red-500 transition-colors duration-200 hover:cursor-pointer' />
          )}
        </button>
      </div>

      {/* Content */}
      <div className='p-4 pt-3 flex flex-col flex-grow'>
        <div className='flex items-baseline mb-2'>
          <span className='text-xl font-bold text-gray-900'>R$ {product.price.toFixed(2)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className='relative ml-2 text-sm text-gray-500 inline-block px-1'>
              R$ {product.originalPrice.toFixed(2)}
              <span className='absolute left-1/2 top-1/2 w-full h-px bg-red-500 transform -translate-x-1/2 -translate-y-1/2 -rotate-12'></span>
            </span>
          )}
        </div>

        {/* Título do Produto */}
        <div className='h-12'>
          <h3 className='text-lg font-semibold text-gray-900 line-clamp-2 leading-tight overflow-hidden'>
            <Link to={`/product/${product.id}`} className='hover:text-blue-600 transition-colors duration-200'>
              {product.title}
            </Link>
          </h3>
        </div>

        <div className='flex-grow' />

        <div className='flex items-center justify-between border-t border-gray-100 pt-4 mt-4'>
          <div className='flex items-center bg-yellow-500 px-2 py-1 rounded-full gap-1 mr-4'>
            <AiFillStar className='w-4 h-4 text-white' />
            <span className='text-white text-sm font-semibold'>{product.rating.toFixed(1)}</span>
          </div>

          <div className='flex gap-3 items-center'>
            <Link
              to={`/product/${product.id}`}
              className='text-gray-400 hover:text-gray-800 font-medium text-sm transition-colors duration-200 py-1 px-2 hover:cursor-pointer'
            >
              Ver Detalhes
            </Link>
            <button
              onClick={product.onAddToCart}
              className='w-10 h-10 bg-orange-500 text-white rounded-full transition-colors duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-110 hover:cursor-pointer'
            >
              <BsCart3 className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
