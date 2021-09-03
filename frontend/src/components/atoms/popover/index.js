import Icon from '@ant-design/icons';
import { Popover } from 'antd';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import './style.scss';
import cn from 'classnames';

const MyPopover = ({
  placement,
  content,
  trigger,
  children,
  onSelect,
  type,
}) => {
  const [visible, setVisible] = useState(false);
  const LIST = 'list';
  const renderContent = useMemo(() => {
    return type === LIST ? (
      content.map(item => (
        <div
          className="popover-item-custom"
          key={item.key}
          onClick={() => {
            onSelect(item?.key);
            setVisible(prevState => !prevState);
          }}
        >
          {<Icon component={item.icon} />}
          {item.name}
        </div>
      ))
    ) : (
      <div className="popover-contain-icon">
        {content.map(item => (
          <div className="popover-icon-custom" key={item.key}>
            {<Icon component={item.icon} />}
            {item.name}
          </div>
        ))}
      </div>
    );
  }, [content, onSelect, type]);

  return (
    <div>
      <Popover
        visible={visible}
        className={cn('my-popover-custom', {
          'my-popover-contain-icon': type === 'icon',
        })}
        placement={placement}
        content={renderContent}
        trigger={trigger}
        onVisibleChange={setVisible}
      >
        {children}
      </Popover>
    </div>
  );
};
MyPopover.propTypes = {
  placement: PropTypes.string,
  trigger: PropTypes.oneOf(['hover', 'click']),
  content: PropTypes.array,
  onSelect: PropTypes.func,
  type: PropTypes.string,
};

MyPopover.defaultProps = {
  placement: 'bottomRight',
  trigger: 'hover',
  content: [
    { name: 'Edit', key: 'edit', icon: null },
    { name: 'View Usage History', key: 'usageHistory', icon: null },
    { name: 'View Maintenance History', key: 'maintenanceHistory', icon: null },
  ],
  onSelect: () => null,
  type: 'list',
};

export default MyPopover;
