import { RootState } from 'store';

const isAuthLoadingSelector = (state: RootState) => state.userReducer.isLoading;

export { isAuthLoadingSelector };
