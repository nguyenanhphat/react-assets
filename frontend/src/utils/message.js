import { message } from 'antd';

const duration = 3;

export const messageSuccess = (config) => {
  message.success({ ...config, duration });
};

export const messageError = (config) => {
  message.error({ ...config, duration });
};

export const messageDestroy = () => {
  message.destroy();
};

export const messageLoading = (config) => {
  return message.loading({ ...config, duration });
};

export const messageAction = {
  removeProjectSuccess: () => {
    messageSuccess({
      content: 'You have removed project successfully',
    });
  },
  removeJobSuccess: (job) => {
    messageSuccess({
      content: 'You have removed job successfully',
    });
  },
  removeNoteSuccess: (note) => {
    messageSuccess({
      content: 'You have removed note successfully',
    });
  },
  removeDocSuccess: (doc) => {
    messageSuccess({
      content: 'You have removed document successfully',
    });
  },
  removeCommentSuccess: (comment) => {
    messageSuccess({
      content: 'You have removed comment successfully',
    });
  },
  updateProfileSuccess: (data) => {
    messageSuccess({
      content: 'You have updated your profile successfully',
    });
  },
  createCommentSuccess: ({ content, type }) => {
    messageSuccess({
      content: 'You have added comment successfully',
    });
  },
};
