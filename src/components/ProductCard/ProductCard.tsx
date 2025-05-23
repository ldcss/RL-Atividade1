import type { ProductCardProps } from '../../types/ProductCardProps';
import { AiFillHeart } from 'react-icons/ai';

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className='relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 w-64 sm: md:w-80 group'>
      {/* Imagem do produto */}
      <div className='relative'>
        <img src={product.image} alt={product.name} className='w-full h-50 object-cover object-center rounded-t-lg' />
        {/* Badges */}
        <div className='absolute top-2 left-2 flex gap-2'>
          {product.badges.map((badge, index) => (
            <span key={index} className='bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full'>
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Informações do produto */}
      <div className='p-4'>
        <div className='flex justify-between items-start'>
          <h3 className='text-lg font-semibold text-gray-800'>{product.name}</h3>
          <span className='text-lg font-semibold text-gray-800 shrink-0'>R$ {product.price}</span>
        </div>
        <p className='text-sm text-gray-600 mt-2'>{product.description}</p>
      </div>

      {/* Camada de overlay com opacidade só no hover */}
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
        {/* Fundo escuro com transição e hover no card */}
        <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300'></div>

        {/* Botão visível e clicável */}
        <button className='relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 pointer-events-auto hover:cursor-pointer'>
          Comprar
        </button>

        {/* Ícone de coração no canto superior direito */}
        <div className='absolute top-2 right-2'>
          <AiFillHeart className='w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors duration-300' />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
