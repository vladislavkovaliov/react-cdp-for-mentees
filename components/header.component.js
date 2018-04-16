import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

export function HeaderWrapper({ children }) {
  return (
    <div className="header">
      <div>{children}</div>
    </div>
  );
}

HeaderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
