import { Divider, Image, Typography } from 'antd';
import OceanLand from '../../assets/oceanLand.png';
import FormBooking from '../../components/Form/FormBooking';
const { Title, Paragraph, Text } = Typography;

function BookingInformation() {
  const contentStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // transform: 'translateX(-50px)',
  };

  const imgStyle = {
    borderRadius: '15px',
    marginBottom: '16px',
    width: '420px',
    aspectRatio: '16 / 9',
    objectFit: 'cover',
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto' }}>
      <Title style={{ textAlign: 'center' }}>Booking Information</Title>
      <Paragraph style={{ textAlign: 'center', color: '#B0B0B0' }}>Please fill up the blank fields below</Paragraph>
      <div style={contentStyle}>
        <div>
          <Image preview={false} src={OceanLand} style={imgStyle} />
          <div style={{ display: 'flex', justifyContent:'space-between', alignItems: 'center', width: '420px' }}>
            <div>
              <Paragraph style={{ marginBottom: 0 }}>Podo Wae</Paragraph>
              <Paragraph style={{ color: '#B0B0B0' }}>Madiun, Indonesia</Paragraph>
            </div>
            <Paragraph>
              $480 USD <Text style={{ color: '#B0B0B0' }}>per</Text> 2 nights
            </Paragraph>
          </div>
        </div>
        <Divider orientation='center' type='vertical' style={{ height: '432px', marginLeft: '80px', marginRight: '80px' }} />
        <FormBooking />
      </div>
    </div>
  );
}

export default BookingInformation;
