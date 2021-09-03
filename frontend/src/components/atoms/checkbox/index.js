import React from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import './styles.scss';

const SACheckbox = ({ label, disabled, value, onChange }) => {
  return (
    <Checkbox
      className="my-checkbox"
      checked={value}
      disabled={disabled}
      onChange={e => onChange(e.target.checked)}
    >
      {label}
    </Checkbox>
  );
};

SACheckbox.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  value: PropTypes.bool,
  onChange: PropTypes.func,
  isApplyStyleDisabled: PropTypes.bool,
};

SACheckbox.defaultProps = {
  label: '',
  disabled: false,
  value: true,
  onChange: () => null,
};

export default SACheckbox;
