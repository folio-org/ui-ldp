import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { MultiColumnList } from '@folio/stripes/components';
import Tabs from '../../Tabs';
import FormattedDateTime from '../../util/FormattedDateTime';


// PRIVATE to colorize
const _severityColors = {
  INFO: '#808080',
  WARNING: '#e0a000',
  ERROR: '#e00000',
  FATAL: '#000000',
};


function colorize(severity) {
  const color = _severityColors[severity];
  return <span style={{ color }}>{severity}</span>;
}


function Logs({ data }) {
  const [sortedColumn, setSortedColumn] = useState('log_time');
  const [sortDirection, setSortDirection] = useState('descending');

  const sortedLogs = (data.logs || []).sort((a, b) => {
    const av = a[sortedColumn];
    const bv = b[sortedColumn];

    if (av < bv) {
      return (sortDirection === 'ascending' ? -1 : 1);
    } else if (av > bv) {
      return (sortDirection === 'ascending' ? 1 : -1);
    } else {
      return 0;
    }
  });

  return (
    <Tabs>
      <MultiColumnList
        contentData={sortedLogs}
        visibleColumns={['log_time', 'error_severity', 'message']}
        columnMapping={{
          log_time: <FormattedMessage id="ui-ldp.dbinfo.logs.log_time" />,
          error_severity: <FormattedMessage id="ui-ldp.dbinfo.logs.error_severity" />,
          message: <FormattedMessage id="ui-ldp.dbinfo.logs.message" />,
        }}
        columnWidths={{
          log_time: 240,
          error_severity: 100,
          message: 600,
        }}
        formatter={{
          log_time: r => <FormattedDateTime datetime={r.log_time} />,
          error_severity: r => colorize(r.error_severity),
        }}
        sortedColumn={sortedColumn}
        sortDirection={sortDirection}
        onHeaderClick={(e, { name }) => {
          if (name === sortedColumn) {
            setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
          } else {
            setSortedColumn(name);
            setSortDirection('ascending');
          }
        }}
      />
    </Tabs>
  );
}


Logs.propTypes = {
  data: PropTypes.shape({
    logs: PropTypes.arrayOf(
      PropTypes.shape({
        log_time: PropTypes.string.isRequired,
        error_severity: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }).isRequired,
};


export default Logs;
