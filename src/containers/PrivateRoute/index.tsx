import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Button } from 'antd';

import { auth } from 'utils/firebase';
import './PrivateRoute.scss';

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate('/login');
    }
  });
  const handleLogout = () => signOut(auth);

  return (
    <div>
      <div className="button-container">
        <Button onClick={handleLogout} type="primary">
          Logout
        </Button>
      </div>
      {children}
    </div>
  );
};

export default PrivateRoute;
