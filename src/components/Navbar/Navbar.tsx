import { useState } from 'react';
import { FaRocket, FaHeart, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';

const Navbar = ({ cartItems, favItems }: { cartItems: any[]; favItems: any[] }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);

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

            {/* Popup do wishlist */}
            {isFavOpen && (
              <div className='absolute right-0 mt-40 w-64 bg-white text-black rounded shadow-lg z-50'>
                <div className='p-4'>
                  <h3 className='font-bold text-lg'>Itens favoritos</h3>
                  {favItems.length > 0 ? (
                    <ul className='mt-2'>
                      {favItems.map((item, index) => (
                        <li key={index} className='flex justify-between items-center border-b py-2'>
                          <span>{item.name}</span>
                          <span className='text-gray-600'>R$ {item.price}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='text-gray-600 mt-2'>Sua lista de favoritos está vazia.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Carrinho */}
          <div className='relative flex items-center'>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className='text-gray-400 hover:text-white hover:cursor-pointer relative'
            >
              <FaShoppingCart className='text-xl' />
              {cartItems.length >= 0 && (
                <span className='absolute -top-2 -right-2 bg-red-700 text-white text-xs font-bold rounded-full px-1'>
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Popup do carrinho */}
            {isCartOpen && (
              <div className='absolute right-0 mt-40 w-64 bg-white text-black rounded shadow-lg z-50'>
                <div className='p-4'>
                  <h3 className='font-bold text-lg'>Itens no Carrinho</h3>
                  {cartItems.length > 0 ? (
                    <ul className='mt-2'>
                      {cartItems.map((item, index) => (
                        <li key={index} className='flex justify-between items-center border-b py-2'>
                          <span>{item.name}</span>
                          <span className='text-gray-600'>R$ {item.price}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='text-gray-600 mt-2'>Seu carrinho está vazio.</p>
                  )}
                </div>
              </div>
            )}
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
