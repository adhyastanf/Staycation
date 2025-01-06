import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Modal } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../utils/schema';
import InputField from './Input/Input';

export default function LoginModal({ open, onClose, onLogin }) {
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await onLogin(data); 
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Modal
      title="Login"
      open={open}
      onOk={handleSubmit(onSubmit)}
      onCancel={onClose}
      okText="Login"
      confirmLoading={isSubmitting}
      closable={false}
    >
      <Form layout="vertical">
        <InputField label={'username'} control={control} errors={errors} name='username' placeholder="Enter your username"  />
        <InputField label={'password'} type='password' control={control} errors={errors} name='password' placeholder="Enter your password"  />
      </Form>
    </Modal>
  );
}
