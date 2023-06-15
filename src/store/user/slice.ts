import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchSignUp, fetchSignIn } from 'store/user/action';

export interface IUserState {
  error: string | null;
  isLoading: boolean;
}

const initialState: IUserState = {
  isLoading: false,
  error: null,
};

const authReject = (state: IUserState, action: PayloadAction<string>) => {
  state.isLoading = false;
  state.error = action.payload;
};
const authPending = (state: IUserState) => {
  state.isLoading = true;
};

const authFulfilled = (state: IUserState) => {
  state.isLoading = false;
  state.error = '';
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    // Signup
    [fetchSignUp.pending.type]: authPending,
    [fetchSignUp.fulfilled.type]: authFulfilled,
    [fetchSignUp.rejected.type]: authReject,
    // Signin
    [fetchSignIn.pending.type]: authPending,
    [fetchSignIn.fulfilled.type]: authFulfilled,
    [fetchSignIn.rejected.type]: authReject,
  },
});

export default slice.reducer;
