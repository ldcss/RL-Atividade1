import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { BsCheck, BsLock, BsCreditCard, BsBank } from 'react-icons/bs';
import { MdPix } from 'react-icons/md';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CheckoutFormProps {
  cartItems?: CartItem[];
  onOrderComplete?: (orderData: any) => void;
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  zipCode: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  paymentMethod: 'credit' | 'debit' | 'pix' | 'boleto';
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
}

export default function CheckoutPage({ cartItems = [], onOrderComplete }: CheckoutFormProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
    setValue,
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
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleNextStep = async () => {
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
    onOrderComplete?.(data);
    console.log('Pedido finalizado:', data);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) || 'E-mail inválido';
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^$$\d{2}$$\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(phone) || 'Telefone deve estar no formato (11) 99999-9999';
  };

  const validateZipCode = (zipCode: string) => {
    const zipRegex = /^\d{5}-?\d{3}$/;
    return zipRegex.test(zipCode) || 'CEP deve estar no formato 00000-000';
  };

  const validateCardNumber = (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    return cleanNumber.length >= 13 || 'Número do cartão inválido';
  };

  const validateExpiry = (expiry: string) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiry)) return 'Data inválida (MM/AA)';

    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const cardYear = Number.parseInt(year);
    const cardMonth = Number.parseInt(month);

    if (cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth)) {
      return 'Cartão expirado';
    }

    return true;
  };

  const validateCVV = (cvv: string) => {
    return cvv.length >= 3 || 'CVV deve ter pelo menos 3 dígitos';
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        {/* Header */}
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-2'>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                {/* Step 1: Personal Data */}
                {currentStep === 1 && (
                  <div className='space-y-6'>
                    <h2 className='text-lg font-medium text-gray-900 mb-6'>Dados Pessoais</h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Nome <span className='text-red-500'>*</span>
                        </label>
                        <Controller
                          name='firstName'
                          control={control}
                          rules={{ required: 'Nome é obrigatório' }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type='text'
                              className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                                errors.firstName ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder='Seu nome'
                            />
                          )}
                        />
                        {errors.firstName && <p className='mt-1 text-sm text-red-500'>{errors.firstName.message}</p>}
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Sobrenome <span className='text-red-500'>*</span>
                        </label>
                        <Controller
                          name='lastName'
                          control={control}
                          rules={{ required: 'Sobrenome é obrigatório' }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type='text'
                              className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                                errors.lastName ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder='Seu sobrenome'
                            />
                          )}
                        />
                        {errors.lastName && <p className='mt-1 text-sm text-red-500'>{errors.lastName.message}</p>}
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          E-mail <span className='text-red-500'>*</span>
                        </label>
                        <Controller
                          name='email'
                          control={control}
                          rules={{
                            required: 'E-mail é obrigatório',
                            validate: validateEmail,
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type='email'
                              className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder='seu@email.com'
                            />
                          )}
                        />
                        {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Telefone <span className='text-red-500'>*</span>
                        </label>
                        <Controller
                          name='phone'
                          control={control}
                          rules={{
                            required: 'Telefone é obrigatório',
                            validate: validatePhone,
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type='tel'
                              className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                                errors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder='(11) 99999-9999'
                            />
                          )}
                        />
                        {errors.phone && <p className='mt-1 text-sm text-red-500'>{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className='border-t pt-6'>
                      <h3 className='text-md font-medium text-gray-900 mb-4'>Endereço de Entrega</h3>

                      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>
                            CEP <span className='text-red-500'>*</span>
                          </label>
                          <Controller
                            name='zipCode'
                            control={control}
                            rules={{
                              required: 'CEP é obrigatório',
                              validate: validateZipCode,
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type='text'
                                className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                                  errors.zipCode ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder='00000-000'
                              />
                            )}
                          />
                          {errors.zipCode && <p className='mt-1 text-sm text-red-500'>{errors.zipCode.message}</p>}
                        </div>

                        <div className='md:col-span-2'>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Endereço <span className='text-red-500'>*</span>
                          </label>
                          <Controller
                            name='address'
                            control={control}
                            rules={{ required: 'Endereço é obrigatório' }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type='text'
                                className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                                  errors.address ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder='Rua, Avenida...'
                              />
                            )}
                          />
                          {errors.address && <p className='mt-1 text-sm text-red-500'>{errors.address.message}</p>}
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Número <span className='text-red-500'>*</span>
                          </label>
                          <Controller
                            name='number'
                            control={control}
                            rules={{ required: 'Número é obrigatório' }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type='text'
                                className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                                  errors.number ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder='123'
                              />
                            )}
                          />
                          {errors.number && <p className='mt-1 text-sm text-red-500'>{errors.number.message}</p>}
                        </div>

                        <div className='md:col-span-2'>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>Complemento</label>
                          <Controller
                            name='complement'
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type='text'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors'
                                placeholder='Apto, Bloco... (opcional)'
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment */}
                {currentStep === 2 && (
                  <div className='space-y-6'>
                    <h2 className='text-lg font-medium text-gray-900 mb-6'>Forma de Pagamento</h2>

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
                                  field.value === method.key
                                    ? 'border-gray-900 bg-gray-50'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                              >
                                <Icon className='w-5 h-5' />
                                <span className='text-sm font-medium'>{method.label}</span>
                              </button>
                            )}
                          />
                        );
                      })}
                    </div>

                    {paymentMethod === 'credit' && (
                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Número do Cartão <span className='text-red-500'>*</span>
                          </label>
                          <Controller
                            name='cardNumber'
                            control={control}
                            rules={{
                              required: 'Número do cartão é obrigatório',
                              validate: validateCardNumber,
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type='text'
                                onChange={e => field.onChange(formatCardNumber(e.target.value))}
                                className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                                  errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder='0000 0000 0000 0000'
                                maxLength={19}
                              />
                            )}
                          />
                          {errors.cardNumber && (
                            <p className='mt-1 text-sm text-red-500'>{errors.cardNumber.message}</p>
                          )}
                        </div>

                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Nome no Cartão <span className='text-red-500'>*</span>
                          </label>
                          <Controller
                            name='cardName'
                            control={control}
                            rules={{ required: 'Nome no cartão é obrigatório' }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type='text'
                                onChange={e => field.onChange(e.target.value.toUpperCase())}
                                className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                                  errors.cardName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder='NOME COMO NO CARTÃO'
                              />
                            )}
                          />
                          {errors.cardName && <p className='mt-1 text-sm text-red-500'>{errors.cardName.message}</p>}
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                              Validade <span className='text-red-500'>*</span>
                            </label>
                            <Controller
                              name='cardExpiry'
                              control={control}
                              rules={{
                                required: 'Data de validade é obrigatória',
                                validate: validateExpiry,
                              }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type='text'
                                  onChange={e => field.onChange(formatExpiry(e.target.value))}
                                  className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                                    errors.cardExpiry ? 'border-red-500' : 'border-gray-300'
                                  }`}
                                  placeholder='MM/AA'
                                  maxLength={5}
                                />
                              )}
                            />
                            {errors.cardExpiry && (
                              <p className='mt-1 text-sm text-red-500'>{errors.cardExpiry.message}</p>
                            )}
                          </div>

                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                              CVV <span className='text-red-500'>*</span>
                            </label>
                            <Controller
                              name='cardCvv'
                              control={control}
                              rules={{
                                required: 'CVV é obrigatório',
                                validate: validateCVV,
                              }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type='text'
                                  onChange={e => field.onChange(e.target.value.replace(/\D/g, ''))}
                                  className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                                    errors.cardCvv ? 'border-red-500' : 'border-gray-300'
                                  }`}
                                  placeholder='123'
                                  maxLength={4}
                                />
                              )}
                            />
                            {errors.cardCvv && <p className='mt-1 text-sm text-red-500'>{errors.cardCvv.message}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'pix' && (
                      <div className='text-center py-8 bg-gray-50 rounded-lg'>
                        <MdPix className='w-12 h-12 mx-auto mb-4 text-gray-600' />
                        <p className='text-gray-600'>
                          Após confirmar o pedido, você receberá o código PIX para pagamento
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'boleto' && (
                      <div className='text-center py-8 bg-gray-50 rounded-lg'>
                        <BsBank className='w-12 h-12 mx-auto mb-4 text-gray-600' />
                        <p className='text-gray-600'>O boleto será gerado após a confirmação do pedido</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
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
                )}

                {/* Navigation */}
                <div className='flex justify-between pt-6 mt-6 border-t'>
                  <button
                    type='button'
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className='px-6 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                  >
                    Voltar
                  </button>
                  {currentStep < 3 ? (
                    <button
                      type='button'
                      onClick={handleNextStep}
                      className='px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors'
                    >
                      Continuar
                    </button>
                  ) : (
                    <button
                      type='submit'
                      className='px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
                    >
                      Finalizar Pedido
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className='lg:col-span-1'>
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
                      <p className='text-sm font-medium text-gray-900'>R$ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className='border-t pt-4 space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Subtotal</span>
                    <span className='text-gray-900'>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Frete</span>
                    <span className='text-gray-900'>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className='flex justify-between text-base font-medium pt-2 border-t'>
                    <span className='text-gray-900'>Total</span>
                    <span className='text-gray-900'>R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
