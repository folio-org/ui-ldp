import React from 'react';
import PropTypes from 'prop-types';
import { MultiColumnList } from '@folio/stripes/components';

// NULL is NULL all over the world, and does not need localizing
// eslint-disable-next-line @calm/react-intl/missing-formatted-message
const NULLValue = <span style={{ color: 'grey' }}>[NULL]</span>;

const ResultsList = ({ results }) => {
  if (!results.key) return null;

  const data = results.resp || [];
  const formatter = {};
  if (data.length) {
    Object.entries(data[0]).forEach(([key, _value]) => {
      formatter[key] = (rec) => (rec[key] === null ? NULLValue : rec[key]);
    });
  }

  return <MultiColumnList key={results.key} contentData={data} formatter={formatter} virtualize autosize />;
};

ResultsList.propTypes = {
  results: PropTypes.object,
};

export default ResultsList;
