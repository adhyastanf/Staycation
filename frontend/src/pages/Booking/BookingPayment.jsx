import { Divider, Typography } from 'antd';
import FormBookingPayment from '../../components/Form/FormBookingPayment';
const { Title, Paragraph, Text } = Typography;

function BookingPayment() {
  const contentStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // transform: 'translateX(220px)',
    // gap: '80px',
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <Title style={{ textAlign: 'center' }}>Booking Payment</Title>
      <Paragraph style={{ textAlign: 'center', color: '#B0B0B0' }}>Kindly follow the instructions below</Paragraph>
      <div style={contentStyle}>
        <div style={{flex:1}}>
          <Paragraph>Transfer Pembayaran:</Paragraph>
          <Paragraph>Tax: 10%</Paragraph>
          <Paragraph>Sub total: $480 USD</Paragraph>
          <Paragraph>
            $480 USD <Text style={{ color: '#B0B0B0' }}>per</Text> 2 nights
          </Paragraph>
        </div>
        <Divider orientation='center' type='vertical' style={{ height: '432px', marginLeft: '112px', marginRight: '80px' }} />
        <FormBookingPayment />
      </div>
    </div>
  );
}

export default BookingPayment;
