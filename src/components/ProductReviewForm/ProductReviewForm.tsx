import type React from 'react';
import StarRating from '../../components/StarRating/StarRating';
import type { ReviewInput } from '../../types/ProductDetailProps';

interface ProductReviewFormProps {
  newReview: ReviewInput;
  onNewReviewChange: (review: ReviewInput) => void;
  onSubmitReview: (e: React.FormEvent) => void;
}

const ProductReviewForm: React.FC<ProductReviewFormProps> = ({ newReview, onNewReviewChange, onSubmitReview }) => {
  return (
    <form onSubmit={onSubmitReview} className='bg-gray-50 p-6 rounded-xl space-y-5 shadow-inner'>
      <div>
        <label className='block text-base font-medium text-gray-800 mb-2'>Sua Avaliação:</label>
        <StarRating rating={newReview.rating} onRatingChange={rating => onNewReviewChange({ ...newReview, rating })} />
      </div>
      <div>
        <label className='block text-base font-medium text-gray-800 mb-2'>Comentário:</label>
        <textarea
          value={newReview.comment}
          onChange={e => onNewReviewChange({ ...newReview, comment: e.target.value })}
          rows={4}
          className='w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400'
          placeholder='Compartilhe sua experiência com este produto...'
          required
        />
      </div>
      <button
        type='submit'
        className='bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg hover:cursor-pointer'
      >
        Enviar Avaliação
      </button>
    </form>
  );
};

export default ProductReviewForm;
