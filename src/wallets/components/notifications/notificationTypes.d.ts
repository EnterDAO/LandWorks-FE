export type NotificationKeyTypes = 'newRenting' | 'message' | 'rentEnded' | 'yourRentEnded' | 'endSoon';
type NotificationType = {
  icon: React.ReactNode;
  title: string;
  subtitle: (id: string, name: string) => React.ReactNode;
  button: React.ReactNode;
};

export type NotificationDataType = {
  [K in NotificationKeyTypes]: NotificationType;
};

export interface NotificationList {
  id: number;
  name: string;
  time: number;
  type: NotificationKeyTypes;
  landId: string;
}
