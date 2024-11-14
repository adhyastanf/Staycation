import { Divider, Layout } from 'antd';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Headers from './components/Header/Header';
import HeaderBooking from './components/HeaderBooking/HeaderBooking';
import RegisterForm from './components/Register';
import Booking from './pages/Booking/Booking';
import DetailHouse from './pages/DetailHouse/DetailHouse';
import HomePage from './pages/Home/Home';
import OrderStatus from './pages/OrderStatus/OrderStatus';
import LoginDialog from './components/LoginSupabase';

function App() {

  return (
    <>
    {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /> */}
      <Routes>
        <Route path='/' element={<PageBase />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/house/:productId' element={<DetailHouse />} />
          <Route path='/login' element={<LoginDialog />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/checkout' element={<Booking />} />
          <Route path='/order-status' element={<OrderStatus />} />
        </Route>
      </Routes>
    </>
  );
}

function PageBase() {
  const { pathname } = useLocation();
  const isBooking = pathname.startsWith('/checkout');

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
