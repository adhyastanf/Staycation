import { Button, Card, Col, Image, Layout, Row, Space, Typography } from 'antd';
import { useEffect } from 'react';
import blueOrigin from '../../assets/blueOrigin.png';
import HeroImg from '../../assets/hero.png';
import oceanLand from '../../assets/oceanLand.png';
import { CitiesIcon, TravelerIcon, TreasureIcon } from '../../components/Icons';
import PlaceComponent from '../../components/PlaceComponent/placeComponent';
import Story from '../../components/Story/Story';
import useHomeStore from '../../store/home-store';
import styles from './Home.module.css';

const { Content } = Layout;

const { Title, Paragraph, Text } = Typography;

function HomePage() {
  const { loadData, data, loading } = useHomeStore();

  useEffect(() => {
    if (!data['backyard']) {
      loadData('backyard', 1);
    }
    if (!data['livingRoom']) {
      loadData('livingRoom', 2);
    }
    if (!data['kitchenSet']) {
      loadData('kitchenSet', 3);
    }
  }, [loadData]);

  return (
    <Content>
      <HeroComponent />
      <MostPickedComponent />
      <PlaceComponent heading='Houses with backyard' data={data['backyard']} loading={loading['backyard']} />
      <PlaceComponent heading='Hotels with large living room' data={data['livingRoom']} loading={loading['livingRoom']} />
      <PlaceComponent heading='Apartments with kitchen set' data={data['kitchenSet']} loading={loading['kitchenSet']} />
      <Story />
    </Content>
  );
}

function HeroComponent() {
  const paragraphStyle = {
    lineHeight: '170%',
    color: '#B0B0B0',
    width: '333px',
    marginBottom: '30px',
  };

  const heroImgStyle = {
    borderRadius: '100px 15px 15px 15px',
    position: 'relative',
    right: '39px',
  };

  const borderHeroStyle = {
    width: '506px',
    height: '398px',
    border: '1px solid #E5E5E5',
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    top: '36px',
  };

  const textStyle = {
    lineHeight: '170%',
    color: '#B0B0B0',
    fontWeight: 300,
  };

  const listHero = [
    {
      icon: <TravelerIcon />,
      amount: '80,409',
      text: 'travelers',
    },
    {
      icon: <TreasureIcon />,
      amount: '862',
      text: 'treasure',
    },
    {
      icon: <CitiesIcon />,
      amount: '1,492',
      text: 'cities',
    },
  ];

  return (
    <Row style={{ margin: '100px 0' }}>
      <Col flex={1}>
        <Title style={{ marginTop: 0, marginBottom: '30px' }}>
          Forget Busy Work,
          <br /> Start Next Vacation
        </Title>
        <Paragraph style={paragraphStyle}>We provide what you need to enjoy your holiday with family. Time to make another memorable moments.</Paragraph>
        <Button type='primary' style={{ marginBottom: '82px', height: 'auto', padding: '10px 28px', display: 'block' }}>
          Show Me Now
        </Button>
        <Space size={52}>
          {listHero.map((list, idx) => {
            return (
              <div key={idx}>
                {list.icon}
                <Paragraph style={{ fontWeight: '500', marginTop: '10px' }}>
                  {list.amount}&nbsp;
                  <Text style={textStyle}>{list.text}</Text>
                </Paragraph>
              </div>
            );
          })}
        </Space>
      </Col>
      <Col flex={1} style={{ display: 'flex', position: 'relative', justifyContent: 'flex-end' }}>
        <div style={borderHeroStyle}></div>
        <Image width={520} src={HeroImg} preview={false} style={heroImgStyle} />
      </Col>
    </Row>
  );
}

function MostPickedComponent() {
  const colData = [
    [
      {
        src: oceanLand,
        title: 'Ocean Land',
        description: 'Bandung, Indonesia',
      },
      {
        src: oceanLand,
        title: 'Vinna Vill',
        description: 'Malang, Indonesia',
      },
    ],
    [
      {
        src: oceanLand,
        title: 'Stark House',
        description: 'Malang, Indonesia',
      },
      {
        src: oceanLand,
        title: 'Bobox',
        description: 'Medan, Indonesia',
      },
    ],
  ];

  const textStyle = {
    color: 'white',
    cursor: 'pointer',
  };
  const containerText = { position: 'absolute', bottom: 24, left: 24 };

  function textComponent(title, description) {
    return (
      <Space direction='vertical' size={0} style={containerText}>
        <Text style={textStyle}>{title}</Text>
        <Text style={{ fontWeight: 300, ...textStyle }}>{description}</Text>
      </Space>
    );
  }

  return (
    <div className={styles.containerBackyard} style={{ marginBottom: 70 }}>
      <Title level={3} style={{ marginBottom: '20px' }}>
        Houses with beauty backyard
      </Title>
      <Row gutter={[30, 30]}>
        <Col flex={1} style={{ display: 'grid', gap: 30 }}>
          <Card hoverable={true} bordered={false}>
            <div style={{ display: 'flex' }}>
              <Image preview={false} width='100%' height='460px' src={blueOrigin} />
            </div>
            {textComponent('Blue Origin', 'Jakarta, Indonesia')}
          </Card>
        </Col>
        {colData.map((_, colIndex) => (
          <Col key={colIndex} flex={1} style={{ display: 'grid', gap: 30 }}>
            {colData[colIndex].map((card, cardIndex) => {
              return (
                <Card key={cardIndex} bordered={false} hoverable={true} style={{ borderRadius: 15, overflow: 'hidden' }}>
                  <div style={{ display: 'flex' }}>
                    <Image preview={false} width='100%' height='215px' src={card.src} />
                  </div>
                  {textComponent(card.title, card.description)}
                </Card>
              );
            })}
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
