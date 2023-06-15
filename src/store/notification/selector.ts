import { RootState } from 'store';

const notificationStateSelector = (state: RootState) =>
  state.notificationReducer;

export { notificationStateSelector };
