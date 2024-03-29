import { Divider, Layout } from 'antd';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Headers from './components/Header/Header';
import HeaderBooking from './components/HeaderBooking/HeaderBooking';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import Booking from './pages/Booking/Booking';
import DetailHouse from './pages/DetailHouse/DetailHouse';
import HomePage from './pages/Home/Home';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<PageBase />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/house/:id' element={<DetailHouse />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/booking' element={<Booking />} />
        </Route>
      </Routes>
    </>
  );
}

function PageBase() {
  const { pathname } = useLocation();
  const isBooking = pathname.startsWith('/booking');

  return (
    <Layout>
      {isBooking ? <HeaderBooking /> : <Headers />}
      <Divider style={{ margin: 0 }} />
      <Outlet />
      {!isBooking && (
        <>
          <Divider style={{ margin: 0 }} />
          <Footer />
        </>
      )}
    </Layout>
  );
}

export default App;
