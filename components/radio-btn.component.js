import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

export function RadioButton({ value, name, id, onChange, isChecked, text }) {
  return (
    <Fragment>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={isChecked}
      />
      <label htmlFor={id}>{text}</label>
    </Fragment>
  );
}

PropTypes.defaultProps = {
  isChecked: false,
  onChange: null,
};

PropTypes.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};