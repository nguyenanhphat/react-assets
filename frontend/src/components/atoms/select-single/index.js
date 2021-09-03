import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dropdown } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useOutsideClick } from 'hooks';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './styles.scss';

const MySelectSingle = ({
  value,
  placeholder,
  options,
  labelProp,
  valueProp,
  onChange,
  icon,
}) => {
  const wrapperRef = useRef(null);
  const menuRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [optionsShow, setOptionShow] = useState([]);

  useEffect(() => {
    setOptionShow(options);
    // if (options[0]?.name == 'VND') {
    //   console.log('aaaaaaa');
    //   setDefaultCurrency('VND');
    // }
  }, [options]);

  useOutsideClick(wrapperRef, visible, e => {
    if (menuRef.current.contains(e.target)) {
      return;
    }
    toggleDropdown();
  });

  const handleSelectItem = item => {
    onChange(item[valueProp]);
    toggleDropdown();
  };

  const menu = (
    <div ref={menuRef} className="wrapper-menu-select-single">
      <div className="menu-item-wrapper">
        {optionsShow.map(option => (
          <div
            key={option[valueProp]}
            className={cn('menu-item')}
            onClick={() => handleSelectItem(option)}
          >
            <span className="text">{option[labelProp]}</span>
            {option[valueProp] === value && (
              <CheckOutlined className="icon-checked" />
            )}
          </div>
        ))}
        {!optionsShow.length && <div className="menu-item">No result</div>}
      </div>
    </div>
  );

  const toggleDropdown = () => {
    setVisible(prevState => !prevState);
  };

  const valueMemo = useMemo(() => {
    if (!value) {
      return '';
    }

    const itemSelected = options.find(option => option[valueProp] === value);
    return itemSelected ? itemSelected[labelProp] : '';
  }, [value, options, valueProp, labelProp]);

  return (
    <Dropdown visible={visible} placement="bottomCenter" overlay={menu}>
      <div
        className={cn('content-select-single', visible && 'selecting')}
        ref={wrapperRef}
        onClick={toggleDropdown}
      >
        {icon && (
          <div className={cn('icon', value && 'icon-has-value')}>{icon}</div>
        )}
        <input
          className="control-value"
          value={valueMemo || placeholder}
          readOnly
        />
        <div className={cn('toggle-icon', visible && 'open')} />
      </div>
    </Dropdown>
  );
};

MySelectSingle.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.array,
  labelProp: PropTypes.string,
  valueProp: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.element,
};

MySelectSingle.defaultProps = {
  onChange: () => null,
  placeholder: 'Select',
  value: null,
  options: [
    { id: '5', name: '5' },
    { id: '10', name: '10' },
    { id: '20', name: '20' },
    { id: '40', name: '40' },
  ],
  labelProp: 'name',
  valueProp: 'id',
};

export default MySelectSingle;
