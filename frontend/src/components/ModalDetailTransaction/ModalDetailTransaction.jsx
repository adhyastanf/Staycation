import { Alert, Divider, Flex, Layout, Modal, Typography } from 'antd';
import { formatDate, thousandSeparator } from '../../utils/format';

const { Content } = Layout;
const { Paragraph, Text } = Typography;

export default function ModalDetailTransaction({ onCancel, open, data = {}, loading }) {
    const alertCanceled = <Alert message='Dibatalkan otomatis oleh sistem karena pesanan tidak sesuai Syarat & Ketentuan.' type='error' showIcon />;
  
    const titleStatus = data?.status === 'CANCELED' ? 'Dibatalkan Sistem' : data?.status === 'PENDING' ? 'Sedang Menunggu Pembayaran' : ' Pesanan Selesai';
  
    return (
      <Modal title='Detail Transaksi' centered open={open} footer={null} onCancel={onCancel}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Content>
            <Paragraph>
              <Text strong>{titleStatus}</Text>
            </Paragraph>
  
            {data?.status === 'CANCELED' && alertCanceled}
            <Content>No.Pesanan : {data?.id}</Content>
            <Content>Tanggal Pesanan : {formatDate(data?.createdAt, 'ddd, MMM D, YYYY h:mm A')}</Content>
            <Divider />
            <Paragraph>
              <Text strong>Detail Produk</Text>
            </Paragraph>
            <Flex gap={20}>
              <img src={data?.Hotel.img_url} alt={`Image-${data?.Hotel.title}`} width='150' style={{ alignSelf: 'start' }} />
              <Content>
                <Paragraph>
                  <Content>
                    <Text strong>{data?.Hotel.title}</Text>
                  </Content>
                  <Content>
                    <Text strong>
                      {data?.Hotel.city}, {data?.Hotel.country}
                    </Text>
                  </Content>
                </Paragraph>
                <Content>
                  Booking Date : {formatDate(data?.CheckInDate, 'DD MMM YYYY')} - {formatDate(data?.CheckOutDate, 'DD MMM YYYY')}
                </Content>
                <Content>{data?.night} Night</Content>
              </Content>
            </Flex>
            <Divider />
            <Paragraph>
              <Text strong>Rincian Pembayaran</Text>
            </Paragraph>
            {data?.status !== 'PENDING' && <Flex justify='space-between'>
              <Text>Metode pembayaran</Text>
              <Text>{data?.payment_method}</Text>
            </Flex>}
            <Flex justify='space-between'>
              <Text strong>Total pembayaran</Text>
              <Text strong>Rp{thousandSeparator(data?.price)}</Text>
            </Flex>
          </Content>
        )}
      </Modal>
    );
  }