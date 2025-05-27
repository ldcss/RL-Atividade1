import type React from 'react';
import { BsCart3, BsShare, BsTruck, BsShield, BsArrowRepeat } from 'react-icons/bs';
import type { Product } from '../../types/Product';
import type { JSX } from 'react';

interface ProductInfoProps {
  product: Product;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  onAddToCart: () => void;
  onShare: () => void;
  isProductInCart: boolean;
  currentCartQuantity: number;
  renderStars: (rating: number) => JSX.Element[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  onShare,
  isProductInCart,
  currentCartQuantity,
  renderStars,
}) => {
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-4 leading-tight'>{product.title}</h1>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1'>{renderStars(product.rating ?? 0)}</div>
          <span className='text-base font-semibold text-gray-700'>{product.rating.toFixed(1)}</span>
          <span className='text-base text-gray-500'>({product.reviewCount} avaliações)</span>
        </div>
      </div>

      <div className='space-y-3'>
        <div className='flex items-baseline gap-4'>
          <span className='text-4xl font-bold text-gray-900'>R$ {product.price.toFixed(2)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className='relative ml-2 text-lg text-gray-500 inline-block px-1'>
              R$ {product.originalPrice.toFixed(2)}
              <span className='absolute left-1/2 top-1/2 w-full h-px bg-red-500 transform -translate-x-1/2 -translate-y-1/2 -rotate-12'></span>
            </span>
          )}
        </div>
        {product.originalPrice && product.originalPrice > product.price && (
          <div className='text-base text-green-600 font-medium'>
            Economia de R$ {(product.originalPrice - product.price).toFixed(2)} (
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
          </div>
        )}
      </div>

      <div>
        <h3 className='text-xl font-semibold text-gray-900 mb-3'>Sobre o Produto</h3>
        <p className='text-gray-700 leading-relaxed'>{product.description}</p>
      </div>

      <div className='space-y-6'>
        <div className='flex items-center gap-6'>
          <label className='text-lg font-medium text-gray-800'>Quantidade:</label>
          <div className='flex items-center border border-gray-300 rounded-xl overflow-hidden'>
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className='p-3 w-12 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 hover:cursor-pointer'
            >
              -
            </button>
            <span className='px-4 py-3 min-w-[70px] text-center font-semibold text-gray-800'>{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className='p-3 w-12 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 hover:cursor-pointer'
            >
              +
            </button>
          </div>
        </div>

        <div className='flex gap-4'>
          <button
            onClick={onAddToCart}
            className='flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer'
            disabled={isProductInCart && quantity === currentCartQuantity}
          >
            <BsCart3 className='w-6 h-6' />
            {isProductInCart ? 'Atualizar Carrinho' : 'Adicionar ao Carrinho'}
          </button>

          <button
            onClick={onShare}
            className='p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md hover:cursor-pointer'
          >
            <BsShare className='w-6 h-6 text-gray-600' />
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100'>
        <div className='flex items-center gap-3 text-base text-gray-700'>
          <BsTruck className='w-6 h-6 text-green-600' />
          <span>Frete grátis acima de R$ 100</span>
        </div>
        <div className='flex items-center gap-3 text-base text-gray-700'>
          <BsShield className='w-6 h-6 text-blue-600' />
          <span>Garantia de 1 ano</span>
        </div>
        <div className='flex items-center gap-3 text-base text-gray-700'>
          <BsArrowRepeat className='w-6 h-6 text-purple-600' />
          <span>Troca em 30 dias</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
