import { notification } from 'antd';

export const notifySuccess = (title, message) => {
  notification.success({
    message: title || 'Success',
    description: message || 'Successfully!',
    duration: 2,
  });
};

export const notifyError = (title, message) => {
  notification.error({
    message: title || 'Error',
    description: message || 'Error!',
    duration: 2,
  });
};
