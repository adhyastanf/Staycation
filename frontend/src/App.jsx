import { Col, Divider, Layout, Row } from 'antd';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Headers from './components/Header/Header';
import HeaderBooking from './components/HeaderBooking/HeaderBooking';
import LayoutAccount from './components/LayoutAccount';
import RegisterForm from './components/Register';
import Booking from './pages/Booking/Booking';
import DetailHouse from './pages/DetailHouse/DetailHouse';
import HomePage from './pages/Home/Home';
import OrderList from './pages/OrderList/OrderList';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <>
      {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /> */}
      <Routes>
        <Route path='/' element={<PageBase />}>
          <Route index element={<HomePage />} />
          <Route path='/house/:productId' element={<DetailHouse />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/checkout' element={<Booking />} />
          <Route path='/user' element={<LayoutAccount />}>
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/user/order-list' element={<OrderList />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

function PageBase() {
  const { pathname } = useLocation();
  const isBooking = pathname.startsWith('/checkout');

  const styleLayout = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: '0 auto',
    width: '100%',
  };

  const styleDiv = {
    width: '100%',
    maxWidth: '1350px',
  };

  return (
    <Layout>
      {isBooking ? <HeaderBooking /> : <Headers />}
      <Divider style={{ margin: 0 }} />
      <Layout.Content style={styleLayout}>
        <div style={styleDiv}>
          <Outlet />
        </div>
      </Layout.Content>
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
