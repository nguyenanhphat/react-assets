import { Input } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

const MyInput = ({
  prefix,
  value,
  disabled,
  isApplyStyleDisabled,
  isNoBorder,
  placeholder,
  onChange,
  type,
  max,
  min,
}) => {
  const handleChange = e => {
    let val = e.target.value;
    if (type === 'text') {
      onChange(val);
      return;
    }

    // Type number
    if (isNaN(+val)) {
      return;
    }
    if (+min && +val < +min) {
      val = min;
    }
    if (+max && +val > +max) {
      val = max;
    }
    onChange(+val);
  };

  return (
    <Input
      className={cn(
        'my-input',
        isNoBorder && 'my-input-no-border',
        !isApplyStyleDisabled && 'not-apply-disable-input'
      )}
      prefix={prefix}
      defaultValue="mysite"
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={handleChange}
      allowClear={false}
    />
  );
};

MyInput.propTypes = {
  // For input number
  min: PropTypes.number,
  max: PropTypes.number,
  // End for input number

  type: PropTypes.oneOf(['text', 'number']),
  prefix: PropTypes.element,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  isApplyStyleDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
  isNoBorder: PropTypes.bool,
  onChange: PropTypes.func,
};

MyInput.defaultProps = {
  min: 0,
  max: Number.MAX_SAFE_INTEGER,
  type: 'text',
  prefix: null,
  value: '',
  disabled: false,
  isApplyStyleDisabled: true,
  placeholder: 'Enter',
  isNoBorder: false,
  onChange: () => null,
};

export default MyInput;
