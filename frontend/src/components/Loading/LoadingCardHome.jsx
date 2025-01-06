import { Col, Layout, Row, Skeleton, Typography } from 'antd';

const { Paragraph } = Typography;

export default function LoadingCardHome() {
  return (
    <Paragraph style={{ marginBottom: 60 }}>
      <Skeleton.Input active={true} style={{ width: 160, marginBottom: 10 }} size='small' />
      <Row gutter={[30, 30]}>
        {Array.from({ length: 4 }).map((_, cardIndex) => (
          <Col key={cardIndex} span={6}>
            <Skeleton.Input active={true} block={true} style={{ height: 160, marginBottom:10 }} />
            <Skeleton.Input active={true} block={true} size='small' />
          </Col>
        ))}
      </Row>
    </Paragraph>
  );
}
