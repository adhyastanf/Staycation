import { LogoutOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, Layout, Menu, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import useAuthStore from '../../store/auth-store';
import useProfileStore from '../../store/profile-store';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';

const { Header } = Layout;
const { Title } = Typography;

function Headers() {
  const { isAuth, handleLogin, handleRegister, handleLogout, loading } = useAuthStore();
  const { loadData, data } = useProfileStore();
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  useAuth()

  useEffect(() => {
    if (isAuth && !data) {
      loadData('data');
    }
  }, [isAuth]);

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const loginButton = (
    <div>
      <Button type='primary' onClick={() => setIsLoginVisible(true)}>
        Login
      </Button>
      <LoginModal open={isLoginVisible} onClose={() => setIsLoginVisible(false)} onLogin={handleLogin} />
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

  const logoutButton = (
    <>
      <MenuComponent username={data?.username} onClick={handleLogout} />
    </>
  );

  const authComponent = isAuth ? (
    <Flex gap={20} align={'center'}>
      {logoutButton}
    </Flex>
  ) : (
    <Flex gap={20}>
      {loginButton}
      {registerButton}
    </Flex>
  );

  const nav = ['Home', 'Browse by', 'Stories', 'Agents'];

  return (
    <Header style={headerStyle}>
      <Link to='/'>
        <Title level={3} style={{ marginTop: 0 }}>
          <span style={{ color: '#3252DF' }}>Stay</span>
          cation.
        </Title>
      </Link>
      <Flex align={'center'}>
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

        {!loading && authComponent}
      </Flex>
    </Header>
  );
}

export default Headers;

function MenuComponent({ username = '', onClick }) {
  const items = [
    {
      key: '1',
      label: username,
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: <Link to='/user/profile'>Profile</Link>,
    },
    {
      key: '3',
      label: <Link to='/user/order-list'>Order List</Link>,
    },
    {
      key: '4',
      label: <div onClick={onClick}>Logout</div>,
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <div>{username}</div>
      </a>
    </Dropdown>
  );
}
