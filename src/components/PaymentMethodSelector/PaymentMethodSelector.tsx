import { type Control } from 'react-hook-form';
import { BsCreditCard, BsBank } from 'react-icons/bs';
import { MdPix } from 'react-icons/md';
import { Controller } from 'react-hook-form';
import { type FormData } from '../../types/FormData';

interface PaymentMethodSelectorProps {
  control: Control<FormData>;
}

const PaymentMethodSelector = ({ control }: PaymentMethodSelectorProps) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-6'>
      {[
        { key: 'credit', label: 'Cartão', icon: BsCreditCard },
        { key: 'pix', label: 'PIX', icon: MdPix },
        { key: 'boleto', label: 'Boleto', icon: BsBank },
      ].map(method => {
        const Icon = method.icon;
        return (
          <Controller
            key={method.key}
            name='paymentMethod'
            control={control}
            render={({ field }) => (
              <button
                type='button'
                onClick={() => field.onChange(method.key)}
                className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                  field.value === method.key ? 'border-gray-900 bg-gray-50' : 'border-gray-300 hover:border-gray-400'
                } hover:cursor-pointer`}
              >
                <Icon className='w-5 h-5' />
                <span className='text-sm font-medium'>{method.label}</span>
              </button>
            )}
          />
        );
      })}
    </div>
  );
};

export default PaymentMethodSelector;
