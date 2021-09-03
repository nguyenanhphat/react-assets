import { MoreOutlined } from '@ant-design/icons';
import { MyPopover } from 'components/atoms';
import React, { useMemo } from 'react';
import { formatTime } from 'utils/time';
import { useDisplayFinPlanOptions } from '../../../../hooks/parserOptionItem';

const CONTENT_POPOVER = [{ name: 'Edit', key: 'edit', icon: null }];

export const useGetColumnMaintenanceTable = (
  onSelectEdit,
  suppliers,
  supplierContracts
) => {
  const displayFinPlanOptions = useDisplayFinPlanOptions();
  return useMemo(() => {
    return [
      {
        title: 'Issue Date',
        key: 'issueDate',
        sorter: true,
        render: val => {
          return val ? formatTime(val) : '';
        },
      },
      {
        title: 'Completed Date',
        key: 'completedDate',
        sorter: true,
        render: val => {
          return val ? formatTime(val) : '';
        },
      },
      {
        title: 'Cost',
        key: 'cost',
        sorter: true,
      },
      {
        title: 'Supplier',
        key: 'supplierId',
        render: (val, col) => {
          return displayFinPlanOptions(val, suppliers);
        },
      },
      {
        title: 'Supplier Contract',
        key: 'supplierContractId',
        render: (val, col) => {
          return displayFinPlanOptions(val, supplierContracts);
        },
      },
      {
        title: 'Details',
        key: 'details',
        render: val => {
          if (val) {
            const cleanText = val.replace(/<\/?[^>]+(>|$)/g, '');
            return cleanText.length > 50
              ? `${cleanText.substring(0, 50)}...`
              : cleanText;
          }
          return '';
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
  }, [displayFinPlanOptions, onSelectEdit, supplierContracts, suppliers]);
};
