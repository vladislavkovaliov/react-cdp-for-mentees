import React from 'react';
import PropTypes from 'prop-types';

export function InvalidSearchValue({ isValid, children }) {
  return (
    <span className={isValid ? 'hide' : 'header__content-input--invalid'}>{children}</span>
  );
}

InvalidSearchValue.propTypes = {
  isValid: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}; 
