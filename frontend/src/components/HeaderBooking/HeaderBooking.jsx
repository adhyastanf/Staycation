import { Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

function HeaderBooking() {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Header style={headerStyle}>
      <Link to={'/'}>
        <Title level={3} style={{ marginTop: 0 }}>
          <span style={{ color: '#3252DF' }}>Stay</span>
          cation.
        </Title>
      </Link>
    </Header>
  );
}

export default HeaderBooking;
