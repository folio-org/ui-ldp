import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Paneset, Pane, TextField, MultiColumnList } from '@folio/stripes/components';
import { useLdp } from '../../LdpContext';
import templatedQueryName from '../../util/templatedQueryName';


function TemplatedQueries({ queries }) {
  const history = useHistory();
  const ldp = useLdp();
  const [sortedColumn, setSortedColumn] = useState('displayName');
  const [sortDirection, setSortDirection] = useState('ascending');
  const [filterString, setFilterString] = useState('');

  function navigateToQuery(q) {
    const qname = templatedQueryName(q);
    const existing = ldp.tqTabs.filter(tab => tab.name === qname);
    if (existing.length === 0) ldp.tqTabs.push({ ...q, name: qname, state: {} });
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

  queries.sort((a, b) => {
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

  const filteredQueries = queries.filter(q => {
    return (q.json?.displayName.toLowerCase().includes(filterString.toLowerCase()) ||
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
};


export default TemplatedQueries;
