import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import './styles.scss';

const MyLoading = ({ title, icon, size }) => {
  return (
    <div className="my-spin">
      <Spin indicator={icon} size={size} tip={title}></Spin>
    </div>
  );
};

MyLoading.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string,
};
MyLoading.defaultProps = {
  title: '',
  size: '',
  icon: '',
};

export default MyLoading;
