import { CalendarOutlined, MailOutlined } from '@ant-design/icons';
import { lazy } from 'react';

import { Layout } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import MenuComponent from './Menu';

const { Content, Sider } = Layout;

const items = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: <Link to={'/user/profile'}>My Account</Link>,
  },
  {
    key: '2',
    icon: <CalendarOutlined />,
    label: <Link to={'/user/order-list'}>Order List</Link>,
  },
];

const styleLayout = {
  height: '100%',
};

const styleContent = {
  padding: '10px 20px',
  flex:1
  // minWidth:'100'
};

export default function LayoutAccount() {
  return (
    <Layout style={styleLayout}>
      <Sider style={{width:'100%'}}>
        <MenuComponent items={items} defaultMode='inline' defaultTheme='light' />
      </Sider>
      <Content style={styleContent}>
        <Outlet />
      </Content>
    </Layout>
  );
}
