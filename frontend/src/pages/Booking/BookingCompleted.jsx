import { Image, Typography } from 'antd';
import CompletedImg from '../../assets/completed.svg';
const { Title, Paragraph, Text } = Typography;

function BookingCompleted() {
  const contentStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '432px',
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <Title style={{ textAlign: 'center' }}>Yay! Completed</Title>
      <div style={contentStyle}>
        <Image preview={false} src={CompletedImg} />
      </div>
      <Paragraph style={{ width: '396px', color: '#B0B0B0', textAlign: 'center', margin: 'auto' }}>We will inform you via email later once the transaction has been accepted</Paragraph>
    </div>
  );
}

export default BookingCompleted;
