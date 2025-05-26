import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { type FormData } from '../../types/FormData';
import PaymentStep from '../../components/PaymentStep/PaymentStep';
import PersonalDataStep from '../../components/PersonalDataStep/PersonalDataStep';
import CheckoutHeader from '../../components/CheckoutHeader/CheckoutHeader';
import ConfirmationStep from '../../components/ConfirmationStep/ConfirmationStep';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import { useShop } from '../../hooks/ShopContext/ShopContext';
import { parseCartItems } from '../../utils/parsedCartItems';
import { useNavigate } from 'react-router-dom';
import SuccessPopup from '../../components/SuccessPopup/SuccessPopup';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const { cartItems, clearCart } = useShop();
  const parsedCartItems = useMemo(() => parseCartItems(cartItems), [cartItems]);

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      zipCode: '',
      address: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      paymentMethod: 'credit',
      cardNumber: '',
      cardName: '',
      cardExpiry: '',
      cardCvv: '',
    },
  });

  const paymentMethod = watch('paymentMethod');
  const subtotal = parsedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleNextStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let fieldsToValidate: (keyof FormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'zipCode', 'address', 'number'];
    } else if (currentStep === 2) {
      if (paymentMethod === 'credit') {
        fieldsToValidate = ['cardNumber', 'cardName', 'cardExpiry', 'cardCvv'];
      }
    }

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: FormData) => {
    setShowPopup(true); // Mostrar popup
    clearCart();

    setTimeout(() => {
      navigate('/');
    }, 2000); // Redirecionar após 2 segundos

    console.log('Pedido finalizado:', data);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <SuccessPopup visible={showPopup} />
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <CheckoutHeader currentStep={currentStep} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                {currentStep === 1 && <PersonalDataStep control={control} errors={errors} />}

                {currentStep === 2 && (
                  <PaymentStep control={control} errors={errors} paymentMethod={paymentMethod} getValues={getValues} />
                )}

                {currentStep === 3 && <ConfirmationStep getValues={getValues} paymentMethod={paymentMethod} />}

                <div className='flex justify-between pt-6 mt-6 border-t'>
                  <button
                    type='button'
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className='px-6 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:cursor-pointer'
                  >
                    Voltar
                  </button>
                  {currentStep < 3 ? (
                    <button
                      type='button'
                      onClick={handleNextStep}
                      className='px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors hover:cursor-pointer'
                    >
                      Continuar
                    </button>
                  ) : (
                    <button
                      type='submit'
                      className='px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors hover:cursor-pointer'
                    >
                      Finalizar Pedido
                    </button>
                  )}
                </div>
              </div>
            </div>

            <OrderSummary cartItems={parsedCartItems} subtotal={subtotal} shipping={shipping} total={total} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default CheckoutForm;
