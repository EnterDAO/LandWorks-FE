export type NotificationKeyTypes = 'newRenting' | 'message' | 'rentEnded' | 'yourRentEnded' | 'endSoon';
type NotificationType = {
  icon: React.ReactNode;
  title: string;
  subtitle: (id: string, name: string, endTime?: string) => React.ReactNode;
  button: (history: History<unknown>, id: string) => React.ReactNode;
};

export type NotificationDataType = {
  [K in NotificationKeyTypes]: NotificationType;
};

export interface NotificationList {
  id: number;
  name: string;
  time: number;
  countdown?: string;
  type: NotificationKeyTypes;
  landId: string;
}
