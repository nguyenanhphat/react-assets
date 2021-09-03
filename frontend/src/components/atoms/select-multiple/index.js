import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dropdown } from 'antd';
import { MyCheckbox, MyInput } from '..';
import { useOutsideClick } from 'hooks';
import { debounced } from 'utils/common';
import { lowerCase } from 'lodash';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './styles.scss';

const MySelectMultiple = ({
  value,
  placeholder,
  options,
  labelProp,
  valueProp,
  onChange,
  prefix,
  empCode,
  showCount,
}) => {
  const wrapperRef = useRef(null);
  const menuRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [optionsShow, setOptionShow] = useState([]);

  useEffect(() => {
    setOptionShow(options);
  }, [options]);

  useOutsideClick(wrapperRef, visible, e => {
    if (menuRef.current.contains(e.target)) {
      return;
    }
    toggleDropdown();
  });

  const handleSearchItem = text => {
    setSearch(text);
    debounced(() => {
      setOptionShow(
        options.filter(
          option =>
            lowerCase(empCode ? option['empCode'] : option[labelProp]).indexOf(
              lowerCase(text)
            ) > -1
        )
      );
    });
  };

  const valueMemo = useMemo(() => {
    if (!value && !value.length) {
      return null;
    }
    return `(${value.length})`;
  }, [value]);

  const handleSelectItem = (e, item) => {
    e.stopPropagation();
    const valueNew = value.filter(i => i !== item[valueProp]);

    if (valueNew.length !== value.length) {
      onChange(valueNew);
      return;
    }
    onChange([...value, item[valueProp]]);
  };

  const checkMenuItemSelected = option => {
    if (value.findIndex(item => item === option[valueProp]) > -1) {
      return true;
    }
    return false;
  };

  const checkHasValue = () => {
    if (value && value.length) {
      return true;
    }
    return false;
  };

  const showClearSection = () => {
    if (!checkHasValue()) {
      return null;
    }
    return (
      <div className={cn('clear-section')}>
        <span className="text" onClick={() => onChange([])}>
          Clear all
        </span>
      </div>
    );
  };

  const menu = (
    <div ref={menuRef} className="wrapper-menu-select-multiple">
      {showClearSection()}
      <div className="search-section">
        <MyInput
          value={search}
          placeholder="Type something..."
          onChange={handleSearchItem}
          isNoBorder
        />
      </div>

      <div className="menu-item-wrapper">
        {optionsShow.map(option => (
          <div
            key={option[valueProp]}
            className={cn(
              'menu-item',
              checkMenuItemSelected(option) && 'menu-item-selected'
            )}
            onClick={e => handleSelectItem(e, option)}
          >
            <MyCheckbox value={checkMenuItemSelected(option)} />
            <span className="text">
              {option[labelProp] ||
                option['firstName'] + ' ' + option['lastName']}
            </span>
          </div>
        ))}
        {!optionsShow.length && <div className="menu-item">No result</div>}
      </div>
    </div>
  );

  const toggleDropdown = () => {
    setVisible(prevState => !prevState);
  };

  return (
    <Dropdown visible={visible} placement="bottomCenter" overlay={menu}>
      <div
        className={cn('content-select-multiple', visible && 'selecting')}
        ref={wrapperRef}
        onClick={toggleDropdown}
      >
        {prefix && (
          <div className={cn('icon', checkHasValue() && 'icon-has-value')}>
            {prefix}
          </div>
        )}
        <input
          className={cn('control-value', visible && 'showing')}
          value={placeholder}
          readOnly
        />
        {showCount && <div className="total-selected">{valueMemo}</div>}
        <div className={cn('toggle-icon', visible && 'open')} />
      </div>
    </Dropdown>
  );
};

MySelectMultiple.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.array,
  options: PropTypes.array,
  labelProp: PropTypes.string,
  valueProp: PropTypes.string,
  onChange: PropTypes.func,
  prefix: PropTypes.element,
};

MySelectMultiple.defaultProps = {
  onChange: value => console.log('Select-multiple-value:', value),
  placeholder: 'Select',
  value: [],
  options: [
    { id: 'a1', name: 'A1' },
    { id: 'a2', name: 'A2' },
  ],
  labelProp: 'name',
  valueProp: 'id',
  showCount: false,
};

export default React.memo(MySelectMultiple);
