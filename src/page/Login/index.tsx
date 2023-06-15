import React from 'react';
import Auth from 'containers/Auth';
import { LoginForm } from 'components/AuthForms';

const Login = () => {
  return (
    <Auth>
      <LoginForm />
    </Auth>
  );
};

export default Login;
