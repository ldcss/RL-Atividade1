import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { products } from '../../utils/productsData';
import type { Product } from '../../types/Product';
import type { ProductDetailProps, ReviewInput } from '../../types/ProductDetailProps';
import { useShop } from '../../hooks/ShopContext/ShopContext';
import { categories } from '../../utils/categoriesData';
import ProductImageGallery from '../../components/ProductImageGallery/ProductImageGallery';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import ProductTabs from '../../components/ProductTabs/ProductTabs';

const ProductDetail = ({ images = [], specifications = {}, reviews = [], onAddReview }: ProductDetailProps) => {
  const { produtoId } = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  const { cartItems, favItems, handleUpdateCartQuantity, toggleFavorite } = useShop();

  useEffect(() => {
    if (produtoId) {
      const id = Number(produtoId);
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct);
      if (foundProduct) {
        const currentQuantityInCart = cartItems.filter(item => item === foundProduct.id).length;
        setQuantity(currentQuantityInCart > 0 ? currentQuantityInCart : 1);
      }
    }
  }, [produtoId, cartItems, products]);

  const allProductImages = product ? ([product.image, ...images].filter(Boolean) as string[]) : [];

  const handleShare = () => {
    if (navigator.share && product) {
      navigator
        .share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
        .catch(error => console.log('Error sharing:', error));
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert('Link copiado para a área de transferência!'))
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<AiFillStar key={`star-${i}`} className='w-5 h-5 text-yellow-500' />);
      } else {
        stars.push(<AiOutlineStar key={`star-${i}`} className='w-5 h-5 text-gray-300' />);
      }
    }
    return stars;
  };

  if (!product) {
    return <div className='min-h-screen flex items-center justify-center text-gray-600'>Produto não encontrado.</div>;
  }

  const isProductInCart = cartItems.includes(product.id);
  const currentCartQuantity = cartItems.filter(item => item === product.id).length;

  const handleReviewSubmission = (reviewData: ReviewInput) => {
    if (onAddReview) {
      onAddReview(reviewData);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 font-sans antialiased'>
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
          <ProductImageGallery
            images={allProductImages}
            productTitle={product.title}
            isFavorite={favItems.includes(product.id)}
            onToggleFavorite={() => toggleFavorite(product.id)}
          />
          <ProductInfo
            product={product}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onAddToCart={() => handleUpdateCartQuantity(product.id, quantity)}
            onShare={handleShare}
            isProductInCart={isProductInCart}
            currentCartQuantity={currentCartQuantity}
            renderStars={renderStars}
          />
        </div>

        <ProductTabs
          product={product}
          specifications={specifications}
          reviews={reviews}
          onAddReview={onAddReview ? handleReviewSubmission : undefined}
          renderStars={renderStars}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
