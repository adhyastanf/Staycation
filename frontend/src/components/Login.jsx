import { UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const { Text } = Typography;

function Login() {
  const [fields, setFields] = useState({
    username: '',
    password: '',
  });

  const loginFields = [
    {
      label: 'Username',
      placeholder: 'Enter your username',
      type: 'username',
      rules: [
        {
          required: true,
          message: 'Please input your username!',
        },
      ],
    },
    {
      label: 'Password',
      placeholder: 'Enter your password',
      type: 'password',
      rules: [
        {
          required: true,
          message: 'Please input your password!',
        },
      ],
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:5000/login', fields);
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFields({ ...fields, [name]: value });
  }

  return (
    <Form onSubmit={handleSubmit} style={{ maxWidth: 300 }} name='basic' autoComplete='off'>
      {loginFields.map((val, idx) => {
        return (
          <div key={idx}>
            <Text>{val.label}</Text>
            <Form.Item rules={val.rules} name={val.type}>
              {val.type === 'username' ? (
                <Input onChange={handleChange} name={val.type} placeholder={val.placeholder} prefix={<UserOutlined className='site-form-item-icon' />} />
              ) : (
                <Input.Password placeholder={val.placeholder} name={val.type} onChange={handleChange} />
              )}
            </Form.Item>
          </div>
        );
      })}

      <Form.Item name='remember' valuePropName='checked'>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button htmlType='submit'>Submit</Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
