import React, { useMemo } from 'react';
import { MyPopover } from 'components/atoms';
import { MoreOutlined } from '@ant-design/icons';
import { formatCurrencyVnd } from 'utils/common';
import { useDisplayFinPlanOptions } from '../../../hooks/parserOptionItem';
import Status from '../components/Status/Status';
import { formatTime } from 'utils/time';

const CONTENT_POPOVER = [
  { name: 'Edit', key: 'edit', icon: null },
  { name: 'View Usage History', key: 'usage', icon: null },
  { name: 'View Maintenance History', key: 'maintenance', icon: null },
];

export const useGetColumnAssetManagementTable = (onSelectEdit, suppliers) => {
  const displayFinPlanOptions = useDisplayFinPlanOptions();
  return useMemo(() => {
    return [
      {
        title: 'Name',
        key: 'name',
        sorter: true,
      },
      {
        title: 'Type',
        key: 'type',
        sorter: true,
        // eslint-disable-next-line react/display-name
        render: (val, col) => {
          return (
            <div>
              <b>{col?.type?.name || ''}</b>
              <br />
              <span>{col?.subType?.name}</span>
            </div>
          );
        },
      },
      {
        title: 'Location',
        key: 'location',
        sorter: true,
        // eslint-disable-next-line react/display-name
        render: (val, col) => {
          return (
            <div>
              <b>{col?.location?.name || ''}</b>
              <br />
              <span>
                {`${col?.assignee?.firstName || ''} ${
                  col?.assignee?.lastName || ''
                }`}
              </span>
            </div>
          );
        },
      },
      {
        title: 'Specification',
        key: 'specification',
        className: 'w-10p',
        // eslint-disable-next-line react/display-name
        render: (val, col) => {
          return (
            <div>
              <b>{col?.specification?.model || ''}</b>
              <br />
              <span>{col?.specification?.serialNumber || ''}</span>
            </div>
          );
        },
      },
      {
        title: 'Supplier',
        key: 'supplierId',
        render: (val, col) => {
          return displayFinPlanOptions(col?.purchase?.supplierId, suppliers);
        },
      },
      {
        title: 'Purchased Date',
        key: 'purchasedDate',
        sorter: true,
        render: (val, col) => {
          return col?.purchase?.time ? formatTime(col?.purchase?.time) : '';
        },
      },
      {
        title: 'Purchased Value',
        key: 'purchasedValue',
        sorter: true,
        render: (val, col) => {
          return col?.purchase?.cost
            ? formatCurrencyVnd(col.purchase.cost)
            : '';
        },
      },
      {
        title: 'Current Value',
        key: 'currentValue',
        sorter: true,
        render: (val, col) => {
          return col?.currentValue ? formatCurrencyVnd(col?.currentValue) : '';
        },
      },
      {
        title: 'Status',
        key: 'status',
        sorter: true,
        // eslint-disable-next-line react/display-name
        render: val => {
          return <Status status={val} />;
        },
      },
      {
        title: '',
        key: 'action',
        className: 'w-3p',
        // eslint-disable-next-line react/display-name
        render: (val, col) => {
          return (
            <MyPopover
              content={CONTENT_POPOVER}
              onSelect={key => onSelectEdit(key, col)}
            >
              <MoreOutlined className="fs-18" />
            </MyPopover>
          );
        },
      },
    ];
  }, [displayFinPlanOptions, onSelectEdit, suppliers]);
};
