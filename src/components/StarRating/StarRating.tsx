import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const StarRating = ({
  rating,
  onRatingChange,
  readonly = false,
}: {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className='flex items-center gap-1'>
      {[1, 2, 3, 4, 5].map(star => {
        const filled = star <= (hoverRating || rating);
        return (
          <button
            key={star}
            type='button'
            disabled={readonly}
            onClick={() => !readonly && onRatingChange?.(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform duration-200`}
          >
            {filled ? (
              <AiFillStar className='w-5 h-5 text-yellow-400' />
            ) : (
              <AiOutlineStar className='w-5 h-5 text-gray-300' />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
