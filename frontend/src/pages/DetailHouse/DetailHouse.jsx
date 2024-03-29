import { Breadcrumb, Button, Card, DatePicker, Flex, Image, Layout, Space, Typography } from 'antd';
import DetailHouse1 from '../../assets/detailHouse1.png';
import DetailHouse2 from '../../assets/detailHouse2.png';
import Counter from '../../components/Counter/Counter';
import styles from './DetailHouse.module.css';
import { useBookStore } from '../../store/BookingStore';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function DetailHouse() {
  const { stay } = useBookStore((state) => state.bookingData);
  const increment = useBookStore((state) => state.incrementStay);
  const decrement = useBookStore((state) => state.decrementStay);

  const breadcrumbItem = [{ title: 'sample' }, { title: 'sample' }, { title: 'sample' }];

  const titleParagraph = { fontWeight: 500, fontSize: '1.25rem', marginBottom: 14 };
  const paragraphStyle = { marginBottom: 0 };

  // const listIcon = [
  //   {
  //     icon: <TravelerIcon />,
  //     amount: '80,409',
  //     text: 'travelers',
  //   },
  //   {
  //     icon: <TreasureIcon />,
  //     amount: '862',
  //     text: 'treasure',
  //   },
  //   {
  //     icon: <CitiesIcon />,
  //     amount: '1,492',
  //     text: 'cities',
  //   },
  // ];

  function handleDatePicker(date, dateArray) {
    console.log(dateArray);
  }

  return (
    <Content style={{ padding: '0 150px', marginTop: 50 }}>
      <Flex align={'center'} className={styles.headingContainer} gap={82}>
        <Breadcrumb items={breadcrumbItem} />
        <div>
          <Title level={2}>Village Angga</Title>
          <Paragraph>Bogor, Indonesia</Paragraph>
        </div>
      </Flex>

      <div className={styles.containerGrid}>
        <Image preview={false} width='100%' height='500px' src={DetailHouse1} />
        <Image preview={false} width='100%' height='245px' src={DetailHouse2} />
        <Image preview={false} width='100%' height='245px' src={DetailHouse2} />
      </div>

      <Flex gap={52} style={{ justifyContent: 'space-between' }}>
        <div style={{ width: 600 }}>
          <Space direction='vertical' size={10}>
            <Paragraph style={titleParagraph}>About the place</Paragraph>
            <Paragraph className={styles.paragraph}>
              Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally
              developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.
            </Paragraph>
            <Paragraph className={styles.paragraph}>
              Such trends saw the demise of the soul-infused techno that typified the original Detroit sound. Robert Hood has noted that he and Daniel Bell both realized something was missing from techno in the post-rave era.
            </Paragraph>
            <Paragraph className={styles.paragraph}>
              Design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The
              national agency for design: enabling Singapore to use design for economic growth and to make lives better.
            </Paragraph>
          </Space>
        </div>
        <Card style={{ width: 487, alignSelf: 'flex-start', padding: '62px 84px', boxSizing: 'border-box' }}>
          <Paragraph style={titleParagraph}>Start Booking</Paragraph>
          <Title level={2} style={{ marginBottom: 14 }}>
            <span style={{ color: '#1ABC9C', fontWeight: 500 }}>$280</span>&nbsp;
            <span style={{ color: '#B0B0B0', fontWeight: 300 }}>per night</span>
          </Title>
          <Space direction='vertical' size={8} style={{ marginBottom: 24 }}>
            <Paragraph style={paragraphStyle}>How long you will stay?</Paragraph>
            <Counter minValue={stay > 0} maxValue={stay < 10} value={stay} increment={increment} decrement={decrement} />
          </Space>
          <Space direction='vertical' size={8} style={{ marginBottom: 14 }}>
            <Paragraph style={paragraphStyle}>Pick a Date</Paragraph>
            <DatePicker.RangePicker style={{ padding: '4px 12px' }} onChange={handleDatePicker} />
          </Space>
          <Paragraph style={{ marginBottom: 40 }}>You will pay $480 USD per 2 nights</Paragraph>
          <Link to={'/booking'}>
            <Button type='primary' block size='large'>
              Continue to Book
            </Button>
          </Link>
        </Card>
      </Flex>
    </Content>
  );
}

export default DetailHouse;
