export type NotificationKeyTypes = 'newRenting' | 'message' | 'rentEnded' | 'yourRentEnded' | 'endSoon';

type NotificationButtonProps = {
  history: History<unknown>;
  id: string;
  isAvailable: boolean;
  hasUnclaimentRent: boolean;
};

type NotificationType = {
  icon: React.ReactNode;
  title: string;
  subtitle: (id: string, name: string) => React.ReactNode;
  button: (NotificationButtonProps) => React.ReactNode;
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
  isAvailable: boolean;
}
