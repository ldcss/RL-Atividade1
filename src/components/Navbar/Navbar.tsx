import { useState } from 'react';
import { FaRocket, FaHeart, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import type { NavbarProps } from '../../types/NavbarProps';

const Navbar = ({ cartItems, favItems, onCartClick }: NavbarProps) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [isFavOpen, setIsFavOpen] = useState(false);

  const handleSearch = () => {
    // Aqui você pode implementar a lógica de filtragem
  };

  return (
    <nav className='bg-gray-800 text-white p-4 shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo com ícone */}
        <h1 className='text-lg font-bold flex items-center'>
          <FaRocket className='mr-2 text-yellow-400' /> RocketShop
        </h1>

        {/* Ícones com badges */}
        <div className='flex space-x-6 items-center pl-2'>
          {/* Search bar estilizada */}
          <div className='flex items-center bg-gray-700 pl-2 pr-2 rounded w-full sm:w-80 md:w-90'>
            <input
              type='text'
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='Buscar produtos...'
              className='bg-transparent text-white p-2 focus:outline-none w-full'
            />
            <button onClick={handleSearch} className='text-gray-400 hover:text-white hover:cursor-pointer'>
              <FaSearch className='text-lg' />
            </button>
          </div>

          {/* Wishlist */}
          <div className='relative flex items-center'>
            <button
              onClick={() => setIsFavOpen(!isFavOpen)}
              className='text-gray-400 hover:text-white hover:cursor-pointer relative'
            >
              <FaHeart className='text-xl' />
              {favItems.length >= 0 && (
                <span className='absolute -top-2 -right-2 bg-red-700 text-white text-xs font-bold rounded-full px-1'>
                  {favItems.length}
                </span>
              )}
            </button>
          </div>

          {/* Carrinho */}
          <div className='relative flex items-center'>
            <button onClick={onCartClick} className='text-gray-400 hover:text-white hover:cursor-pointer relative'>
              <FaShoppingCart className='text-xl' />
              {cartItems.length >= 0 && (
                <span className='absolute -top-2 -right-2 bg-red-700 text-white text-xs font-bold rounded-full px-1'>
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          {/* Perfil */}
          <div>
            <FaUser className='text-xl hover:text-blue-500 cursor-pointer' />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
