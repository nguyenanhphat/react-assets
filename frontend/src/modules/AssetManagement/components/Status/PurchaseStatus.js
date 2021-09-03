import React from 'react';
import './status.scss';

const PurchaseStatus = ({ status }) => {
  switch (status) {
    case 'new':
      return <span className="bg-status in-storage">New</span>;
    case 'old':
      return <span className="bg-status maintaining">Old</span>;
    default:
      return <span className="bg-status in-storage">New</span>;
  }
};

export default PurchaseStatus;
