import type { Control, FieldErrors } from 'react-hook-form';
import { type FormData } from '../../types/FormData';
import {
  formatCardNumber,
  formatExpiry,
  validateCVV,
  validateCardNumber,
  validateExpiry,
} from '../../utils/checkoutFunctions';
import FormInput from '../FormInput/FormInput';

interface CreditCardFormProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const CreditCardForm = ({ control, errors }: CreditCardFormProps) => {
  return (
    <div className='space-y-4'>
      <FormInput
        control={control}
        name='cardNumber'
        label='Número do Cartão'
        rules={{
          required: 'Número do cartão é obrigatório',
          validate: validateCardNumber,
        }}
        format={formatCardNumber}
        error={errors.cardNumber}
        placeholder='0000 0000 0000 0000'
        maxLength={19}
      />

      <FormInput
        control={control}
        name='cardName'
        label='Nome no Cartão'
        rules={{ required: 'Nome no cartão é obrigatório' }}
        transform={value => value.toUpperCase()}
        error={errors.cardName}
        placeholder='NOME COMO NO CARTÃO'
      />

      <div className='grid grid-cols-2 gap-4'>
        <FormInput
          control={control}
          name='cardExpiry'
          label='Validade'
          rules={{
            required: 'Data de validade é obrigatória',
            validate: validateExpiry,
          }}
          format={formatExpiry}
          error={errors.cardExpiry}
          placeholder='MM/AA'
          maxLength={5}
        />

        <FormInput
          control={control}
          name='cardCvv'
          label='CVV'
          rules={{
            required: 'CVV é obrigatório',
            validate: validateCVV,
          }}
          transform={value => value.replace(/\D/g, '')}
          error={errors.cardCvv}
          placeholder='123'
          maxLength={4}
        />
      </div>
    </div>
  );
};

export default CreditCardForm;
