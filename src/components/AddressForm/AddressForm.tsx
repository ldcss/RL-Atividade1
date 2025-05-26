import type { Control, FieldErrors } from 'react-hook-form';
import { type FormData } from '../../types/FormData';
import { validateZipCode } from '../../utils/checkoutFunctions';
import FormInput from '../FormInput/FormInput';

interface AddressFormProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export default function AddressForm({ control, errors }: AddressFormProps) {
  return (
    <div className='border-t pt-6'>
      <h3 className='text-md font-medium text-gray-900 mb-4'>Endereço de Entrega</h3>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
        <FormInput
          control={control}
          name='zipCode'
          label='CEP'
          rules={{
            required: 'CEP é obrigatório',
            validate: validateZipCode,
          }}
          error={errors.zipCode}
          placeholder='00000-000'
        />

        <div className='md:col-span-2'>
          <FormInput
            control={control}
            name='address'
            label='Endereço'
            rules={{ required: 'Endereço é obrigatório' }}
            error={errors.address}
            placeholder='Rua, Avenida...'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <FormInput
          control={control}
          name='number'
          label='Número'
          rules={{ required: 'Número é obrigatório' }}
          error={errors.number}
          placeholder='123'
        />

        <div className='md:col-span-2'>
          <FormInput
            control={control}
            name='complement'
            label='Complemento'
            placeholder='Apto, Bloco... (opcional)'
            optional
          />
        </div>
      </div>
    </div>
  );
}
