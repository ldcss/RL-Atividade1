import Main from '../../components/Main/Main';
import Navbar from '../../components/Navbar/Navbar';

export const Home = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <Main>
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-3xl font-bold'>Bem-vindo à minha página inicial!</h1>
          <p className='mt-4'>Esta é uma aplicação de exemplo usando React e Tailwind CSS.</p>
        </div>
      </Main>
    </div>
  );
};

export default Home;
