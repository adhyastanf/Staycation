import { Col, Row, Typography } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cards from '../Card/Card';
import EmptyData from '../EmptyComponent/EmptyData';
import LoadingCardHome from '../Loading/LoadingCardHome';

const { Title, Paragraph } = Typography;

export default function PlaceComponent({ heading, data, loading }) {
  if (loading) {
    return <LoadingCardHome />;
  }

  const isEmpty = Boolean(data.length);

  return (
    <Paragraph style={{ marginBottom: 60 }}>
      <Title level={3} style={{ marginBottom: 10 }}>
        {heading}
      </Title>
      {!isEmpty ? (
        <EmptyData />
      ) : (
        <Row gutter={[30, 30]}>
          {data.map((card, cardIndex) => (
            <Col key={cardIndex} span={6}>
              <Link to={'house/'.concat(card?.id)}>
                <Cards img={card.img_url} title={card.title} description={card.description} popular={card.popular} />
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Paragraph>
  );
}

PlaceComponent.propTypes = {
  heading: PropTypes.string,
  data: PropTypes.array,
  loading: PropTypes.bool,
};

PlaceComponent.defaultProps = {
  heading: '',
  data: [],
  loading: true,
};
