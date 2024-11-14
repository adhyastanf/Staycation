import { Card, Typography } from 'antd';
import { useSearchParams } from 'react-router-dom';
import useBookStore from '../../store/booking-store';

const { Paragraph, Title } = Typography;

export default function OrderStatus() {
  let [searchParams] = useSearchParams();
  let queryTransaction = searchParams.get('transaction_id');
  let queryStatus = searchParams.get('transaction_status');
  const { imgUrl, city, name, country, price, nights, bookingStartDate, bookingEndDate, productId } = useBookStore();
  const cardStyle = {
    padding: '10px',
    marginBottom: '30px',
  };

  return (
    <div style={{ width: '400px', margin: 'auto' }}>
      <Title level={3}>Booking Status Order</Title>
      <Card style={cardStyle}>
        <div>
          <Title level={5}>Transaction ID</Title>
          <Paragraph>{queryTransaction}</Paragraph>
        </div>
        <div>
          <Title level={5}>Customer Name</Title>
          <Paragraph>112312312321</Paragraph>
        </div>
        <div>
          <Title level={5}>Customer Email</Title>
          <Paragraph>112312312321</Paragraph>
        </div>
        <div>
          <Title level={5}>Status</Title>
          <Paragraph>{queryStatus}</Paragraph>
        </div>
      </Card>
      <Card style={cardStyle}>
        <Title level={5}>{name}</Title>
        <Paragraph>{city}, {country}</Paragraph>
        <Paragraph>{nights} Night Rp. 1.000.000</Paragraph>
        <Paragraph>Total Rp. 1.200.000</Paragraph>
      </Card>
    </div>
  );
}
