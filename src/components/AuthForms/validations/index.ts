import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email is required').label('Email'),
  password: yup.string().required('Password is required'),
});

export const registerSchema = loginSchema.shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must contain at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
});
