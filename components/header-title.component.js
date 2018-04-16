import React from 'react';
import PropTypes from 'prop-types';

export function HeaderTitle({ children }) {
  return (
    <div className="header__title">
      <p>netflixroulette</p>
      {children}
    </div>
  );
}

HeaderTitle.defaultProps = {
  children: null,
};

HeaderTitle.propTypes = {
  children: PropTypes.node,
};

