import { Card, Flex, Layout, Skeleton, Space, Typography } from 'antd';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function LoadingCardOrderList() {
  return (
    <Space direction='vertical' size='middle' style={{ width: '100%' }}>
      {Array.from({ length: 4 }).map((_, idx) => {
        return (
          <Content key={idx}>
            <LoadingCardItem />
          </Content>
        );
      })}
    </Space>
  );
}

function LoadingCardItem() {
  const header = (
    <Flex align='center' gap={20}>
      <Skeleton.Input active size='large' />
      <Skeleton.Input active size='large' />
      <Skeleton.Input active size='large' />
    </Flex>
  );

  return (
    <Card title={header} >
      <Flex gap={20}>
        <Skeleton.Image style={{ width: 200, alignSelf: 'self-start' }} />
        <Flex justify='space-between' align='center' flex={1}>
          <Content>
            <Paragraph>
              <Skeleton.Input active size='large' />
              <Skeleton.Input active size='large' />
            </Paragraph>
            <Skeleton.Input active size='large' />
            <Skeleton.Input active size='large' />
          </Content>
          <Paragraph>
            <Skeleton.Input active size='large' />
            <Skeleton.Input active size='large' />
          </Paragraph>
        </Flex>
      </Flex>
      <Flex gap={10} style={{ marginTop: 20 }}>
        <Skeleton.Button active size='large' />
        <Skeleton.Button active size='large' />
      </Flex>
    </Card>
  );
}
