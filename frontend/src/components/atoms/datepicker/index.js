import React from 'react';
import { DatePicker } from 'antd';
import { DATE_TIME_CONTROL_SHOW } from 'constants/datetime';
import PropTypes from 'prop-types';
import moment from 'moment';
import cn from 'classnames';
import './styles.scss';

const MyDatepicker = ({ value, className, onChange, placeholder }) => {
  const handleDateChange = date => {
    onChange(moment(date).toISOString());
  };
  return (
    <DatePicker
      value={value ? moment(value) : null}
      format={DATE_TIME_CONTROL_SHOW}
      showToday={false}
      allowClear={false}
      className={cn('my-datepicker-custom', className)}
      onChange={handleDateChange}
      placeholder={placeholder}
    />
  );
};
MyDatepicker.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

MyDatepicker.defaultProps = {
  value: null,
  onChange: () => null,
  placeholder: 'Select',
};

export default MyDatepicker;
