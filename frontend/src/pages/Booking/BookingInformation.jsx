import { Button, Divider, Image, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OceanLand from '../../assets/oceanLand.png';
import FormBooking from '../../components/Form/FormBooking';
import useBookStore from '../../store/booking-store';
import axios from 'axios';
import useSnap from '../../hooks/useSnap';
const { Title, Paragraph, Text } = Typography;

function BookingInformation() {
  const { imgUrl, city, name, country, price, nights, bookingStartDate, bookingEndDate, productId } = useBookStore();
  const API_URL = 'http://localhost:5000';
  const [snap, setSnap] = useState(false);
  const navigate = useNavigate();

  const imgStyle = {
    borderRadius: '15px',
    marginBottom: '16px',
    width: '420px',
    aspectRatio: '16 / 9',
    objectFit: 'cover',
  };

  const { snapEmbed } = useSnap();

  async function pay() {
    const body = {
      bookingStartDate,
      bookingEndDate,
      product_id: productId,
      night: nights,
    };

    const headers = {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9wYWwiLCJ1c2VyX2lkIjoiZTk4OGU0OGYtYjM4Mi00MDFmLWIzNTktZDhmN2M3YmM5NWY4IiwiaWF0IjoxNzI1OTU2MzQ3LCJleHAiOjE3MjYwNDI3NDd9.2pc29B9sLOUZRJWL1JEVZJcrw882HC5N97x9-Di3Ots',
    };
    const res = await axios.post(`${API_URL}/transaction`, body, { headers: headers });

    if (res && res.status === 200) {
      setSnap(true);
      snapEmbed(res.data.data.snap_token, 'snap-container', {
        onSuccess: function (result) {
          console.log('success', result);
          // navigate(`/order-status?transaction_id=${res.data.data.id}`)
          setSnap(false);
        },
        onPending: function (result) {
          console.log('pending', result);
          // navigate(`/order-status?transaction_id=${res.data.data.id}`)
          setSnap(false);
        },
        onClose: function () {
          navigate(`/`)
          setSnap(false);
        },
      });
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: 'auto' }}>
      {!snap && (
        <>
          <Title style={{ textAlign: 'center' }}>Booking Information</Title>
          <Paragraph style={{ textAlign: 'center', color: '#B0B0B0' }}>Please fill up the blank fields below</Paragraph>
          <div>
            <div>
              <Image preview={false} src={OceanLand} style={imgStyle} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '420px' }}>
                <div>
                  <Paragraph style={{ marginBottom: 0 }}>{name}</Paragraph>
                  <Paragraph style={{ color: '#B0B0B0' }}>{`${city}, ${country}`}</Paragraph>
                </div>
                <Paragraph>
                  ${price} USD <Text style={{ color: '#B0B0B0' }}>per</Text> {nights} nights
                </Paragraph>
              </div>
              <Paragraph>Adhyasta Naufal Faadhilah</Paragraph>
              <Button size='large' type='primary' style={{ width: '100%' }} onClick={pay}>
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
      <div id='snap-container'></div>
    </div>
  );
}

export default BookingInformation;
