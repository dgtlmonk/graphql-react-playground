import React from 'react';
import Proptypes from 'prop-types';

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line no-shadow
export default function FormErrors({errors = []}) {
  return (
    <div className="form-errors">
      {errors.map(error => (
        <div className="error-item" key={error}>
          {' '}
          {error}
        </div>
      ))}
    </div>
  );
}

FormErrors.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  errors: Proptypes.array.isRequired,
};
