import Icon from '@ant-design/icons';
import { Col, Row } from 'antd';
import { IconCustom, MyInput, MyCheckbox } from 'components/atoms';
import React, { useCallback, useState } from 'react';
import { debounced } from 'utils/common';
import cn from 'classnames';
import styles from './listUserFilter.module.scss';

const UserFilter = ({ searchParams, handleChangeParam }) => {
  const [searchOptions, setSearchOptions] = useState(searchParams);
  const onChange = useCallback(
    name => {
      return value => {
        if (name !== 'isActive') {
          debounced(() => {
            handleChangeParam(name, value);
          });
        } else {
          handleChangeParam(name, value);
        }
        setSearchOptions(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };
    },
    [handleChangeParam]
  );
  return (
    <div className={cn(styles.containerFilter)}>
      <div className={cn(styles.filterInput)}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <MyInput
              onChange={onChange('name')}
              value={searchOptions.name}
              prefix={<Icon component={IconCustom.Search} />}
              placeholder="Search"
              type="text"
            />
          </Col>
          <Col className={cn(styles.filterCheckBox)} span={6}>
            <MyCheckbox
              onChange={onChange('isActive')}
              value={searchOptions.isActive}
              label="Active"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserFilter;
