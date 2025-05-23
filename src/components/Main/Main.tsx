import type { MainProps } from '../../types/MainProps';

const Main = ({ children }: MainProps) => {
  return (
    <main className='flex-1 overflow-y-auto p-4'>
      <div className='container mx-auto'>{children}</div>
    </main>
  );
};

export default Main;
