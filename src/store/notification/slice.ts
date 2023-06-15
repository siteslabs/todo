import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INotificationState } from './types';

export const initialState: INotificationState = {
  content: null,
  type: 'info',
};

export const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<INotificationState>) => {
      state.content = action.payload.content;
      state.type = action.payload.type;
    },
  },
});

export const { setNotification } = slice.actions;

export default slice.reducer;
