import { useState, useRef, useEffect } from 'react';
import { categories } from '../../utils/categoriesData';
import type { CategoryFilterProps } from '../../types/CategoryFilterProps';

const CategoryFilter = ({ onCategorySelect, selectedCategory }: CategoryFilterProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(selectedCategory || null);
  const activeCategoryRef = useRef<HTMLButtonElement | null>(null); // Ref para a categoria ativa
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref para o contêiner das categorias
  const [underlineStyle, setUnderlineStyle] = useState({}); // Estado para o estilo da barra animada

  const handleCategoryClick = (categoryId: string) => {
    const newCategory = activeCategory === categoryId ? null : categoryId;
    setActiveCategory(newCategory);
    onCategorySelect?.(newCategory);
  };

  // Efeito para recalcular a posição da barra quando a categoria ativa ou o layout muda
  useEffect(() => {
    if (activeCategory && activeCategoryRef.current && containerRef.current) {
      const activeElement = activeCategoryRef.current;
      const containerElement = containerRef.current;

      const categoryRect = activeElement.getBoundingClientRect();
      const containerRect = containerElement.getBoundingClientRect();

      // Calcula a posição e largura da barra
      setUnderlineStyle({
        width: categoryRect.width,
        left: categoryRect.left - containerRect.left, // Posição relativa ao contêiner
        opacity: 1, // Torna visível
      });
    } else {
      setUnderlineStyle({ opacity: 0 }); // Esconde a barra se nenhuma categoria estiver ativa
    }
  }, [activeCategory]); // Roda quando a categoria ativa muda

  // Para garantir que a barra se ajuste em redimensionamentos de tela
  useEffect(() => {
    const handleResize = () => {
      if (activeCategory && activeCategoryRef.current && containerRef.current) {
        // Força o re-cálculo da posição da barra
        setUnderlineStyle({ opacity: 0 }); // Esconde brevemente para forçar recalculo
        const timeoutId = setTimeout(() => {
          const activeElement = activeCategoryRef.current;
          const containerElement = containerRef.current;
          if (activeElement && containerElement) {
            const categoryRect = activeElement.getBoundingClientRect();
            const containerRect = containerElement.getBoundingClientRect();
            setUnderlineStyle({
              width: categoryRect.width,
              left: categoryRect.left - containerRect.left,
              opacity: 1,
            });
          }
        }, 50);
        return () => clearTimeout(timeoutId);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeCategory]); // Depende de activeCategory para saber se a barra deve ser visível

  return (
    <div className='w-full max-w-6xl mx-auto py-8 px-4'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>Navegue por Categorias</h2>
        <p className='text-gray-500 text-lg'>Descubra produtos incríveis em cada uma delas.</p>
      </div>
      {activeCategory && (
        <div className='flex justify-center mb-8'>
          <button
            onClick={() => handleCategoryClick(activeCategory)}
            className='hover:cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-full border border-gray-200 hover:border-blue-300'
          >
            <span className='mr-2'>✕</span>
            Limpar filtro
          </button>
        </div>
      )}

      <div className='relative'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8' ref={containerRef}>
          {categories.map(category => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                ref={isActive ? activeCategoryRef : null} // Atribui a ref apenas à categoria ativa
                className={`
                  group flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-105
                  hover:cursor-pointer
                `}
              >
                <div
                  className={`
                    w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden shadow-md flex items-center justify-center relative
                    transition-all duration-300
                    ${isActive ? 'w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40  shadow-lg' : 'group-hover:shadow-lg'} {/* Aumento do círculo */}
                  `}
                >
                  <img
                    src={category.image || '/placeholder.svg'}
                    alt={category.name}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                  />
                  {isActive && <div className='absolute inset-0 rounded-full bg-gray-600/10' />}
                </div>
                <span
                  className={`
                    mt-4 text-base font-semibold text-gray-900 transition-colors duration-200
                  `}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
        <div
          className='absolute bottom-[-8px] h-[1.5px] bg-gray-400 transition-all duration-300 ease-out'
          style={{ ...underlineStyle }}
        />
      </div>
    </div>
  );
};

export default CategoryFilter;
