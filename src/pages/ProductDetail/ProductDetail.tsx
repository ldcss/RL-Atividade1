import { useParams } from 'react-router-dom';
import type React from 'react';
import { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsCart3, BsShare, BsChevronLeft, BsChevronRight, BsTruck, BsShield, BsArrowRepeat } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { products } from '../../utils/productsData';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  badges: string[];
  rating: number;
  reviewCount: number;
  category: string;
  isFavorite: boolean;
  isOnCart: boolean;
  onFavorite?: () => void;
  onAddToCart?: () => void;
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface ProductPageProps {
  images?: string[];
  specifications?: { [key: string]: string };
  reviews?: Review[];
  onAddReview?: (review: { rating: number; comment: string }) => void;
}

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

const ProductDetail = ({ images = [], specifications = {}, reviews = [], onAddReview }: ProductPageProps) => {
  const { produtoId } = useParams();
  const [productIndex, setProductIndex] = useState(-1);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  // Combine main image with additional images
  const allImages = [product?.image, ...images].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  };

  useEffect(() => {
    setProduct(products.find(p => p.id === Number(produtoId)));
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      onAddReview?.(newReview);
      setNewReview({ rating: 5, comment: '' });
      setShowReviewForm(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className='flex items-center gap-1'>
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star}>
            {star <= rating ? (
              <AiFillStar className='w-4 h-4 text-yellow-400' />
            ) : (
              <AiOutlineStar className='w-4 h-4 text-gray-300' />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Breadcrumb */}
      <div className='bg-white border-b'>
        <div className='max-w-6xl mx-auto px-4 py-3'>
          <nav className='text-sm text-gray-600'>
            <span>Home</span> <span className='mx-2'>/</span>
            <span>{product?.category}</span> <span className='mx-2'>/</span>
            <span className='text-gray-900'>{product?.title}</span>
          </nav>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
          {/* Image Gallery */}
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
                  <span
                    key={index}
                    className='bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-md shadow-sm'
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200'
                  >
                    <BsChevronLeft className='w-5 h-5 text-gray-700' />
                  </button>
                  <button
                    onClick={nextImage}
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
                      onClick={() => setCurrentImageIndex(index)}
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
                    onClick={() => setCurrentImageIndex(index)}
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

          {/* Product Info */}
          <div className='space-y-6'>
            {/* Title and Rating */}
            <div>
              <h1 className='text-3xl font-bold text-gray-900 mb-3'>{product?.title}</h1>
              <div className='flex items-center gap-4 mb-4'>
                {renderStars(product?.rating ?? 0)}
                <span className='text-sm font-medium text-gray-700'>{product?.rating.toFixed(1)}</span>
                <span className='text-sm text-gray-500'>({product?.reviewCount} avaliações)</span>
              </div>
            </div>

            {/* Price */}
            <div className='space-y-2'>
              <div className='flex items-baseline gap-3'>
                <span className='text-3xl font-bold text-green-600'>R$ {product?.price.toFixed(2)}</span>
                {product?.originalPrice && product.originalPrice > product.price && (
                  <span className='text-xl text-gray-500 line-through'>R$ {product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              {product?.originalPrice && product.originalPrice > product.price && (
                <div className='text-sm text-green-600 font-medium'>
                  Economia de R$ {(product.originalPrice - product.price).toFixed(2)} (
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <p className='text-gray-700 leading-relaxed'>{product?.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <label className='text-sm font-medium text-gray-700'>Quantidade:</label>
                <div className='flex items-center border border-gray-300 rounded-lg'>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className='p-2 hover:bg-gray-100 transition-colors duration-200'
                  >
                    -
                  </button>
                  <span className='px-4 py-2 min-w-[60px] text-center'>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className='p-2 hover:bg-gray-100 transition-colors duration-200'
                  >
                    +
                  </button>
                </div>
              </div>

              <div className='flex gap-3'>
                <button
                  onClick={product?.onAddToCart}
                  className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'
                >
                  <BsCart3 className='w-5 h-5' />
                  {product?.isOnCart ? 'No Carrinho' : 'Adicionar ao Carrinho'}
                </button>

                <button
                  onClick={product?.onFavorite}
                  className='p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200'
                >
                  {product?.isFavorite ? (
                    <AiFillHeart className='w-6 h-6 text-red-500' />
                  ) : (
                    <AiOutlineHeart className='w-6 h-6 text-gray-600' />
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className='p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200'
                >
                  <BsShare className='w-6 h-6 text-gray-600' />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t'>
              <div className='flex items-center gap-3 text-sm text-gray-600'>
                <BsTruck className='w-5 h-5 text-green-600' />
                <span>Frete grátis acima de R$ 100</span>
              </div>
              <div className='flex items-center gap-3 text-sm text-gray-600'>
                <BsShield className='w-5 h-5 text-blue-600' />
                <span>Garantia de 1 ano</span>
              </div>
              <div className='flex items-center gap-3 text-sm text-gray-600'>
                <BsArrowRepeat className='w-5 h-5 text-purple-600' />
                <span>Troca em 30 dias</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          {/* Tab Headers */}
          <div className='border-b'>
            <div className='flex'>
              {[
                { key: 'description', label: 'Descrição' },
                { key: 'specifications', label: 'Especificações' },
                { key: 'reviews', label: `Avaliações (${reviews.length})` },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-6 py-4 font-medium transition-colors duration-200 ${
                    activeTab === tab.key
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className='p-6'>
            {activeTab === 'description' && (
              <div className='prose max-w-none'>
                <p className='text-gray-700 leading-relaxed'>{product?.description}</p>
                <p className='text-gray-700 leading-relaxed mt-4'>
                  Este produto oferece qualidade excepcional e foi cuidadosamente selecionado para atender às suas
                  necessidades. Com design moderno e funcionalidade superior, é a escolha perfeita para quem busca
                  excelência.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {Object.keys(specifications).length > 0 ? (
                  Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className='flex justify-between py-2 border-b border-gray-200'>
                      <span className='font-medium text-gray-700'>{key}:</span>
                      <span className='text-gray-600'>{value}</span>
                    </div>
                  ))
                ) : (
                  <div className='col-span-2'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='flex justify-between py-2 border-b border-gray-200'>
                        <span className='font-medium text-gray-700'>Categoria:</span>
                        <span className='text-gray-600'>{product?.category}</span>
                      </div>
                      <div className='flex justify-between py-2 border-b border-gray-200'>
                        <span className='font-medium text-gray-700'>Avaliação:</span>
                        <span className='text-gray-600'>{product?.rating.toFixed(1)}/5.0</span>
                      </div>
                      <div className='flex justify-between py-2 border-b border-gray-200'>
                        <span className='font-medium text-gray-700'>Garantia:</span>
                        <span className='text-gray-600'>12 meses</span>
                      </div>
                      <div className='flex justify-between py-2 border-b border-gray-200'>
                        <span className='font-medium text-gray-700'>Origem:</span>
                        <span className='text-gray-600'>Nacional</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className='space-y-6'>
                {/* Add Review Button */}
                <div className='flex justify-between items-center'>
                  <h3 className='text-lg font-semibold text-gray-900'>Avaliações dos Clientes</h3>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200'
                  >
                    {showReviewForm ? 'Cancelar' : 'Escrever Avaliação'}
                  </button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleSubmitReview} className='bg-gray-50 p-6 rounded-lg space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Sua Avaliação:</label>
                      <StarRating
                        rating={newReview.rating}
                        onRatingChange={rating => setNewReview({ ...newReview, rating })}
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Comentário:</label>
                      <textarea
                        value={newReview.comment}
                        onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                        rows={4}
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Compartilhe sua experiência com este produto...'
                        required
                      />
                    </div>
                    <button
                      type='submit'
                      className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200'
                    >
                      Enviar Avaliação
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className='space-y-4'>
                  {reviews.length > 0 ? (
                    reviews.map(review => (
                      <div key={review.id} className='border border-gray-200 rounded-lg p-4'>
                        <div className='flex items-start justify-between mb-3'>
                          <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold'>
                              {review.userName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className='flex items-center gap-2'>
                                <span className='font-medium text-gray-900'>{review.userName}</span>
                                {review.verified && <MdVerified className='w-4 h-4 text-blue-600' />}
                              </div>
                              <div className='flex items-center gap-2'>
                                {renderStars(review.rating)}
                                <span className='text-sm text-gray-500'>{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className='text-gray-700'>{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className='text-center py-8'>
                      <AiOutlineStar className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                      <h4 className='text-lg font-medium text-gray-900 mb-2'>Nenhuma avaliação ainda</h4>
                      <p className='text-gray-600'>Seja o primeiro a avaliar este produto!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
