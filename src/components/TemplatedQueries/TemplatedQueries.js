import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useStripes } from '@folio/stripes/core';
import { FormattedMessage, useIntl } from 'react-intl';
import { Paneset, Pane, TextField, MultiColumnList, DefaultMCLRowFormatter } from '@folio/stripes/components';
import { useLdp } from '../../LdpContext';
import templatedQueryName from '../../util/templatedQueryName';
import canRunReport from '../../util/canRunReport';
import css from './TemplatedQueries.css';


// Reports that the user is not authorized to run are rendered in grey,
// and without the click and keyboard handlers that would open them.
function makeRowFormatter(intl) {
  return (row) => {
    const { rowIndex, rowClass, rowData, rowProps, cells } = row;
    if (rowData.canRun !== false) {
      return DefaultMCLRowFormatter(row);
    }

    const { _onClick, _onKeyDown, _labelStrings, ...props } = rowProps;
    return (
      <div
        key={`row-${rowIndex}`}
        className={`${rowClass} ${css.unauthorized}`}
        aria-disabled="true"
        title={intl.formatMessage({ id: 'ui-ldp.templated-queries.unauthorized' })}
        {...props}
      >
        {cells}
      </div>
    );
  };
}


function TemplatedQueries({ queries, repos }) {
  const intl = useIntl();
  const stripes = useStripes();
  const history = useHistory();
  const ldp = useLdp();
  const [sortedColumn, setSortedColumn] = useState('displayName');
  const [sortDirection, setSortDirection] = useState('ascending');
  const [filterString, setFilterString] = useState('');

  function navigateToQuery(q) {
    // A click on a disabled row, which has no click handler of its own,
    // reaches the MCL row container, which calls onRowClick with no row
    if (!q || q.canRun === false) return;
    const qname = templatedQueryName(q);
    ldp.addTqTab({ ...q, name: qname, state: {} });
    history.push(`/ldp/tq/${qname}`);
  }

  function sortByColumn(name) {
    if (sortedColumn === name) {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortedColumn(name);
      setSortDirection('ascending');
    }
  }

  function sortKey(r, sc) {
    if (sc === 'displayName') {
      return r.json?.displayName;
    } else if (sc === 'filename') {
      return r.filename;
    } else if (sc === 'repo') {
      return (r.config.type || 'github') + ':' + r.config.user + '/' + r.config.repo;
    } else {
      return r[sc];
    }
  }

  const userId = stripes.user?.user?.id;
  const annotatedQueries = queries.map(q => ({
    ...q,
    canRun: canRunReport(q, repos, userId),
  }));

  annotatedQueries.sort((a, b) => {
    const av = sortKey(a, sortedColumn);
    const bv = sortKey(b, sortedColumn);
    if (av === bv) {
      return 0;
    } else if ((av < bv && sortDirection === 'ascending') ||
               (av > bv && sortDirection === 'descending')) {
      return -1;
    } else {
      return 1;
    }
  });

  const filteredQueries = annotatedQueries.filter(q => {
    return (q.json?.displayName?.toLowerCase().includes(filterString.toLowerCase()) ||
            q.filename.toLowerCase().includes(filterString.toLowerCase()));
  });

  return (
    <Paneset>
      <Pane defaultWidth="fill" paneTitle={<FormattedMessage id="ui-ldp.templated-queries.select" />}>

        <TextField
          label={<FormattedMessage id="ui-ldp.templated-queries.filter" />}
          onChange={ev => setFilterString(ev.target.value)}
        />
        <MultiColumnList
          contentData={filteredQueries}
          visibleColumns={['displayName', 'filename', 'repo']}
          columnMapping={{
            displayName: <FormattedMessage id="ui-ldp.templated-queries.column.displayName" />,
            filename: <FormattedMessage id="ui-ldp.templated-queries.column.filename" />,
            repo: <FormattedMessage id="ui-ldp.templated-queries.column.repo" />,
          }}
          columnWidths={{
          }}
          formatter={{
            displayName: r => r.json?.displayName,
            repo: r => <span><code>{r.config.type || 'github'}</code> {r.config.user}/{r.config.repo}</span>,
          }}
          onRowClick={(_, q) => navigateToQuery(q)}
          rowFormatter={makeRowFormatter(intl)}
          sortedColumn={sortedColumn}
          sortDirection={sortDirection}
          onHeaderClick={(_, m) => sortByColumn(m.name)}
        />
      </Pane>
    </Paneset>
  );
}


TemplatedQueries.propTypes = {
  queries: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string.isRequired,
      config: PropTypes.shape({
        user: PropTypes.string.isRequired,
        repo: PropTypes.string.isRequired,
      }).isRequired,
      text: PropTypes.string.isRequired,
      json: PropTypes.shape({
        displayName: PropTypes.string,
      }),
    }).isRequired,
  ),
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      authorizedUsers: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  ),
};


export default TemplatedQueries;
