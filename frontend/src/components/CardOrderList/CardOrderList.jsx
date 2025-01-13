import { Button, Card, Flex, Layout, Space, Tag, Typography } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalDetailTransaction from '../../components/ModalDetailTransaction/ModalDetailTransaction';
import useDetailTransactionStore from '../../store/detail-transaction-store';
import { formatDate, thousandSeparator } from '../../utils/format';
import EmptyData from '../EmptyComponent/EmptyData';
import LoadingCardOrderList from '../Loading/LoadingCardOrderList/LoadingCardOrderList';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function CardOrderList({ data, loading }) {
  if (loading) return <LoadingCardOrderList />;
  if (!data || !data.length)
    return (
      <Flex justify="center" style={{flexDirection: 'column', height: '600px'}}>
        <EmptyData />
      </Flex>
    );

  return (
    <Space direction='vertical' size='middle' style={{ width: '100%', height: '600px', overflowY: 'auto' }}>
      {data.map((val, idx) => {
        const { id: itemId, title, img_url, city, country } = val.Hotel;

        return (
          <Content key={idx}>
            <CardItem
              itemId={itemId}
              id={val.id}
              title={title}
              bookingStartDate={val.checkInDate}
              bookingEndDate={val.checkOutDate}
              status={val.status}
              paymentMethod={val.payment_method}
              price={val.price}
              night={val.night}
              imgUrl={img_url}
              country={country}
              city={city}
              created={val.createdAt}
              snapRedirect={val.snap_redirect_url}
            />
          </Content>
        );
      })}
    </Space>
  );
}

function CardItem({ itemId, snapRedirect, id, bookingStartDate, bookingEndDate, status, paymentMethod, price, night, title, imgUrl, country, city, created }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loadData, data, loading } = useDetailTransactionStore();

  const showModal = async () => {
    setIsModalOpen(true);
    loadData(id);
  };

  const styleNormalFont = {
    fontWeight: 'normal',
  };

  const extra = () => {
    let statusColor;
    if (status === 'PENDING') {
      statusColor = 'processing';
    } else if (status === 'CANCELED') {
      statusColor = 'error';
    } else {
      statusColor = 'success';
    }
    return <Tag color={statusColor}>{status}</Tag>;
  };

  const header = (
    <Flex align='center' gap={20}>
      <Title level={5}>{title}</Title>
      <Text style={styleNormalFont}>{formatDate(created, 'DD MMM YYYY')}</Text>
      <Text style={styleNormalFont}>{id}</Text>
    </Flex>
  );

  return (
    <Card title={header} extra={extra()}>
      <Flex gap={20}>
        <img src={imgUrl} width={200} style={{ alignSelf: 'self-start' }} />
        <Flex justify='space-between' align='center' flex={1}>
          <Content>
            <Paragraph>
              <Title level={5}>{title}</Title>
              <Title level={5}>
                {city}, {country}
              </Title>
            </Paragraph>
            <Text>
              {formatDate(bookingStartDate, 'DD MMM YYYY')} - {formatDate(bookingEndDate, 'DD MMM YYYY')}
            </Text>
            <Content>{night} Nights</Content>
          </Content>
          <Paragraph>
            <Content>Total Harga</Content>
            <b>Rp{thousandSeparator(price)}</b>
          </Paragraph>
        </Flex>
      </Flex>
      <Flex gap={10} style={{ marginTop: 20 }}>
        {status === 'PENDING' && (
          <Link to={snapRedirect}>
            <Button type='primary'>Bayar</Button>
          </Link>
        )}
        <Button type='default' onClick={showModal}>
          Lihat Detail Transaksi
        </Button>
      </Flex>

      <ModalDetailTransaction onCancel={() => setIsModalOpen(false)} open={isModalOpen} data={data} loading={loading} />
    </Card>
  );
}
