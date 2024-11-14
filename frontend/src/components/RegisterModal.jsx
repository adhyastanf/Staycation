import React from 'react';
import { Modal, Input, Form } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Yup validation schema for registration
const registerSchema = yup.object().shape({
  fullname: yup.string().required('Fullname is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function RegisterModal({ isVisible, onClose, onRegister }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try{
      await onRegister(data);
      if (!isSubmitting) {
        onClose();
      }
    }catch(err){
      console.log(err)
    }
  };

  return (
    <Modal
      title='Register'
      open={isVisible} // 'open' instead of 'visible'
      onOk={handleSubmit(onSubmit)}
      onCancel={onClose}
      confirmLoading={isSubmitting}
      okText='Register'
      cancelText='Cancel'
    >
      <Form layout='vertical'>
        {/* Username Field */}
        <Form.Item label='Fullname' validateStatus={errors.fullname ? 'error' : ''} help={errors.fullname?.message}>
          <Controller name='fullname' control={control} defaultValue='' render={({ field }) => <Input {...field} placeholder='Enter your fullname' />} />
        </Form.Item>
        
        {/* Username Field */}
        <Form.Item label='Username' validateStatus={errors.username ? 'error' : ''} help={errors.username?.message}>
          <Controller name='username' control={control} defaultValue='' render={({ field }) => <Input {...field} placeholder='Enter your username' />} />
        </Form.Item>

        {/* Email Field */}
        <Form.Item label='Email' validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
          <Controller name='email' control={control} defaultValue='' render={({ field }) => <Input {...field} placeholder='Enter your email' />} />
        </Form.Item>

        {/* Password Field */}
        <Form.Item label='Password' validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
          <Controller name='password' control={control} defaultValue='' render={({ field }) => <Input.Password {...field} placeholder='Enter your password' />} />
        </Form.Item>

        {/* Confirm Password Field */}
        <Form.Item label='Confirm Password' validateStatus={errors.confirmPassword ? 'error' : ''} help={errors.confirmPassword?.message}>
          <Controller name='confirmPassword' control={control} defaultValue='' render={({ field }) => <Input.Password {...field} placeholder='Confirm your password' />} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
