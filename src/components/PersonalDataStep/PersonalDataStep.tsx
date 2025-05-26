import type { Control, FieldErrors } from 'react-hook-form';
import { type FormData } from '../../types/FormData';
import { validateEmail, validatePhone } from '../../utils/checkoutFunctions';
import FormInput from '../FormInput/FormInput';
import AddressForm from '../AddressForm/AddressForm';

interface PersonalDataStepProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export default function PersonalDataStep({ control, errors }: PersonalDataStepProps) {
  return (
    <div className='space-y-6'>
      <h2 className='text-lg font-medium text-gray-900 mb-6'>Dados Pessoais</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <FormInput
          control={control}
          name='firstName'
          label='Nome'
          rules={{ required: 'Nome é obrigatório' }}
          error={errors.firstName}
          placeholder='Seu nome'
        />

        <FormInput
          control={control}
          name='lastName'
          label='Sobrenome'
          rules={{ required: 'Sobrenome é obrigatório' }}
          error={errors.lastName}
          placeholder='Seu sobrenome'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <FormInput
          control={control}
          name='email'
          label='E-mail'
          type='email'
          rules={{
            required: 'E-mail é obrigatório',
            validate: validateEmail,
          }}
          error={errors.email}
          placeholder='seu@email.com'
        />

        <FormInput
          control={control}
          name='phone'
          label='Telefone'
          type='tel'
          rules={{
            required: 'Telefone é obrigatório',
            validate: validatePhone,
          }}
          error={errors.phone}
          placeholder='(11) 99999-9999'
        />
      </div>

      <AddressForm control={control} errors={errors} />
    </div>
  );
}
