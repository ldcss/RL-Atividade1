import { BsLock } from 'react-icons/bs';

interface ConfirmationStepProps {
  getValues: any;
  paymentMethod: string;
}

const ConfirmationStep = ({ getValues, paymentMethod }: ConfirmationStepProps) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-lg font-medium text-gray-900 mb-6'>Confirmar Pedido</h2>

      <div className='space-y-4'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-medium text-gray-900 mb-2'>Dados de Entrega</h3>
          <p className='text-sm text-gray-600'>
            {getValues('firstName')} {getValues('lastName')}
          </p>
          <p className='text-sm text-gray-600'>{getValues('email')}</p>
          <p className='text-sm text-gray-600'>
            {getValues('address')}, {getValues('number')}
            {getValues('complement') && `, ${getValues('complement')}`}
          </p>
        </div>

        <div className='bg-gray-50 p-4 rounded-lg'>
          <h3 className='font-medium text-gray-900 mb-2'>Forma de Pagamento</h3>
          <p className='text-sm text-gray-600'>
            {paymentMethod === 'credit' && 'Cartão de Crédito'}
            {paymentMethod === 'pix' && 'PIX'}
            {paymentMethod === 'boleto' && 'Boleto Bancário'}
            {paymentMethod === 'credit' && getValues('cardNumber') && (
              <span className='ml-2'>**** {getValues('cardNumber').slice(-4)}</span>
            )}
          </p>
        </div>
      </div>

      <div className='flex items-center gap-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg'>
        <BsLock className='w-4 h-4 text-green-600' />
        <span>Seus dados estão protegidos com criptografia SSL</span>
      </div>
    </div>
  );
};

export default ConfirmationStep;
