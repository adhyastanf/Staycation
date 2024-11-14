import React from 'react';
import { Modal, Input, Form, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Yup validation schema
const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginModal({ isVisible, onClose, onLogin }) {
  const { 
    control,  // Access to the controller
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log('Form data:', data); // Check the form data being submitted
    console.log('Errors:', errors); // Check if there are errors at this point
    try {
      await onLogin(data); // Call login function
      onClose(); // Close modal after login
      window.location.reload();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Modal
      title="Login"
      open={isVisible}  // 'open' instead of 'visible'
      onOk={handleSubmit(onSubmit)}
      onCancel={onClose}  // Handle modal close action
      okText="Login"
      confirmLoading={isSubmitting}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        
        {/* Username Field */}
        <Form.Item
          label="Username"
          validateStatus={errors.username ? 'error' : ''}
          help={errors.username?.message}
        >
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input {...field} placeholder="Enter your username" />
            )}
          />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          label="Password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input.Password {...field} placeholder="Enter your password" />
            )}
          />
        </Form.Item>
        
        {/* Use htmlType="submit" for form submission */}
        {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item> */}
      </Form>
    </Modal>
  );
}
