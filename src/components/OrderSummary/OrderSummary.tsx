interface OrderSummaryProps {
  cartItems: any[];
  subtotal: number;
  shipping: number;
  total: number;
}

const OrderSummary = ({ cartItems, subtotal, shipping, total }: OrderSummaryProps) => {
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8'>
      <h3 className='text-lg font-medium text-gray-900 mb-4'>Resumo do Pedido</h3>

      <div className='space-y-3 mb-4'>
        {cartItems.map(item => (
          <div key={item.id} className='flex gap-3'>
            <img
              src={item.image || '/placeholder.svg'}
              alt={item.title}
              className='w-12 h-12 object-cover rounded-md bg-gray-100'
            />
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900 line-clamp-2'>{item.title}</p>
              <p className='text-sm text-gray-500'>Qtd: {item.quantity}</p>
            </div>
            <p className='text-sm font-medium text-green-600'>R$ {(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className='border-t pt-4 space-y-2'>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-600'>Subtotal</span>
          <span className='text-gray-900'>R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-green-600'>Frete</span>
          <span className='text-green-600'>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span>
        </div>
        <div className='flex justify-between text-base font-medium pt-2 border-t'>
          <span className='text-gray-900'>Total</span>
          <span className='text-gray-900'>R$ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
