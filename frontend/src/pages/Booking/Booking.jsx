import { Button, Layout, message, Steps } from 'antd';
import React, { useState } from 'react';
import BookingInformation from './BookingInformation';
import BookingPayment from './BookingPayment';
import { useBookStore } from '../../store/BookingStore';
import BookingCompleted from './BookingCompleted';

const { Content } = Layout;

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
  const data = useBookStore((state) => state.bookingData);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title }));

  //   const contentStyle = {
  //     lineHeight: '260px',
  //     color: token.colorTextTertiary,
  //     backgroundColor: token.colorFillAlter,
  //     borderRadius: token.borderRadiusLG,
  //   };

  return (
    <Content>
      <Steps current={current} items={items} style={{ width: '280px', margin: '50px auto' }} />
      {steps[current].content}
      <div style={{ display: 'flex', flexDirection: 'column', width: '320px', gap: '10px', margin: '24px auto' }}>
        {current < steps.length - 1 && (
          <Button type='primary' size='large' onClick={() => next()}>
            Continue to Book
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type='primary' size='large' onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current >= 0 && (
          <Button onClick={() => prev()} size='large' disabled={current === 0}>
            Cancel
          </Button>
        )}
      </div>
    </Content>
  );
};

export default Booking;
