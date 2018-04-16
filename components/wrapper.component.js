import React from 'react';
import PropTypes from 'prop-types';

import './wrapper.scss';

export function Wrapper({ children }) {
  return (
    <div className="wrapper">{children}</div>
  );
}

Wrapper.defaultProps = {
  children: null,
};

Wrapper.propTypes = {
  children: PropTypes.node,
};
