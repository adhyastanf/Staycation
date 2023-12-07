import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Input, Tooltip, Typography, Button, Form } from 'antd';
import { useState } from 'react';
import axios from 'axios';

const { Text } = Typography;

function Register() {
  const [fields, setFields] = useState({
    username: '',
    password: '',
  });

  const registerFields = [
    {
      label: 'Username',
      placeholder: 'Enter your username',
      type: 'default',
    },
    {
      label: 'Password',
      placeholder: 'Enter your password',
      type: 'password',
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
    <Form onSubmit={handleSubmit}>
      {registerFields.map((val, idx) => {
        return (
          <div key={idx}>
            <Text>{val.label}</Text>
            {val.type === 'default' ? (
              <Input
                onChange={handleChange}
                name='username'
                placeholder={val.placeholder}
                prefix={<UserOutlined className='site-form-item-icon' />}
                suffix={
                  <Tooltip title='Extra information'>
                    <InfoCircleOutlined
                      style={{
                        color: 'rgba(0,0,0,.45)',
                      }}
                    />
                  </Tooltip>
                }
              />
            ) : (
              <Input.Password placeholder={val.placeholder} name='password' onChange={handleChange} />
            )}
          </div>
        );
      })}
      <Button htmlType='submit'>Submit</Button>
    </Form>
  );
}

export default Register;
