import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './wrapper.scss';

export class Wrapper extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="wrapper">{children}</div>
    );
  }
}

Wrapper.defaultProps = {
  children: null,
};

Wrapper.propTypes = {
  children: PropTypes.node,
};
