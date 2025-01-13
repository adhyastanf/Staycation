import { Col, Divider, Layout, Row } from 'antd';
import { Suspense, lazy } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Headers from './components/Header/Header';
import HeaderBooking from './components/HeaderBooking/HeaderBooking';
import LoadingScreen from './components/Loading/LoadingScreen/LoadingScreen';

const LayoutAccount = lazy(() => import('./components/LayoutAccount'));
const Booking = lazy(() => import('./pages/Booking/Booking'));
const DetailHouse = lazy(() => import('./pages/DetailHouse/DetailHouse'));
const HomePage = lazy(() => import('./pages/Home/Home'));
const OrderList = lazy(() => import('./pages/OrderList/OrderList'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  return (
    <Routes>
      <Route path='/' element={<PageBase />}>
        <Route index element={<HomePage />} />
        <Route path='/house/:slug' element={<DetailHouse />} />
        <Route path='/checkout' element={<Booking />} />
        <Route path='/user' element={<LayoutAccount />}>
          <Route path='/user/profile' element={<Profile />} />
          <Route path='/user/order-list' element={<OrderList />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
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
        <Suspense fallback={<LoadingScreen />}>
          <div style={styleDiv}>
            <Outlet />
          </div>
        </Suspense>
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
