import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { loginSchema } from 'components/AuthForms/validations';
import { isAuthLoadingSelector } from 'store/user/selectors';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchSignIn } from 'store/user/action';

import { TLoginForm } from './types';
import '../AuthForms.scss';

const Login = () => {
  const isAuthLoading = useAppSelector(isAuthLoadingSelector);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (values: TLoginForm) => {
    const { email, password } = values;
    dispatch(fetchSignIn({ email, password }));
  };

  const handleRegisterClick = () => navigate('/registration');

  return (
    <div className="form">
      <Form name="login" onFinish={handleSubmit(onSubmit)}>
        <h2 className="form__title">Login</h2>
        <Form.Item
          name="email"
          validateStatus={errors.email ? 'error' : ''}
          help={<>{errors.email?.message}</>}
        >
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                suffix={<MailOutlined className="site-form-item-icon" />}
                placeholder="email"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          name="password"
          validateStatus={errors.password ? 'error' : ''}
          help={<>{errors.password?.message}</>}
        >
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                suffix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            disabled={isAuthLoading}
            type="primary"
            htmlType="submit"
            className="form__button"
          >
            Log in
          </Button>
        </Form.Item>
        <Typography.Text className="form__register">
          Don&rsquo;t have an account?{' '}
          <b onClick={handleRegisterClick} className="form__register_text">
            Register
          </b>
        </Typography.Text>
      </Form>
    </div>
  );
};

export default Login;
