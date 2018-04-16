import React from 'react';
import PropTypes from 'prop-types';

export function ContentHeaderWrapper({ children }) {
  return (
    <div className="content__wrapper-header">
      <div className="content__header">
        {children}
      </div>
    </div>
  );
}

ContentHeaderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
