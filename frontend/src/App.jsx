import { Divider, Layout } from 'antd';
import { Outlet, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Headers from './components/Header/Header';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import HomePage from './pages/Home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PageBase />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
        </Route>
      </Routes>
    </>
  );
}

function PageBase() {
  return (
    <Layout>
      <Headers />
      <Divider style={{ margin: 0 }} />
      <Outlet />
      <Divider style={{ margin: 0 }} />
      <Footer />
    </Layout>
  );
}

export default App;
