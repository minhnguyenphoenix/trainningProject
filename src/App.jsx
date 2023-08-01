import Sidebar from './components/Sidesbar';
import Home from './pages/Home';

function App() {
  return (
    <div className='w-full h-screen flex flex-row '>
      <div className='w-1/5 bg-stone-100 border-r border-e-emerald-700'>
        <Sidebar />
      </div>
      <div className='w-4/5 bg-stone-50 justify-center'>
        <Home />
      </div>
    </div>
  );
}

export default App;
