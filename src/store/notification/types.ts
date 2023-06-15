import { NoticeType } from 'antd/es/message/interface';

export interface INotificationState {
  content: React.ReactNode;
  type?: NoticeType;
}
