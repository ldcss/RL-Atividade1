import Main from '../../components/Main/Main';
import Navbar from '../../components/Navbar/Navbar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categories } from '../../utils/categoriesData';
import { products } from '../../utils/productsData';

export const Home = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar cartItems={[]} favItems={[]} />
      <Main>
        <div className='flex flex-col items-center justify-center h-full'>
          {/* Seção de categorias */}
          <div className='mt-8 w-full'>
            <h2 className='text-2xl font-semibold text-center mb-6'>Navegar por Categorias</h2>
            <div className='flex flex-wrap justify-center gap-8'>
              {categories.map(category => (
                <div
                  key={category.id}
                  className='flex flex-col items-center justify-center bg-gray-200 rounded-lg shadow-md p-6 w-40 h-40 hover:bg-gray-300 cursor-pointer'
                >
                  <img src={category.image} alt={category.title} className='w-20 h-20 mb-4' />
                  <p className='text-base font-medium text-gray-700'>{category.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-wrap gap-8 justify-center mt-8'>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Main>
    </div>
  );
};

export default Home;
