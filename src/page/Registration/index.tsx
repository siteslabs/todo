import React from 'react';
import Auth from 'containers/Auth';
import { RegistrationForm } from 'components/AuthForms';

const Registration = () => {
  return (
    <Auth>
      <RegistrationForm />
    </Auth>
  );
};

export default Registration;
