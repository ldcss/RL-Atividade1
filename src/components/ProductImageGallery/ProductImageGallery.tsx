import type React from 'react';
import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

interface ProductImageGalleryProps {
  images: string[];
  productTitle: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productTitle,
  isFavorite,
  onToggleFavorite,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className='relative rounded-xl overflow-hidden shadow-lg aspect-square bg-gray-200 flex items-center justify-center'>
        <img src='/placeholder.svg' alt='Placeholder' className='w-1/2 h-1/2 object-contain' />
      </div>
    );
  }

  return (
    <div className='relative rounded-xl overflow-hidden shadow-lg aspect-square'>
      <img src={images[currentImageIndex]} alt={productTitle} className='w-full h-full object-cover' />
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className='absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/70 rounded-full shadow-md hover:bg-white transition-colors duration-200 z-10 hover:cursor-pointer'
          >
            <BsChevronLeft className='w-5 h-5 text-gray-700' />
          </button>
          <button
            onClick={nextImage}
            className='absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/70 rounded-full shadow-md hover:bg-white transition-colors duration-200 z-10 hover:cursor-pointer'
          >
            <BsChevronRight className='w-5 h-5 text-gray-700' />
          </button>
        </>
      )}
      <button
        onClick={onToggleFavorite}
        className='absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 hover:cursor-pointer'
      >
        {isFavorite ? (
          <AiFillHeart className='w-6 h-6 text-red-500' />
        ) : (
          <AiOutlineHeart className='w-6 h-6 text-gray-600 hover:text-red-500' />
        )}
      </button>
    </div>
  );
};

export default ProductImageGallery;
