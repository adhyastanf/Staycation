import { Form, Input } from 'antd';

function FormBooking() {
  const formItem = [
    {
      label: 'First Name',
      placeholder: 'Fill First Name',
    },
    {
      label: 'Last Name',
      placeholder: 'Fill Last Name',
    },
    {
      label: 'Email Address',
      placeholder: 'Fill Email Address',
    },
    {
      label: 'Phone Number',
      placeholder: 'Fill Phone Number',
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

export default FormBooking;
