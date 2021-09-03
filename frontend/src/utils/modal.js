import React from 'react';
import { Modal } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

const { confirm, error } = Modal;

export const showModalConfirm = ({
  title,
  content,
  okText,
  cancelText,
  onOk,
  onCancel,
}) => {
  confirm({
    className: 'modal-confirm-custom',
    title: title || '',
    content: content || '',
    okText: okText || 'OK',
    cancelText: cancelText || 'Cancel',
    onOk() {
      onOk && onOk();
    },
    onCancel() {
      onCancel && onCancel();
    },
  });
};

export const showModalError = ({
  title,
  content,
  icon,
  okText,
  okType,
  onOk,
  onCancel,
  centered = true,
}) => {
  error({
    title: title || '',
    icon: icon || <CloseCircleFilled style={{ color: '#FF5A5B' }} />,
    content: content || '',
    okText: okText || 'OK',
    okType: okType || 'primary',
    okButtonProps: {
      style: {
        width: '82px',
        height: '32px',
        borderRadius: '4px',
        borderColor: '#FFA39E',
        backgroundColor: '#FFF1F0',
        color: '#FF4D4F',
      },
    },
    centered,
    onOk(close) {
      onOk && onOk();
      close();
    },
    onCancel() {
      onCancel && onCancel();
    },
  });
};
