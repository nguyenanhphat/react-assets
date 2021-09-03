import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Icon, IconCustom } from 'components/atoms';
import './styles.scss';

const MyTag = ({ className, icon, amount }) => {
  const checkShowAmount = () => {
    if (amount) {
      return <span className="amount">({amount})</span>;
    }
  };
  return (
    <span className={cn('tag-custom', className)}>
      <span className="icon">{icon}</span>
      <span>My Tag</span>
      {checkShowAmount()}
    </span>
  );
};

MyTag.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element,
  amount: PropTypes.number,
};

MyTag.defaultProps = {
  amount: 10,
  icon: <Icon component={IconCustom.Edit} />,
};

export default MyTag;
