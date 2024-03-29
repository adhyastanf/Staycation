import { Form, Input } from 'antd';

function FormBookingPayment() {
  const formItem = [
    {
      label: 'Upload Bukti Transfer',
      placeholder: 'Browse a file',
    },
    {
      label: 'Asal Bank',
      placeholder: 'Please type here',
    },
    {
      label: 'Nama Pengirim',
      placeholder: 'Please type here',
    },
  ];

  return (
    <Form layout='vertical' style={{ width: '320px' }}>
      {formItem.map((item, index) => {
        return (
          <Form.Item key={index} hasFeedback label={item.label} validateDebounce={1000} rules={[{ max: 3 }]}>
            <Input size='large' placeholder={item.placeholder} />
          </Form.Item>
        );
      })}
    </Form>
  );
}

export default FormBookingPayment;
