/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { toast } from 'react-toastify';

const commonStyles = { borderRadius: '10px', fontSize: '14px', padding: '20px', marginTop: '70px' };
export enum ToastType {
  Success,
  Error,
  Info,
}

const TWENTY_SEC_IN_MS = 20_000;

export const showToastNotification = (type: ToastType, message: string, styles?: any): void => {
  let notification = null;
  switch (type) {
    case ToastType.Success:
      notification = toast.success;
      break;
    case ToastType.Error:
      notification = toast.error;
      break;
    case ToastType.Info:
      notification = toast.info;
      break;
    default:
      break;
  }
  if (!notification) {
    console.error('Invalid toast notification type!');
    return;
  }

  notification(message, {
    position: toast.POSITION.TOP_RIGHT,
    className: 'toast-notification',
    style: styles || commonStyles,
    autoClose: TWENTY_SEC_IN_MS,
  });
};
