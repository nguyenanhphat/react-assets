import Icon, { MoreOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { IconCustom, MyPopover } from 'components/atoms';
import React, { useMemo } from 'react';
import { formatTime } from 'utils/time';

const CONTENT_POPOVER = [{ name: 'Edit', key: 'edit', icon: null }];

export const useGetColumnUsageHistoryTable = onSelectEdit =>
  useMemo(() => {
    return [
      {
        title: 'Assignee',
        key: 'assignee',
        sorter: true,
        render: (val, col) => {
          return `${col?.assignee?.firstName || ''} ${
            col?.assignee?.lastName || ''
          }`;
        },
      },
      {
        title: 'Start Date',
        key: 'usageFrom',
        sorter: true,
        render: val => {
          return val ? formatTime(val) : '';
        },
      },
      {
        title: 'End Date',
        key: 'usageTo',
        sorter: true,
        render: val => {
          return val ? formatTime(val) : '';
        },
      },
      {
        title: 'Location',
        key: 'location',
        sorter: true,
        render: (val, col) => {
          return col?.location?.name || '';
        },
      },
      {
        title: 'Handover Content',
        key: 'handoverContent',
        render: (val, index) => {
          if (val) {
            const cleanText = val.replace(/<\/?[^>]+(>|$)/g, '');
            return cleanText.length > 50 ? (
              <Popover
                placement="bottom"
                content={renderValueEditor(val)}
                trigger="click"
              >
                <div className="contain-handover-content">
                  <Icon
                    component={IconCustom.Outline}
                    className="fs-18 mr-10"
                  />
                  {cleanText.substring(0, 50)}...
                </div>
              </Popover>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: cleanText }} />
            );
          }
          return '';
        },
      },
      {
        title: 'Handover Documents',
        key: 'handoverDocuments',
        render: (val, col) => {
          return val?.length ? val.map(item => <span>{item.name}</span>) : '';
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
  }, [onSelectEdit]);

const renderValueEditor = val => {
  return <div dangerouslySetInnerHTML={{ __html: val }} />;
};
