import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paneset, Pane, MultiColumnList, NoValue } from '@folio/stripes/components';

function TemplatedQueries({ queries }) {
  const [query, setQuery] = useState();

  return (
    <Paneset>
      <Pane defaultWidth="fill" paneTitle="Select templated query">
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
            repo: r => `${r.config.user}/${r.config.repo}`,
          }}
          onRowClick={(_, q) => setQuery(q)}
        />
      </Pane>
      {query &&
        <Pane defaultWidth="50%" paneTitle="Fill in query parameters">
          <NoValue />
          <pre>{JSON.stringify(query, null, 2)}</pre>
        </Pane>
      }
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
