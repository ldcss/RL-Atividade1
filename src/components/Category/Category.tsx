import { useState } from 'react';
import { categories } from '../../utils/categoriesData';
import type { CategoryFilterProps } from '../../types/CategoryFilterProps';

export default function CategoryFilter({ onCategorySelect, selectedCategory }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(selectedCategory || null);

  const handleCategoryClick = (categoryId: string) => {
    const newCategory = activeCategory === categoryId ? null : categoryId;
    setActiveCategory(newCategory);
    onCategorySelect?.(newCategory);
  };

  return (
    <div className='w-full max-w-6xl mx-auto p-4'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Categorias</h2>
        <p className='text-gray-600'>Explore nossos produtos por categoria</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
        {categories.map(category => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`
                group relative overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                ${isActive ? 'shadow-lg scale-105 ring-4 ring-blue-500/30' : 'shadow-md hover:shadow-lg'} hover:cursor-pointer
              `}
            >
              {/* Image Container */}
              <div className='relative aspect-square'>
                <img
                  src={category.image || '/placeholder.svg'}
                  alt={category.name}
                  className='w-full h-full object-cover'
                />

                {/* Active overlay with gradient */}
                {isActive && (
                  <div
                    className={`transform transition-transform duration-300 absolute inset-0 bg-gradient-to-br bg-black/40 opacity-70`}
                  />
                )}
              </div>

              {/* Content Overlay */}
              <div className='absolute inset-0 flex flex-col justify-end p-4'>
                <div
                  className={`
                    text-center transition-all duration-300
                    ${isActive ? 'transform translate-y-0' : 'transform translate-y-2 group-hover:translate-y-0'}
                  `}
                >
                  <span
                    className={`
                      text-sm font-semibold leading-tight transition-all duration-300 px-2 py-1 rounded-lg backdrop-blur-sm
                      ${isActive ? 'text-white bg-white/20' : 'text-white bg-black/40 group-hover:bg-black/60'}
                    `}
                  >
                    {category.name}
                  </span>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/80 rounded-full' />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Clear filter button */}
      {activeCategory && (
        <div className='mt-6 text-center'>
          <button
            onClick={() => handleCategoryClick(activeCategory)}
            className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:cursor-pointer'
          >
            <span className='mr-2'>✕</span>
            Limpar filtro
          </button>
        </div>
      )}
    </div>
  );
}
