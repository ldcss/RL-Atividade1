import { BsCart3, BsPlus, BsDash, BsTrash } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import type { ProductInCart } from '../../types/ProductInCart';
import { useNavigate } from 'react-router-dom';

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
  items: ProductInCart[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onItemClick: (item: ProductInCart) => void;
  onContinueShopping: () => void;
}

const CartPopup = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onItemClick,
  onContinueShopping,
}: CartPopupProps) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;
  let navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Popup */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } min-h-0`}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b'>
          <h2 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
            <BsCart3 className='w-5 h-5' />
            Carrinho ({items.length})
          </h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 hover:cursor-pointer'
          >
            <AiOutlineClose className='w-5 h-5 text-gray-500' />
          </button>
        </div>

        {/* Content */}
        <div className='flex flex-col h-full'>
          {items.length === 0 ? (
            /* Empty Cart */
            <div className='flex-1 flex flex-col items-center justify-center p-8 text-center'>
              <BsCart3 className='w-16 h-16 text-gray-300 mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>Seu carrinho está vazio</h3>
              <p className='text-gray-500 mb-6'>Adicione alguns produtos para começar suas compras</p>
              <button
                onClick={onContinueShopping}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 hover:cursor-pointer'
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {items.map(item => (
                  <div
                    key={item.id}
                    className='flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'
                  >
                    {/* Image */}
                    <button
                      onClick={() => onItemClick(item)}
                      className='flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden hover:opacity-80 transition-opacity duration-200'
                    >
                      <img
                        src={item.image || '/placeholder.svg'}
                        alt={item.title}
                        className='w-full h-full object-cover'
                      />
                    </button>

                    {/* Content */}
                    <div className='flex-1 min-w-0'>
                      <button
                        onClick={() => onItemClick(item)}
                        className='text-left w-full hover:text-blue-600 transition-colors duration-200'
                      >
                        <h4 className='font-medium text-gray-900 text-sm line-clamp-2'>{item.title}</h4>
                      </button>

                      {/* Variants
                      {(item.size || item.color) && (
                        <div className='flex gap-2 mt-1'>
                          {item.size && (
                            <span className='text-xs text-gray-500 bg-white px-2 py-1 rounded'>Tam: {item.size}</span>
                          )}
                          {item.color && (
                            <span className='text-xs text-gray-500 bg-white px-2 py-1 rounded'>Cor: {item.color}</span>
                          )}
                        </div>
                      )} */}

                      {/* Price and Quantity */}
                      <div className='flex items-center justify-between mt-2'>
                        <div className='flex flex-col'>
                          <span className='font-semibold text-green-600 text-sm'>R$ {item.price.toFixed(2)}</span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className='text-xs text-gray-500 line-through'>
                              R$ {item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className='p-1 hover:bg-white rounded transition-colors duration-200 hover:cursor-pointer'
                            disabled={item.quantity <= 1}
                          >
                            <BsDash className='w-3 h-3 text-gray-600' />
                          </button>
                          <span className='text-sm font-medium min-w-[20px] text-center'>{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className='p-1 hover:bg-white rounded transition-colors duration-200 hover:cursor-pointer'
                          >
                            <BsPlus className='w-3 h-3 text-gray-600' />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className='flex-shrink-0 p-2 hover:bg-red-100 rounded-lg transition-colors duration-200 group hover:cursor-pointer'
                    >
                      <BsTrash className='w-4 h-4 text-gray-400 group-hover:text-red-500' />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className='border-t bg-white p-4 space-y-3 flex-shrink-0'>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Subtotal</span>
                    <span className='font-medium'>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Frete</span>
                    <span className='font-medium'>
                      {shipping === 0 ? <span className='text-green-600'>Grátis</span> : `R$ ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className='text-xs text-green-600'>🎉 Frete grátis em compras acima de R$ 100</p>
                  )}
                  <div className='flex justify-between text-base font-semibold pt-2 border-t'>
                    <span>Total</span>
                    <span className='text-green-600'>R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='space-y-2'>
                  <button
                    onClick={() => {
                      navigate('/checkout');
                      onClose();
                    }}
                    className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 hover:cursor-pointer'
                  >
                    Finalizar Compra
                  </button>
                  <button
                    onClick={onContinueShopping}
                    className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 hover:cursor-pointer'
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPopup;
