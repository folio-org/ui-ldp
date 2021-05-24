import React from 'react';
import PropTypes from 'prop-types';
import { MultiColumnList, NoValue } from '@folio/stripes/components';

const ResultsList = ({ results }) => {
  const data = results.resp || [];
  const formatter = {};
  if (data.length) {
    Object.entries(data[0]).forEach(([key, _value]) => {
      formatter[key] = (rec) => (rec[key] === null ? <NoValue /> : rec[key]);
    });
  }

  return (
    <div style={{ flex: 1 }}>
      {(results.key) ? <MultiColumnList key={results.key} contentData={data} formatter={formatter} virtualize autosize /> : <div />}
    </div>
  );
};

ResultsList.propTypes = {
  results: PropTypes.object,
};

export default ResultsList;
