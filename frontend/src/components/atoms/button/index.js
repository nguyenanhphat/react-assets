import React from 'react';
import { Button } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';
import './styles.scss';

const MyButton = ({
  disabled,
  type,
  htmlType,
  icon,
  children,
  className,
  onClick,
}) => {
  return (
    <Button
      disabled={disabled}
      htmlType={htmlType}
      onClick={onClick}
      className={cn('btn-custom', type, className)}
    >
      {icon && <span className="icon">{icon}</span>}
      {children}
    </Button>
  );
};

MyButton.propTypes = {
  type: PropTypes.oneOf(['btn-default', 'btn-primary', 'btn-outline']),
  htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
  icon: PropTypes.element,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

MyButton.defaultProps = {
  type: 'btn-default',
  htmlType: 'button',
  onClick: () => null,
  disabled: false,
};

export default MyButton;
