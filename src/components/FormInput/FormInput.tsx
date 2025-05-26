import { Controller } from 'react-hook-form';

interface FormInputProps {
  control: any;
  name: string;
  label: string;
  rules?: any;
  error?: any;
  placeholder?: string;
  type?: string;
  optional?: boolean;
  format?: (value: string) => string;
  transform?: (value: string) => string;
  maxLength?: number;
}

const FormInput = ({
  control,
  name,
  label,
  rules = {},
  error,
  placeholder = '',
  type = 'text',
  optional = false,
  format = value => value,
  transform = value => value,
  maxLength,
}: FormInputProps) => {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        {label} {!optional && <span className='text-red-500'>*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            onChange={e => {
              let value = e.target.value;
              if (transform) value = transform(value);
              if (format) value = format(value);
              field.onChange(value);
            }}
            className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        )}
      />
      {error && <p className='mt-1 text-sm text-red-500'>{error.message}</p>}
    </div>
  );
};

export default FormInput;
