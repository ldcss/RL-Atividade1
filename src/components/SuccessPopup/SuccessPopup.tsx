// src/components/SuccessPopup.tsx
type SuccessPopupProps = {
  visible: boolean;
  message?: string;
};

const SuccessPopup = ({ visible, message = 'Compra realizada com sucesso!' }: SuccessPopupProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='bg-white shadow-lg rounded-lg p-6 text-center border border-green-500'>
        <h2 className='text-green-600 text-xl font-semibold'>{message}</h2>
        <p className='text-gray-600 mt-2'>Redirecionando para a página inicial...</p>
      </div>
    </div>
  );
};

export default SuccessPopup;
