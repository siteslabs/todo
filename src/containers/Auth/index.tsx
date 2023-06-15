import React, { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from 'utils/firebase';
import { useAppDispatch, useAppSelector } from 'store';
import { notificationStateSelector } from 'store/notification/selector';
import { initialState as notificationInitialState } from 'store/notification/slice';
import { setNotification } from 'store/notification/slice';

import './Auth.scss';

const Auth: React.FC<PropsWithChildren> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const notificationState = useAppSelector(notificationStateSelector);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate('/');
    }
  });

  useEffect(() => {
    if (notificationState.content) {
      messageApi.open(notificationState);
      dispatch(setNotification(notificationInitialState));
    }
  }, [notificationState, messageApi, dispatch]);

  return (
    <div className="auth">
      {contextHolder}
      {children}
    </div>
  );
};

export default Auth;
