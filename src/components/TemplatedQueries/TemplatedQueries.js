import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Paneset, Pane, MultiColumnList } from '@folio/stripes/components';
import { useLdp } from '../../LdpContext';
import templatedQueryName from '../../util/templatedQueryName';


function TemplatedQueries({ queries }) {
  const history = useHistory();
  const ldp = useLdp();

  function navigateToQuery(q) {
    const qname = templatedQueryName(q);
    const existing = ldp.tqTabs.filter(tab => tab.name === qname);
    if (existing.length === 0) ldp.tqTabs.push({ ...q, name: qname, state: {} });
    history.push(`/ldp/tq/${qname}`);
  }

  return (
    <Paneset>
      <Pane defaultWidth="fill" paneTitle={<FormattedMessage id="ui-ldp.templated-queries.select" />}>
        <MultiColumnList
          contentData={queries}
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
