// import { Button, Layout, message, Steps } from 'antd';
import React, { useState } from 'react';
import BookingInformation from './BookingInformation';
import BookingPayment from './BookingPayment';
// import { useBookStore } from '../../store/BookingStore';
import BookingCompleted from './BookingCompleted';

// const { Content } = Layout;

const steps = [
  {
    title: 'First',
    content: <BookingInformation />,
  },
  {
    title: 'Second',
    content: <BookingPayment />,
  },
  {
    title: 'Last',
    content: <BookingCompleted />,
  },
];

const Booking = () => {
  //   const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  // const data = useBookStore((state) => state.bookingData);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  // const items = steps.map((item) => ({ key: item.title }));

  //   const contentStyle = {
  //     lineHeight: '260px',
  //     color: token.colorTextTertiary,
  //     backgroundColor: token.colorFillAlter,
  //     borderRadius: token.borderRadiusLG,
  //   };

  return (
    <>
      <BookingInformation />
      sdasd
    </>
  );
};

export default Booking;
