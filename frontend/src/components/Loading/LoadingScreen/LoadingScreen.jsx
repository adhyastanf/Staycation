import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

const LoadingScreen = () => (
  <Flex align='center' justify='center' gap='middle' style={{ height: '100vh', width: '100%' }}>
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 48,
          }}
          spin
        />
      }
    />
  </Flex>
);
export default LoadingScreen;
