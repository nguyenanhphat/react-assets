import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import './styles.scss';

const MyBreadcrumb = ({ path }) => {
  const history = useHistory();

  const handleClickPath = path => () => {
    path && history.push(path);
  };

  return (
    <Breadcrumb
      className="mb-20 my-breadcrumb-custom"
      separator={<CaretRightOutlined className="fs-10" />}
    >
      {(path || []).map((item, idx) => {
        return (
          <Breadcrumb.Item
            className={cn('breadcrumb-item', item.link && 'can-click')}
            key={idx}
            onClick={handleClickPath(item.link)}
          >
            {item.name}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

MyBreadcrumb.propTypes = {
  path: PropTypes.array,
};

MyBreadcrumb.defaultProps = {
  path: [{ name: 'Home', link: '/' }, { name: 'Contact' }],
};

export default MyBreadcrumb;
