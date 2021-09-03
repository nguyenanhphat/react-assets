import React from 'react';
import './status.scss';

const Status = ({ status }) => {
  switch (status) {
    case 'inStorage':
      return <span className="bg-status in-storage">In Storage</span>;
    case 'void':
      return <span className="bg-status void">Void</span>;
    case 'resaleRequired':
      return <span className="bg-status resale-required">Resale Required</span>;
    case 'repairing':
      return <span className="bg-status maintaining">Repairing</span>;
    case 'malfunction':
      return <span className="bg-status malfunction">Malfunction</span>;
    default:
      return <span className="bg-status in-use">In Use</span>;
  }
};

export default Status;
