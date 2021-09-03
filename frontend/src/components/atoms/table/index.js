import { Table } from 'antd';
import cn from 'classnames';
import { Icon, IconCustom } from 'components/atoms';
import { PAGE_SIZE } from 'constants/paginate';
import PropTypes from 'prop-types';
import styles from './table.module.scss';
import React, { useCallback } from 'react';
import { MyPagination } from '..';
import './styles.scss';

const { Column } = Table;
const MyTable = ({
  columns,
  data,
  className,
  pagination,
  onChange,
  onChangeSort,
  isDescending,
  sortBy,
  isHaveBorder,
}) => {
  const handleChangePaginate = useCallback(
    data => {
      onChange(data);
    },
    [onChange]
  );

  const checkShowIconSort = useCallback(
    ({ sorter, key }) => {
      if (!sorter) {
        return null;
      }
      if (key !== sortBy) {
        return (
          <img
            width="10"
            alt="icon-sort"
            src={require('assets/images/sort.svg')}
            className="no-sort"
          />
        );
      }
      return (
        <Icon
          className={cn({ [styles.sorterIcon]: isDescending })}
          component={IconCustom.Asc}
        />
      );
    },
    [isDescending, sortBy]
  );

  const handleChangeSort = useCallback(
    column => {
      if (!column.sorter) {
        return;
      }

      if (column.key !== sortBy) {
        onChangeSort({
          sortBy: column.key,
          isDescending: true,
        });
        return;
      }

      onChangeSort({
        sortBy: column.key,
        isDescending: !isDescending,
      });
    },
    [isDescending, onChangeSort, sortBy]
  );
  return (
    <div className={cn(isHaveBorder && 'b-1')}>
      <Table
        dataSource={data}
        pagination={false}
        className={cn('table-custom', className)}
        rowKey={col => col?.id}
      >
        {columns.map((column, index) => (
          <Column
            title={
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
              <div
                role="button"
                className={cn(
                  'column-header',
                  column.sorter && 'column-header-pointer'
                )}
                onClick={() => handleChangeSort(column)}
              >
                <span className="title">{column.title}</span>
                <span className="sort-icon">{checkShowIconSort(column)}</span>
              </div>
            }
            dataIndex={column.key}
            key={index}
            className={column.className}
            render={column.render}
          />
        ))}
      </Table>
      <MyPagination
        className="mt-20"
        config={pagination}
        onChange={handleChangePaginate}
      />
    </div>
  );
};

MyTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  pagination: PropTypes.shape({
    current: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
  }),
  className: PropTypes.string,
  onChange: PropTypes.func,
  onChangeSort: PropTypes.func,
  isDescending: PropTypes.bool,
  sortBy: PropTypes.string,
  isHaveBorder: PropTypes.bool,
};

MyTable.defaultProps = {
  sortBy: 'name',
  isDescending: true,
  onChange: () => null,
  onChangeSort: () => null,
  pagination: {
    current: 1,
    pageSize: PAGE_SIZE,
    total: 100,
  },
  columns: [
    {
      title: 'Name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Age',
      key: 'age',
      sorter: true,
    },
    {
      title: 'Address',
      key: 'address',
    },
  ],
  isHaveBorder: false,
};

export default MyTable;
