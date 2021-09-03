import { Pagination } from 'antd';
import cn from 'classnames';
import { OPTIONS_PAGE_SIZE, PAGE_SIZE } from 'constants/paginate';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { MySelectSingle } from '..';
import './styles.scss';

const SAPagination = ({ config, className, onChange }) => {
  const handleChangePage = useCallback(
    page => {
      onChange({
        ...config,
        current: page,
      });
    },
    [config, onChange]
  );

  const handleChangePageSize = useCallback(
    pageSize => {
      onChange({
        ...config,
        pageSize,
      });
    },
    [onChange, config]
  );

  return (
    <div className={cn(className, 'section-paginate')}>
      <div className="size-changer">
        <div className="mr-5">Show</div>
        <div className="control">
          <MySelectSingle
            value={+config.pageSize}
            options={OPTIONS_PAGE_SIZE}
            onChange={handleChangePageSize}
          />
        </div>
        <div>
          <strong>Total {config?.total} records</strong> found.
        </div>
      </div>
      <Pagination
        className="paginate-custom"
        {...{
          ...config,
          showSizeChanger: false,
        }}
        onChange={handleChangePage}
      />
    </div>
  );
};

SAPagination.propTypes = {
  config: PropTypes.shape({
    current: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
  }),
  onChange: PropTypes.func,
};

SAPagination.defaultProps = {
  config: {
    current: 1,
    pageSize: PAGE_SIZE,
    total: 100,
  },
  onChange: () => null,
};

export default SAPagination;
