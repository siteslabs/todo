export type TLoginForm = {
  email: string;
  password: string;
};

export type TRegistration = TLoginForm & {
  username: string;
};

export type TAuthTabKeys = 'registration' | 'login';
export type TAuthFormProps = {
  tabKey: TAuthTabKeys;
  onTabChange: (value: TAuthTabKeys) => void;
};

export enum EAuthForm {
  RAGISTRATION = 'registration',
  LOGIN = 'login',
}
