import * as yup from 'yup';

// Yup validation schema
export const updateSchema = yup.object().shape({
  value: yup.string().required('Required'),
});

export const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });