import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from 'utils/firebase';
import { TLoginForm } from 'components/AuthForms/types';
import { setNotification } from 'store/notification/slice';

export const fetchSignUp = createAsyncThunk(
  'user/singup',
  async (data: TLoginForm, thunkAPI) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      return user;
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorMessage = e.code.split('/')[1].split('-').join(' ');
        thunkAPI.dispatch(
          setNotification({ content: errorMessage, type: 'error' })
        );
      }
      thunkAPI.dispatch(
        setNotification({
          content: 'Email is already in use',
          type: 'error',
        })
      );
    }
  }
);

export const fetchSignIn = createAsyncThunk(
  'user/signin',
  async (data: TLoginForm, thunkAPI) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      return user;
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorMessage = e.code.split('/')[1].split('-').join(' ');
        return thunkAPI.dispatch(
          setNotification({ content: errorMessage, type: 'error' })
        );
      }

      return thunkAPI.dispatch(
        setNotification({
          content: 'Something wend wrong. Try later please',
          type: 'error',
        })
      );
    }
  }
);
