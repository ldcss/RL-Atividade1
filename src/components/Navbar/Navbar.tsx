import { useState } from 'react';
import { FaRocket, FaHeart, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');

  const handleSearch = () => {
    console.log(`Buscando por: ${search} na categoria: ${category}`);
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
        <div className='flex space-x-6 items-center'>
          {/* Search bar estilizada */}
          <div className='flex items-center bg-gray-700 pl-2 rounded w-full sm:w-80 md:w-90'>
            <input
              type='text'
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='Buscar produtos...'
              className='bg-transparent text-white p-2 focus:outline-none w-full'
            />
            <button onClick={handleSearch} className='text-gray-400 hover:text-white'>
              <FaSearch className='text-lg' />
            </button>
          </div>

          {/* Wishlist */}
          <div className='relative'>
            <FaHeart className='text-xl hover:text-red-500 cursor-pointer' />
            <span className='absolute -top-2 -right-2 bg-red-700 text-white text-xs font-bold rounded-full px-1'>
              3
            </span>
          </div>

          {/* Carrinho */}
          <div className='relative'>
            <FaShoppingCart className='text-xl hover:text-green-500 cursor-pointer' />
            <span className='absolute -top-2 -right-2 bg-green-700 text-white text-xs font-bold rounded-full px-1'>
              5
            </span>
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
