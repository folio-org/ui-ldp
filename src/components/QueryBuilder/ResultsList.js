import React from 'react';
import PropTypes from 'prop-types';
import { MultiColumnList, NoValue } from '@folio/stripes/components';

const ResultsList = ({ results }) => {
  if (!results.key) return null;

  const data = results.resp || [];
  const formatter = {};
  if (data.length) {
    Object.entries(data[0]).forEach(([key, _value]) => {
      formatter[key] = (rec) => (rec[key] === null ? <NoValue /> : rec[key]);
    });
  }

  return <MultiColumnList key={results.key} contentData={data} formatter={formatter} virtualize autosize />;
};

ResultsList.propTypes = {
  results: PropTypes.object,
};

export default ResultsList;
