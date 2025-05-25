import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import type { Product } from '../../types/Product';

interface ImageGalleryProps {
  product: Product | undefined;
  allImages: (string | undefined)[];
  currentImageIndex: number;
  onNextImage: () => void;
  onPrevImage: () => void;
  onSelectImage: (index: number) => void;
}

const ImageGallery = ({
  product,
  allImages,
  currentImageIndex,
  onNextImage,
  onPrevImage,
  onSelectImage,
}: ImageGalleryProps) => {
  return (
    <div className='space-y-4'>
      {/* Main Image */}
      <div className='relative aspect-square bg-white rounded-lg overflow-hidden shadow-md'>
        <img
          src={allImages[currentImageIndex] || '/placeholder.svg'}
          alt={product?.title}
          className='w-full h-full object-cover'
        />

        {/* Badges */}
        <div className='absolute top-4 left-4 flex flex-col gap-2'>
          {product?.badges.map((badge, index) => (
            <span key={index} className='bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-md shadow-sm'>
              {badge}
            </span>
          ))}
        </div>

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={onPrevImage}
              className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200'
            >
              <BsChevronLeft className='w-5 h-5 text-gray-700' />
            </button>
            <button
              onClick={onNextImage}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200'
            >
              <BsChevronRight className='w-5 h-5 text-gray-700' />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {allImages.length > 1 && (
          <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => onSelectImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className='grid grid-cols-4 gap-2'>
          {allImages.slice(0, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => onSelectImage(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image || '/placeholder.svg'}
                alt={`${product?.title} ${index + 1}`}
                className='w-full h-full object-cover'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
