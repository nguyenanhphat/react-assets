import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './styles.scss';

const { TextArea } = Input;
const MyTextarea = ({ className, placeholder, onChange, value }) => {
  return (
    <TextArea
      value={value}
      placeholder={placeholder}
      allowClear={false}
      onChange={e => onChange(e.target.value)}
      className={cn('textarea-custom', className)}
    />
  );
};

MyTextarea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

MyTextarea.defaultProps = {
  placeholder: 'Enter',
  onChange: () => null,
  value: '',
};

export default MyTextarea;
