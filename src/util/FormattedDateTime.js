import React from 'react';
import PropTypes from 'prop-types';
import { FormattedTime, FormattedDate } from 'react-intl';

function FormattedDateTime({ datetime }) {
  return (
    <>
      <FormattedTime value={datetime} hour="numeric" minute="numeric" second="numeric" />
      {', '}
      <FormattedDate value={datetime} year="numeric" month="long" day="numeric" />
    </>
  );
}

FormattedDateTime.propTypes = {
  datetime: PropTypes.string.isRequired, // XXX is "string" correct?
};

export default FormattedDateTime;
