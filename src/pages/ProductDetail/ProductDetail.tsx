import { Link, useParams } from 'react-router-dom';
import type React from 'react';
import { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsCart3, BsShare, BsTruck, BsShield, BsArrowRepeat, BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { products } from '../../utils/productsData';
import type { Product } from '../../types/Product';
import type { ProductDetailProps } from '../../types/ProductDetailProps';
import StarRating from '../../components/StarRating/StarRating';
import { useShop } from '../../hooks/ShopContext/ShopContext';
import { categories } from '../../utils/categoriesData';

const ProductDetail = ({ images = [], specifications = {}, reviews = [], onAddReview }: ProductDetailProps) => {
  const { produtoId } = useParams();
  const [productIndex, setProductIndex] = useState(-1);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const { cartItems, favItems, handleUpdateCartQuantity, toggleFavorite } = useShop();

  const allImages = [product?.image, ...images].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  };

  useEffect(() => {
    if (produtoId) {
      const id = Number(produtoId);
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct);
      setProductIndex(products.findIndex(p => p.id === id));

      const currentQuantityInCart = cartItems.filter(item => item === id).length;
      setQuantity(currentQuantityInCart > 0 ? currentQuantityInCart : 1);
    }
  }, [produtoId, cartItems]);

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
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<AiFillStar key={i} className='w-5 h-5 text-yellow-500' />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className='relative'>
            <AiOutlineStar className='w-5 h-5 text-gray-300' />
            <div className='absolute inset-0 overflow-hidden w-1/2'>
              <AiFillStar className='w-5 h-5 text-yellow-500' />
            </div>
          </div>,
        );
      } else {
        stars.push(<AiOutlineStar key={i} className='w-5 h-5 text-gray-300' />);
      }
    }
    return stars;
  };

  if (!product) {
    return <div className='min-h-screen flex items-center justify-center text-gray-600'>Produto não encontrado.</div>;
  }

  return (
    <div className='min-h-screen bg-gray-50 font-sans antialiased'>
      {/* Breadcrumb */}
      <div className='bg-white shadow-sm border-b border-gray-100'>
        <div className='max-w-6xl mx-auto px-4 py-4'>
          <nav className='text-sm text-gray-500'>
            <Link to={'/'} className='hover:text-blue-600 transition-colors duration-200 hover:cursor-pointer'>
              Home
            </Link>
            <span className='mx-2'>/</span>
            <Link
              to={`/?category=${product.category}`}
              className='hover:text-blue-600 transition-colors duration-200 hover:cursor-pointer'
            >
              {categories.find(category => product.category === category?.id)?.name}
            </Link>
            <span className='mx-2'>/</span>
            <span className='text-gray-800 font-medium'>{product.title}</span>
          </nav>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16'>
          {/* Image Gallery */}
          <div className='relative rounded-xl overflow-hidden shadow-lg aspect-square'>
            <img
              src={allImages[currentImageIndex] || '/placeholder.svg'}
              alt={product.title}
              className='w-full h-full object-cover'
            />
            {/* Controles de navegação da galeria */}
            {allImages.length > 1 && (
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
            {/* Favorite Button na galeria */}
            <button
              onClick={() => toggleFavorite(product.id)}
              className='absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 hover:cursor-pointer'
            >
              {favItems.includes(product.id) ? (
                <AiFillHeart className='w-6 h-6 text-red-500' />
              ) : (
                <AiOutlineHeart className='w-6 h-6 text-gray-600 hover:text-red-500' />
              )}
            </button>
          </div>

          {/* Product Info */}
          <div className='space-y-8'>
            {/* Title and Rating */}
            <div>
              <h1 className='text-4xl font-extrabold text-gray-900 mb-4 leading-tight'>{product.title}</h1>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1'>{renderStars(product.rating ?? 0)}</div>
                <span className='text-base font-semibold text-gray-700'>{product.rating.toFixed(1)}</span>
                <span className='text-base text-gray-500'>({product.reviewCount} avaliações)</span>
              </div>
            </div>

            {/* Price Section */}
            <div className='space-y-3'>
              <div className='flex items-baseline gap-4'>
                <span className='text-4xl font-bold text-gray-900'>R$ {product.price.toFixed(2)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className='relative ml-2 text-lg text-gray-500 inline-block px-1'>
                    R$ {product.originalPrice.toFixed(2)}
                    <span className='absolute left-1/2 top-1/2 w-full h-px bg-red-500 transform -translate-x-1/2 -translate-y-1/2 -rotate-12'></span>
                  </span>
                )}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className='text-base text-green-600 font-medium'>
                  Economia de R$ {(product.originalPrice - product.price).toFixed(2)} (
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>Sobre o Produto</h3>
              <p className='text-gray-700 leading-relaxed'>{product.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className='space-y-6'>
              <div className='flex items-center gap-6'>
                <label className='text-lg font-medium text-gray-800'>Quantidade:</label>
                <div className='flex items-center border border-gray-300 rounded-xl overflow-hidden'>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className='p-3 w-12 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 hover:cursor-pointer'
                  >
                    -
                  </button>
                  <span className='px-4 py-3 min-w-[70px] text-center font-semibold text-gray-800'>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className='p-3 w-12 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 hover:cursor-pointer'
                  >
                    +
                  </button>
                </div>
              </div>

              <div className='flex gap-4'>
                <button
                  onClick={() => product && handleUpdateCartQuantity(product.id, quantity)}
                  className='flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer'
                  disabled={
                    cartItems.includes(product.id) && quantity === cartItems.filter(item => item === product.id).length
                  }
                >
                  <BsCart3 className='w-6 h-6' />
                  {cartItems.includes(product.id) ? 'Atualizar Carrinho' : 'Adicionar ao Carrinho'}
                </button>

                <button
                  onClick={handleShare}
                  className='p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md hover:cursor-pointer'
                >
                  <BsShare className='w-6 h-6 text-gray-600' />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100'>
              <div className='flex items-center gap-3 text-base text-gray-700'>
                <BsTruck className='w-6 h-6 text-green-600' />
                <span>Frete grátis acima de R$ 100</span>
              </div>
              <div className='flex items-center gap-3 text-base text-gray-700'>
                <BsShield className='w-6 h-6 text-blue-600' />
                <span>Garantia de 1 ano</span>
              </div>
              <div className='flex items-center gap-3 text-base text-gray-700'>
                <BsArrowRepeat className='w-6 h-6 text-purple-600' />
                <span>Troca em 30 dias</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          {/* Tab Headers */}
          <div className='border-b border-gray-100'>
            <div className='flex'>
              {[
                { key: 'description', label: 'Descrição' },
                { key: 'specifications', label: 'Especificações' },
                { key: 'reviews', label: `Avaliações (${reviews.length})` },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
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

          {/* Tab Content */}
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
                      <span className='text-gray-600 text-base'>{value}</span>
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
                {/* Add Review Button */}
                <div className='flex justify-between items-center border-b border-gray-100 pb-4'>
                  <h3 className='text-xl font-semibold text-gray-900'>Avaliações dos Clientes</h3>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md hover:cursor-pointer'
                  >
                    {showReviewForm ? 'Cancelar' : 'Escrever Avaliação'}
                  </button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleSubmitReview} className='bg-gray-50 p-6 rounded-xl space-y-5 shadow-inner'>
                    <div>
                      <label className='block text-base font-medium text-gray-800 mb-2'>Sua Avaliação:</label>
                      {/* StarRating é um componente externo, assumo que ele já tem seu próprio hover:cursor-pointer se aplicável */}
                      <StarRating
                        rating={newReview.rating}
                        onRatingChange={rating => setNewReview({ ...newReview, rating })}
                      />
                    </div>
                    <div>
                      <label className='block text-base font-medium text-gray-800 mb-2'>Comentário:</label>
                      <textarea
                        value={newReview.comment}
                        onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
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
                )}

                {/* Reviews List */}
                <div className='space-y-6'>
                  {reviews.length > 0 ? (
                    reviews.map(review => (
                      <div key={review.id} className='border border-gray-100 rounded-lg p-5 shadow-sm'>
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
                                {/* renderStars aqui, os spans de estrela já são clicáveis em StarRating ou não precisam de cursor */}
                                {renderStars(review.rating)}
                                <span className='text-sm text-gray-500'>{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className='text-gray-700 leading-relaxed text-base'>{review.comment}</p>
                      </div>
                    ))
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
      </div>
    </div>
  );
};

export default ProductDetail;
