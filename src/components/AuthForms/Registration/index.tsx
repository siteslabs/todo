import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { registerSchema } from 'components/AuthForms/validations';
import { useAppDispatch, useAppSelector } from 'store';
import { isAuthLoadingSelector } from 'store/user/selectors';
import { fetchSignUp } from 'store/user/action';

import { TRegistration } from './types';
import '../AuthForms.scss';

const Registration = () => {
  const isAuthLoading = useAppSelector(isAuthLoadingSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegistration>({
    resolver: yupResolver(registerSchema),
  });

  const onFinish = (values: TRegistration) => {
    const { email, password } = values;
    dispatch(fetchSignUp({ email, password }));
  };

  const handleLoginClick = () => navigate('/login');

  return (
    <div className="form">
      <Form name="registration" onFinish={handleSubmit(onFinish)}>
        <h2 className="form__title">Registration</h2>
        <Form.Item
          name="username"
          validateStatus={errors.username ? 'error' : ''}
          help={<>{errors.username?.message}</>}
        >
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <Input
                {...field}
                suffix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            )}
          />
        </Form.Item>
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
            Sign up
          </Button>
        </Form.Item>
        <p className="form__register">
          Already have an account?{' '}
          <b onClick={handleLoginClick} className="form__register_text">
            Login
          </b>
        </p>
      </Form>
    </div>
  );
};

export default Registration;
