import { Col, Row, Image, Typography, Space, Button } from 'antd';
import FamilyImg from '../../assets/family.png';

const { Text } = Typography;

function Story() {
  const borderImg = {
    width: 356,
    height: 487,
    border: '1px solid #E5E5E5',
    borderRadius: 15,
    position: 'absolute',
  };

  const storyImgStyle = {
    borderRadius: '15px 15px 100px 15px',
    marginLeft: 39,
    marginTop: 39,
    maxWidth: 366,
  };

  return (
    <Row style={{ maxWidth: '1058px', marginBottom: 100 }} gutter={[60, 60]} align='middle' wrap={false}>
      <Col flex={'405px'} style={{ position: 'relative' }}>
        <div style={borderImg}></div>
        <Image src={FamilyImg} preview={false} style={storyImgStyle} />
      </Col>
      <Col flex={'auto'}>
        <Space direction='vertical' size={50}>
          <Text style={{ fontSize: '1.5rem' }}>Happy Family</Text>
          <Space direction='vertical' size={8}>
            <Text style={{ fontSize: '2rem' }}>What a great trip with my family and I should try again next time soon ...</Text>
            <Text style={{ fontSize: '1.125rem', fontWeight: 300 }}>Angga, Product Designer</Text>
          </Space>
          <Button type='primary' style={{ marginBottom: '82px', height: 'auto', padding: '10px 28px', display: 'block' }}>
            Read Their Story
          </Button>
        </Space>
      </Col>
    </Row>
  );
}

export default Story;
