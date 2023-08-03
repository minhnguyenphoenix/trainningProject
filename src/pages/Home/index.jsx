import Header from './Header';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <div className='h-full py-20 px-20'>
      <Header />
      <Outlet />
    </div>
  );
}

export default Home;
