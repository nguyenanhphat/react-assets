import React from 'react';
import { Progress } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';
import './styles.scss';

const MyProgress = ({
  percent,
  className
}) => {
  return (
    <Progress
      className={cn(
        'progress-custom',
        className,
        percent === 100 ? 'completed' : 'pending'
      )}
      percent={percent || 0}
      showInfo={false}
    />
  );
};

MyProgress.propTypes = {
  percent: PropTypes.number,
  className: PropTypes.string
};

MyProgress.defaultProps = {
  percent: 0
};

export default MyProgress;
