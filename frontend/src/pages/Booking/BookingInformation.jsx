import { Button, Image, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSnap from '../../hooks/useSnap';
import useBookStore from '../../store/booking-store';
import { thousandSeparator } from '../../utils/format';
import { fetchPostTransaction } from '../../utils/service';
const { Title, Paragraph, Text } = Typography;

function BookingInformation() {
  const { img_url, city, title, country, price, nights, bookingStartDate, bookingEndDate, productId } = useBookStore();
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

    try {
      const res = await fetchPostTransaction(body);
      if (res && res.code === 200) {
        setSnap(true);
        snapEmbed(res.data.snap_token, 'snap-container', {
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
            navigate(`/`);
            setSnap(false);
          },
        });
      }
    } catch (err) {
      console.log(err);
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
              <Image preview={false} src={img_url} style={imgStyle} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '420px' }}>
                <div>
                  <Paragraph style={{ marginBottom: 0 }}>{title}</Paragraph>
                  <Paragraph style={{ color: '#B0B0B0' }}>{`${city}, ${country}`}</Paragraph>
                </div>
                <Paragraph>
                  Rp{thousandSeparator(price)} <Text style={{ color: '#B0B0B0' }}>per</Text> {nights} nights
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
