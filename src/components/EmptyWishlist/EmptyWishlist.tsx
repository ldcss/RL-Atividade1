import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const EmptyWishlist = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Breadcrumb */}
      <div className='bg-white shadow-sm border-b border-gray-100 pb-2'>
        <div className='max-w-6xl mx-auto px-4 py-3'>
          <nav className='text-sm text-gray-600'>
            <Link to='/' className='hover:text-gray-900'>
              Home
            </Link>
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
};

export default EmptyWishlist;
