export interface NotificationInterface {
  notificationID: string;
  userID: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
