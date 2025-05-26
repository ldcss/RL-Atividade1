import { BsCheck } from 'react-icons/bs';

interface CheckoutHeaderProps {
  currentStep: number;
}

const CheckoutHeader = ({ currentStep }: CheckoutHeaderProps) => {
  return (
    <div className='text-center mb-8'>
      <h1 className='text-2xl font-light text-gray-900 mb-2'>Finalizar Compra</h1>
      <div className='flex items-center justify-center gap-4 text-sm'>
        {[1, 2, 3].map(step => (
          <div key={step} className='flex items-center gap-2'>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                step <= currentStep ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step < currentStep ? <BsCheck className='w-3 h-3' /> : step}
            </div>
            <span className={step <= currentStep ? 'text-gray-900' : 'text-gray-500'}>
              {step === 1 ? 'Dados' : step === 2 ? 'Pagamento' : 'Confirmação'}
            </span>
            {step < 3 && <div className='w-8 h-px bg-gray-300' />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutHeader;
