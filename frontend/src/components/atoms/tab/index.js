import React from 'react';
import { Tabs } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';
import './styles.scss';

const { TabPane } = Tabs;

const MyTab = ({
  children,
  tabs,
  tabActive,
  onChange,
  className
}) => {
  const handleChangeTab = tab => {
    onChange(tab);
  };
  return (
    <>
      <Tabs
        activeKey={tabActive}
        onChange={handleChangeTab}
        className={cn('tab-custom', className)}
      >
        {tabs.map(tab => (
          <TabPane tab={tab.name} key={tab.key} />
        ))}
      </Tabs>
      {children}
    </>
  );
};

MyTab.propTypes = {
  tabs: PropTypes.array,
  tabActive: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  className: PropTypes.string
};

MyTab.defaultProps = {
  tabs: [
    { name: 'Upload', key: 'upload' },
    { name: 'Weblink', key: 'link' },
  ],
  tabActive: 'link',
  onChange: () => null,
  className: ''
};

export default MyTab;
