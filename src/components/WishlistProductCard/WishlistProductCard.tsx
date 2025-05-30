import { Link } from 'react-router-dom';
import type { Product } from '../../types/Product';
import { BsCart3 } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';

const WishlistProductCard = ({
  product,
  onToggleFavorite,
  onAddToCart,
  isOnCart,
}: {
  product: Product;
  onToggleFavorite: (id: number) => void;
  onAddToCart: (id: number) => void;
  isOnCart: boolean;
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className='text-yellow-500'>
            ★
          </span>,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className='text-yellow-500'>
            ☆
          </span>,
        );
      } else {
        stars.push(
          <span key={i} className='text-gray-300'>
            ☆
          </span>,
        );
      }
    }

    return stars;
  };

  return (
    <div className='bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden max-w-sm mx-auto hover:scale-105 transform transition-transform duration-300'>
      <div className='relative group-hover:opacity-75 hover:cursor-pointer'>
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.title}
            className='w-full h-48 sm:h-56 object-cover cursor-pointer'
          />
        </Link>

        <div className='absolute top-3 left-3 flex flex-col gap-1'>
          {product.badges.map((badge, index) => (
            <span key={index} className='bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm'>
              {badge}
            </span>
          ))}
        </div>

        <button
          onClick={() => onToggleFavorite(product.id)}
          className='absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 hover:cursor-pointer'
        >
          <AiFillHeart className='w-5 h-5 text-red-500 hover:text-red-600' />
        </button>
      </div>

      <div className='p-4'>
        {/* Title and Price */}
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2'>
          <h3 className='text-lg font-semibold text-gray-900 line-clamp-2 flex-1'>{product.title}</h3>
          <div className='flex flex-col items-start sm:items-end'>
            <span className='text-xl font-bold text-green-600'>R$ {product.price.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className='text-sm text-gray-500 line-through'>R$ {product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className='flex items-center gap-2 mb-3'>
          <div className='flex items-center gap-1'>{renderStars(product.rating)}</div>
          <span className='text-sm font-medium text-gray-700'>{product.rating.toFixed(1)}</span>
          <span className='text-sm text-gray-500'>({product.reviewCount} avaliações)</span>
        </div>

        {/* Category */}
        <div className='mb-3'>
          <span className='inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full'>
            {product.category}
          </span>
        </div>
        <p className='text-gray-600 text-sm mb-4 line-clamp-3'>{product.description}</p>

        {/* Buy Button */}
        <button
          onClick={() => onAddToCart(product.id)}
          className={`w-full ${
            isOnCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2`}
          disabled={isOnCart}
        >
          <BsCart3 className='w-5 h-5' />
          {isOnCart ? 'No Carrinho' : 'Adicionar ao Carrinho'}
        </button>
      </div>
    </div>
  );
};

export default WishlistProductCard;
