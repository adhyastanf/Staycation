import { Image, Card, Space, Typography } from 'antd';
import styles from './Card.module.css';
import PropTypes from 'prop-types';

const { Text, Paragraph } = Typography;

function Cards(props) {
  const { style, popular, title, img, city, country } = props;

  function badge() {
    const styleText = {
      lineHeight: '170%',
      color: 'white',
    };

    return (
      <div style={{ position: 'absolute', top: 0, right: 0, borderRadius: '0 15px 0 15px', background: '#B0B0B0' }}>
        <Paragraph style={{ margin: '7px 14px' }}>
          <Text style={styleText}>Popular</Text>
          &nbsp;
          <Text style={{ ...styleText, fontWeight: 300 }}>Choices</Text>
        </Paragraph>
      </div>
    );
  }

  return (
    <div>
      <Card
        className={styles.card}
        style={{ borderRadius: '0', ...style }}
        bordered={false}
        hoverable={true}
        cover={
          <div style={{ display: 'flex' }}>
            <Image preview={false} width='100%' style={{ aspectRatio: '16/9' }} src={img} />
          </div>
        }
      >
        {popular && badge()}
      </Card>
      <Space direction='vertical' size={0} style={{ marginTop: 16 }}>
        <Text style={{ cursor: 'pointer' }}>{title}</Text>
        <Text style={{ cursor: 'pointer' }}>
          {city}, {country}
        </Text>
      </Space>
    </div>
  );
}

Cards.propTypes = {
  style: PropTypes.object,
  popular: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.any,
};

Cards.defaultProps = {
  style: {},
  popular: false,
  title: '',
  description: '',
  img: null,
};

export default Cards;
