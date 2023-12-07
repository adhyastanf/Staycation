import { Layout, Menu, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

function Headers() {
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const nav = ['Home', 'Browse by', 'Stories', 'Agents'];

  return (
    <Header style={headerStyle}>
      <Title level={3} style={{ marginTop: 0 }}>
        <span style={{ color: '#3252DF' }}>Stay</span>
        cation.
      </Title>
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
    </Header>
  );
}

export default Headers;
