import { combineReducers } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

import todoReducer from './todo/slice';
import userReducer from './user/slice';
import notificationReducer from './notification/slice';

const rootReducer = combineReducers({
  todoReducer,
  userReducer,
  notificationReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todoReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
