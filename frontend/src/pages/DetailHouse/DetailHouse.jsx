import { Breadcrumb, Button, Card, DatePicker, Flex, Image, Layout, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DetailHouse1 from '../../assets/detailHouse1.png';
import DetailHouse2 from '../../assets/detailHouse2.png';
import useBookStore from '../../store/booking-store';
import useDetailStore from '../../store/detail-store';

import BathroomIcon from '../../components/Icons/ic_bathroom';
import BedroomIcon from '../../components/Icons/ic_bedroom';
import DiningroomIcon from '../../components/Icons/ic_diningroom';
import KulkasIcon from '../../components/Icons/ic_kulkas';
import LivingroomIcon from '../../components/Icons/ic_livingroom';
import TvIcon from '../../components/Icons/ic_tv';
import WifiIcon from '../../components/Icons/Ic_wifi';
import LoginModal from '../../components/LoginModal';
import useAuthStore from '../../store/auth-store';
import { thousandSeparator } from '../../utils/format';
import styles from './DetailHouse.module.css';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

function DetailHouse() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [stay, setStay] = useState(0);
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data, loadData, loading } = useDetailStore();
  const { updateBooking } = useBookStore();
  const { isAuth, handleLogin } = useAuthStore();

  useEffect(() => {
    loadData(productId);
  }, [productId, loadData]);

  const disabledButton = Boolean(date);

  const disabledDate = (current) => {
    return current < dayjs().startOf('day');
  };

  const handleDatePicker = (dates, dateStrings) => {
    if (dates && dates.length === 2) {
      const [start, end] = dateStrings;
      const bookingStartDate = dayjs(start).toDate();
      const bookingEndDate = dayjs(end).toDate();
      const nights = dayjs(end).diff(dayjs(start), 'day');

      setStay(nights);
      setDate({ bookingStartDate, bookingEndDate });
    } else {
      setStay(0);
      setDate(null);
    }
  };

  const handleSubmit = () => {
    if (!isAuth) {
      setIsOpen(true);
      return;
    }

    const totalPrice = price * stay;

    const bookingData = {
      nights: stay,
      bookingStartDate: date.bookingStartDate,
      bookingEndDate: date.bookingEndDate,
      price: totalPrice,
      img_url,
      city,
      country,
      title,
      productId,
    };

    updateBooking(bookingData);
    navigate('/checkout');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const { title, img_url, country, city, description, price, bedroom, bathroom, livingRoom, diningRoom, television, refigrator, wifi } = data[productId] || {};
  const totalPrice = price * stay || price;

  const breadcrumbItems = [{ title: 'Home' }, { title: 'Detail' }, { title: title }];

  const listHero = [
    // {
    //   icon: <AcIcon />,
    //   amount: ac,
    //   text: 'unit',
    // },
    {
      icon: <LivingroomIcon />,
      amount: livingRoom,
      text: 'living room',
    },
    {
      icon: <BathroomIcon />,
      amount: bathroom,
      text: 'bathroom',
    },
    {
      icon: <DiningroomIcon />,
      amount: diningRoom,
      text: 'dining room',
    },
    {
      icon: <KulkasIcon />,
      amount: refigrator,
      text: 'refigrator',
    },
    {
      icon: <TvIcon />,
      amount: television,
      text: 'television',
    },
    {
      icon: <WifiIcon />,
      amount: wifi,
      text: 'mbp/s',
    },
    {
      icon: <BedroomIcon />,
      amount: bedroom,
      text: 'bedroom',
    },
  ];

  const textStyle = {
    lineHeight: '170%',
    color: '#B0B0B0',
    fontWeight: 300,
  };

  return (
    <Content style={{ padding: '0 150px', marginTop: 50 }}>
      <Flex align='center' className={styles.headingContainer} gap={82}>
        <Breadcrumb items={breadcrumbItems} />
        <div>
          <Title level={2}>{title}</Title>
          <Paragraph>
            {city}, {country}
          </Paragraph>
        </div>
      </Flex>

      <div className={styles.containerGrid}>
        <Image preview={false} width='100%' height='500px' src={DetailHouse1} />
        <Image preview={false} width='100%' height='245px' src={DetailHouse2} />
        <Image preview={false} width='100%' height='245px' src={DetailHouse2} />
      </div>

      <Flex gap={52} justify='space-between'>
        <div style={{ width: 600 }}>
          <Space direction='vertical' size={10} style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 500, fontSize: '1.25rem' }}>About the place</div>
            <div dangerouslySetInnerHTML={{ __html: description }} style={textStyle}></div>
          </Space>
          <Flex wrap='wrap' gap={20} style={{ width: '400px' }}>
            {listHero.map((list, idx) => {
              return (
                Boolean(list.amount) && (
                  <div key={idx} style={{ width: 80 }}>
                    <div>{list.icon}</div>
                    <div style={{ fontWeight: '500', marginTop: '10px' }}>
                      {list.amount}&nbsp;
                      <Text style={textStyle}>{list.text}</Text>
                    </div>
                  </div>
                )
              );
            })}
          </Flex>
        </div>

        <Card
          style={{
            width: 487,
            alignSelf: 'flex-start',
            padding: '62px 84px',
            boxSizing: 'border-box',
          }}
        >
          <Paragraph style={{ fontWeight: 500, fontSize: '1.25rem', marginBottom: 14 }}>Start Booking</Paragraph>
          <Title level={2} style={{ marginBottom: 14 }}>
            <span style={{ color: '#1ABC9C', fontWeight: 500 }}>Rp{thousandSeparator(price)}</span>
            &nbsp;
            <span style={{ color: '#B0B0B0', fontWeight: 300 }}>per night</span>
          </Title>
          <Space direction='vertical' size={8} style={{ marginBottom: 14 }}>
            <Paragraph style={{ marginBottom: 0 }}>Pick a Date</Paragraph>
            <DatePicker.RangePicker style={{ padding: '4px 12px' }} onChange={handleDatePicker} disabledDate={disabledDate} />
          </Space>
          {disabledButton && (
            <Paragraph style={{ marginBottom: 40 }}>
              You will pay Rp{thousandSeparator(totalPrice)} for {stay} nights
            </Paragraph>
          )}
          <Button type='primary' block size='large' disabled={!disabledButton} onClick={handleSubmit}>
            Continue to Book
          </Button>
        </Card>
      </Flex>
      <LoginModal open={isOpen} onClose={() => setIsOpen(false)} onLogin={handleLogin} />
    </Content>
  );
}

export default DetailHouse;
