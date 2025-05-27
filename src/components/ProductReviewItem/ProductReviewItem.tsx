import type { JSX } from 'react';
import type React from 'react';
import { MdVerified } from 'react-icons/md';
import type { Review } from '../../types/Review';

interface ProductReviewItemProps {
  review: Review;
  renderStars: (rating: number) => JSX.Element[];
}

const ProductReviewItem: React.FC<ProductReviewItemProps> = ({ review, renderStars }) => {
  return (
    <div className='border border-gray-100 rounded-lg p-5 shadow-sm'>
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center gap-4'>
          <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-semibold text-lg'>
            {review.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className='flex items-center gap-2 mb-1'>
              <span className='font-semibold text-gray-900 text-base'>{review.userName}</span>
              {review.verified && <MdVerified className='w-5 h-5 text-blue-600' />}
            </div>
            <div className='flex items-center gap-2'>
              {renderStars(review.rating)}
              <span className='text-sm text-gray-500'>{review.date}</span>
            </div>
          </div>
        </div>
      </div>
      <p className='text-gray-700 leading-relaxed text-base'>{review.comment}</p>
    </div>
  );
};

export default ProductReviewItem;
