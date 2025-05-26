import { useState, useEffect, useRef } from 'react';
import { FaRocket, FaHeart, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import type { NavbarProps } from '../../types/NavbarProps';
import { Link, useNavigate } from 'react-router-dom'; // Importe useNavigate
import { useShop } from '../../hooks/ShopContext/ShopContext';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { products } from '../../utils/productsData';
import type { Product } from '../../types/Product';

const Navbar = ({ onCartClick }: NavbarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { cartItems, favItems } = useShop();
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null); // Ref para o container da busca

  // Efeito para buscar produtos quando o termo debounced mudar
  useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      );
      setSearchResults(filteredProducts);
      setShowSearchResults(true); // Mostrar resultados se houver termo
    } else {
      setSearchResults([]);
      setShowSearchResults(false); // Esconder se não houver termo
    }
  }, [debouncedSearchTerm]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`); // Navega para a página do produto
    setSearchTerm('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  // Função para fechar os resultados da busca ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // O handleSearch original pode ser mantido se você quiser uma busca explícita ao clicar no botão
  // ou removido se a busca for apenas por debounce.
  const handleSearchButtonClick = () => {
    // Implementar lógica de busca explícita se necessário,
    // por exemplo, navegar para uma página de resultados de busca.
    console.log('Buscando explicitamente por:', searchTerm);
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`); // Exemplo de navegação para página de busca
      setShowSearchResults(false);
      setSearchTerm('');
    }
  };

  return (
    <nav className='bg-white text-gray-800 py-4 shadow-sm border-b border-gray-100'>
      <div className='container mx-auto flex justify-between items-center px-4'>
        <Link to='/' className='flex items-center group'>
          <h1 className='text-xl font-extrabold flex items-center text-gray-900'>
            <FaRocket className='mr-2 text-blue-600 transition-transform duration-300 group-hover:rotate-12' />
            RocketShop
          </h1>
        </Link>

        <div className='flex space-x-6 items-center'>
          {/* Search bar e resultados */}
          <div ref={searchContainerRef} className='relative'>
            <div className='flex items-center border border-gray-200 rounded-full px-4 py-2 w-full sm:w-64 focus-within:border-blue-400 transition-all duration-300'>
              <input
                type='text'
                value={searchTerm}
                onChange={handleSearchInputChange}
                onFocus={() => searchTerm && setSearchResults.length > 0 && setShowSearchResults(true)} // Mostrar ao focar se houver resultados
                placeholder='Buscar produtos...'
                className='bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none w-full text-sm'
              />
              <button
                onClick={handleSearchButtonClick} // Modificado para busca explícita
                className='text-gray-400 hover:text-blue-500 transition-colors duration-200 ml-2'
              >
                <FaSearch className='text-lg' />
              </button>
            </div>
            {/* Lista de resultados da busca */}
            {showSearchResults && searchResults.length > 0 && (
              <ul className='absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto'>
                {searchResults.map(product => (
                  <li
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                  >
                    {product.title}
                  </li>
                ))}
              </ul>
            )}
            {showSearchResults && searchResults.length === 0 && debouncedSearchTerm && (
              <div className='absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-4 text-sm text-gray-500'>
                Nenhum produto encontrado para "{debouncedSearchTerm}".
              </div>
            )}
          </div>

          <Link
            to={'/wishlist'}
            className='relative p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded-full hover:bg-gray-100'
          >
            <FaHeart className='text-xl' />
            {favItems.length > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce-once'>
                {favItems.length}
              </span>
            )}
          </Link>

          <button
            onClick={onCartClick}
            className='relative p-2 hover:cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded-full hover:bg-gray-100'
          >
            <FaShoppingCart className='text-xl' />
            {cartItems.length > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce-once'>
                {cartItems.length}
              </span>
            )}
          </button>

          <button className='p-2 hover:cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded-full hover:bg-gray-100'>
            <FaUser className='text-xl' />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
