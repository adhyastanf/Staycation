import { Layout, Menu, Typography, Button } from 'antd';
import { useState } from 'react';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import Cookies from 'js-cookie';
import { fetchLogin, fetchRegister } from '../../utils/service';
import { useAuth } from '../../hooks/useAuth';

const { Header } = Layout;
const { Title } = Typography;

function Headers() {
  const { isAuthenticated, loading } = useAuth();
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const handleLogin = async (values) => {
    try{

      const res = await fetchLogin(values);
      const { accessToken, refreshToken } = res.data;
      // Simpan access dan refresh token ke cookies
      Cookies.set('token', accessToken, { expires: 1 });
      Cookies.set('refreshToken', refreshToken, { expires: 7 }); // Refresh token disimpan selama 7 hari
    }catch (err){
      throw err;
    }
  };

  const handleRegister = async (values) => {
    try {
      await fetchRegister(values);
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    window.location.reload(); // Reload halaman setelah logout
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  // Ini adalah variabel yang berisi tombol login beserta modalnya
  const loginButton = (
    <div>
      <Button type='primary' onClick={() => setIsLoginVisible(true)}>
        Login
      </Button>
      <LoginModal isVisible={isLoginVisible} onClose={() => setIsLoginVisible(false)} onLogin={handleLogin} />
    </div>
  );

  const registerButton = (
    <div>
      <Button type='primary' onClick={() => setIsRegisterVisible(true)}>
        Register
      </Button>
      <RegisterModal isVisible={isRegisterVisible} onClose={() => setIsRegisterVisible(false)} onRegister={async (values) => await handleRegister(values)} />
    </div>
  );

  // Array item menu, termasuk `loginButton` sebagai elemen JSX, bukan fungsi
  const nav = isAuthenticated ? ['Home', 'Browse by', 'Stories', 'Agents', <Button onClick={handleLogout}>Logout</Button>] : ['Home', 'Browse by', 'Stories', 'Agents', loginButton, registerButton];

  return (
    <Header style={headerStyle}>
      <Title level={3} style={{ marginTop: 0 }}>
        <span style={{ color: '#3252DF' }}>Stay</span>
        cation.
      </Title>
      {!loading && (
        <Menu
          mode='horizontal'
          disabledOverflow
          defaultSelectedKeys={['1']}
          items={nav.map((val, index) => {
            return {
              key: index + 1,
              label: val,
            };
          })}
        />
      )}
    </Header>
  );
}

export default Headers;
