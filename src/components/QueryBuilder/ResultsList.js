import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { exportCsv } from '@folio/stripes/util';
import { Button, MultiColumnList } from '@folio/stripes/components';
import css from './QueryBuilder.css';


// NULL is NULL all over the world, and does not need localizing
// eslint-disable-next-line @calm/react-intl/missing-formatted-message
const NULLValue = <span style={{ color: 'grey' }}>[NULL]</span>;


const ResultsList = ({ results, searchWithoutLimit }) => {
  const intl = useIntl();

  if (!results.key) return null;

  const data = results.resp || [];
  const formatter = {};
  if (data.length) {
    Object.entries(data[0]).forEach(([key, _value]) => {
      formatter[key] = (rec) => (rec[key] === null ? NULLValue : rec[key]);
    });
  }

  const maybeExportCsv = (qr) => {
    if (qr.isComplete) {
      exportCsv(qr.resp, {});
    } else {
      searchWithoutLimit(r => exportCsv(r.resp, {}));
    }
  };

  return (
    <>
      <div className={css.ResultsSummary}>
        <span data-cy="results.message">
          {results.key && (
            results.isComplete ?
              <FormattedMessage id="ui-ldp.found-records" values={{ count: results.count }} /> :
              <FormattedMessage id="ui-ldp.found-more-than" values={{ count: results.count }} />
          )}
        </span>
        <Button
          aria-label={intl.formatMessage({ id: 'ui-ldp.button.download-csv' })}
          disabled={!results.resp?.length}
          onClick={() => maybeExportCsv(results)}
          xstyle={{ marginTop: '-1em' }}
          data-cy="results.downloadCSV"
        >
          <FormattedMessage id="ui-ldp.button.csv" />
        </Button>
      </div>
      <MultiColumnList key={results.key} contentData={data} formatter={formatter} virtualize autosize />
    </>
  );
};


ResultsList.propTypes = {
  results: PropTypes.object,
  searchWithoutLimit: PropTypes.func.isRequired,
};


export default ResultsList;
