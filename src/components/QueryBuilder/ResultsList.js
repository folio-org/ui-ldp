import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { Button, MultiColumnList, exportToCsv } from '@folio/stripes/components';
import css from './QueryBuilder.css';


// NULL is NULL all over the world, and does not need localizing
// eslint-disable-next-line @calm/react-intl/missing-formatted-message
const NULLValue = <span style={{ color: 'grey' }}>[NULL]</span>;


const ResultsList = ({ results, searchWithoutLimit }) => {
  const intl = useIntl();

  if (!results) return null;

  const data = results.resp || [];
  const formatter = {};
  if (data.length) {
    Object.entries(data[0]).forEach(([key, _value]) => {
      formatter[key] = (rec) => (rec[key] === null ? NULLValue : rec[key]);
    });
  }

  // I don't understand why it's necessary to pass this in explicitly,
  // but if we do not then MultiColumnList unhelpfully caches its
  // calculated notion of what columns to display, so that switching
  // between report-result tabs shows the wrong columns.
  const visibleColumns = data[0] ? Object.keys(data[0]) : [];

  const maybeExportCsv = (qr) => {
    if (qr.isComplete) {
      exportToCsv(qr.resp, {});
    } else {
      searchWithoutLimit(r => exportToCsv(r.resp, {}));
    }
  };

  return (
    <>
      <div className={css.ResultsSummary}>
        <span data-cy="results.message">
          {results.isComplete ?
            <FormattedMessage id="ui-ldp.found-records" values={{ count: results.count }} /> :
            <FormattedMessage id="ui-ldp.found-more-than" values={{ count: results.count }} />
          }
        </span>
        <Button
          aria-label={intl.formatMessage({ id: 'ui-ldp.button.download-csv' })}
          disabled={!data.length}
          onClick={() => maybeExportCsv(results)}
          xstyle={{ marginTop: '-1em' }}
          data-cy="results.downloadCSV"
        >
          <FormattedMessage id="ui-ldp.button.csv" />
        </Button>
      </div>
      <div className={css.mclFlexDescendent}>
        {/* the next div is non-flex, gives autosizer something to expand against */}
        <div className={css.mclParent}>
          <MultiColumnList contentData={data} formatter={formatter} visibleColumns={visibleColumns} virtualize autosize />
        </div>
      </div>
    </>
  );
};


ResultsList.propTypes = {
  results: PropTypes.shape({
    count: PropTypes.number.isRequired,
    isComplete: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    resp: PropTypes.array.isRequired,
  }),
  searchWithoutLimit: PropTypes.func, // not .isRequired when called from TemplatedQuery.js
};


export default ResultsList;
