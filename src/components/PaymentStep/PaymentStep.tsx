import type { Control, FieldErrors } from 'react-hook-form';
import { type FormData } from '../../types/FormData';
import PaymentMethodSelector from '../PaymentMethodSelector/PaymentMethodSelector';
import CreditCardForm from '../CreditCardForm/CreditCardForm';
import { MdPix } from 'react-icons/md';
import { BsBank } from 'react-icons/bs';

interface PaymentStepProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  paymentMethod: string;
  getValues: any;
}

const PaymentStep = ({ control, errors, paymentMethod, getValues }: PaymentStepProps) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-lg font-medium text-gray-900 mb-6'>Forma de Pagamento</h2>

      <PaymentMethodSelector control={control} />

      {paymentMethod === 'credit' && <CreditCardForm control={control} errors={errors} />}

      {paymentMethod === 'pix' && (
        <div className='text-center py-8 bg-gray-50 rounded-lg'>
          <MdPix className='w-12 h-12 mx-auto mb-4 text-gray-600' />
          <p className='text-gray-600'>Após confirmar o pedido, você receberá o código PIX para pagamento</p>
        </div>
      )}

      {paymentMethod === 'boleto' && (
        <div className='text-center py-8 bg-gray-50 rounded-lg'>
          <BsBank className='w-12 h-12 mx-auto mb-4 text-gray-600' />
          <p className='text-gray-600'>O boleto será gerado após a confirmação do pedido</p>
        </div>
      )}
    </div>
  );
};

export default PaymentStep;
