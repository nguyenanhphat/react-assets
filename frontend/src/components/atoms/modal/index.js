import React from 'react';
import { Modal } from 'antd';
import { MyButton } from 'components/atoms';
import PropTypes from 'prop-types';
import './styles.scss';

const MyModal = ({
  visible,
  title,
  children,
  width,
  onSave,
  onSaveAndClose,
  onClose,
  textSave,
  textSaveAndClose,
  textClose,
}) => {
  const showFooter = () => {
    if (onSave || onSaveAndClose || onClose) {
      return (
        <div className="footer">
          {onSave && (
            <MyButton onClick={onSave} className="mr-10" type="btn-primary">
              {textSave}
            </MyButton>
          )}
          {onSaveAndClose && (
            <MyButton
              onClick={onSaveAndClose}
              className="mr-10"
              type="btn-primary"
            >
              {textSaveAndClose}
            </MyButton>
          )}
          {onClose && <MyButton onClick={onClose}>{textClose}</MyButton>}
        </div>
      );
    }
    return null;
  };

  return (
    <Modal
      width={width}
      className="my-modal-custom"
      footer={null}
      title={title}
      visible={visible}
      closable={false}
    >
      <div className="content">{children}</div>
      {showFooter()}
    </Modal>
  );
};

MyModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  width: PropTypes.string,
  onSave: PropTypes.func,
  onSaveAndClose: PropTypes.func,
  onClose: PropTypes.func,
  textSave: PropTypes.string,
  textSaveAndClose: PropTypes.string,
  textClose: PropTypes.string,
};

MyModal.defaultProps = {
  visible: false,
  title: 'Title Modal',
  width: '36vw',
  textSave: 'Save',
  textSaveAndClose: 'Save & Close',
  textClose: 'Cancel',
};

export default MyModal;
