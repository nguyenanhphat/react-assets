import { MyTable } from 'components/atoms';
import React, { useCallback, useMemo } from 'react';
import './style.scss';

const UserTable = ({
  pagination,
  onChangePagination,
  users,
  onChangeSort,
  sorter,
}) => {
  const handleColorStatus = useCallback(isActive => {
    if (isActive) {
      return <span className="bg-status status-active">Active</span>;
    }
    return <span className="bg-status status-in-active">In-Active</span>;
  }, []);

  const columns = useMemo(
    () => [
      {
        title: 'Full Name',
        key: 'firstName',
        sorter: true,
        render: (val, col) => {
          return `${col.firstName} ${col.lastName}`;
        },
      },
      {
        title: 'Emp Code',
        key: 'empCode',
        sorter: true,
      },
      {
        title: 'Status',
        key: 'isActive',
        sorter: true,
        render: val => {
          return handleColorStatus(val);
        },
      },
    ],
    [handleColorStatus]
  );

  return (
    <div className="list-table">
      <MyTable
        columns={columns}
        data={users}
        pagination={pagination}
        isDescending={sorter.isDescending}
        sortBy={sorter.sortBy}
        onChange={onChangePagination}
        onChangeSort={onChangeSort}
      />
    </div>
  );
};

export default UserTable;
