import type React from 'react';
import { useState, type JSX } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import type { Product } from '../../types/Product';
import type { ReviewInput } from '../../types/ProductDetailProps';
import type { Review } from '../../types/Review';
import ProductReviewForm from '../ProductReviewForm/ProductReviewForm';
import ProductReviewItem from '../ProductReviewItem/ProductReviewItem';

type ActiveTab = 'description' | 'specifications' | 'reviews';

interface ProductTabsProps {
  product: Product;
  specifications: {};
  reviews: Review[];
  onAddReview?: (reviewData: ReviewInput) => void;
  renderStars: (rating: number) => JSX.Element[];
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product, specifications, reviews, onAddReview, renderStars }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('description');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState<ReviewInput>({ rating: 5, comment: '' });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.comment.trim() && onAddReview) {
      onAddReview(newReview);
      setNewReview({ rating: 5, comment: '' });
      setShowReviewForm(false);
    }
  };

  const tabItems = [
    { key: 'description', label: 'Descrição' },
    { key: 'specifications', label: 'Especificações' },
    { key: 'reviews', label: `Avaliações (${reviews.length})` },
  ];

  return (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
      <div className='border-b border-gray-100'>
        <div className='flex'>
          {tabItems.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as ActiveTab)}
              className={`
                flex-1 px-6 py-4 font-semibold text-lg transition-all duration-200 relative hover:cursor-pointer
                ${
                  activeTab === tab.key
                    ? 'text-blue-600 bg-gray-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-100 origin-left transition-transform duration-300 ease-out' />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className='p-8'>
        {activeTab === 'description' && (
          <div className='prose max-w-none'>
            <p className='text-gray-700 leading-relaxed text-base'>{product.description}</p>
            <p className='text-gray-700 leading-relaxed mt-4 text-base'>
              Este produto oferece qualidade excepcional e foi cuidadosamente selecionado para atender às suas
              necessidades. Com design moderno e funcionalidade superior, é a escolha perfeita para quem busca
              excelência.
            </p>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
            {Object.keys(specifications).length > 0 ? (
              Object.entries(specifications).map(([key, value]) => (
                <div key={key} className='flex justify-between items-center py-2 border-b border-gray-100'>
                  <span className='font-medium text-gray-700 text-base'>{key}:</span>
                  <span className='text-gray-600 text-base'>{String(value)}</span>
                </div>
              ))
            ) : (
              <div className='col-span-2'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
                  <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                    <span className='font-medium text-gray-700 text-base'>Categoria:</span>
                    <span className='text-gray-600 text-base'>{product.category}</span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                    <span className='font-medium text-gray-700 text-base'>Avaliação:</span>
                    <span className='text-gray-600 text-base'>{product.rating.toFixed(1)}/5.0</span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                    <span className='font-medium text-gray-700 text-base'>Garantia:</span>
                    <span className='text-gray-600 text-base'>12 meses</span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                    <span className='font-medium text-gray-700 text-base'>Origem:</span>
                    <span className='text-gray-600 text-base'>Nacional</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className='space-y-8'>
            <div className='flex justify-between items-center border-b border-gray-100 pb-4'>
              <h3 className='text-xl font-semibold text-gray-900'>Avaliações dos Clientes</h3>
              {onAddReview && (
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md hover:cursor-pointer'
                >
                  {showReviewForm ? 'Cancelar' : 'Escrever Avaliação'}
                </button>
              )}
            </div>

            {showReviewForm && onAddReview && (
              <ProductReviewForm
                newReview={newReview}
                onNewReviewChange={setNewReview}
                onSubmitReview={handleSubmitReview}
              />
            )}

            <div className='space-y-6'>
              {reviews.length > 0 ? (
                reviews.map(review => <ProductReviewItem key={review.id} review={review} renderStars={renderStars} />)
              ) : (
                <div className='text-center py-12 bg-gray-50 rounded-lg shadow-inner'>
                  <AiOutlineStar className='w-20 h-20 text-gray-300 mx-auto mb-6' />
                  <h4 className='text-xl font-medium text-gray-900 mb-3'>Nenhuma avaliação ainda</h4>
                  <p className='text-gray-600 text-base'>Seja o primeiro a avaliar este produto!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
