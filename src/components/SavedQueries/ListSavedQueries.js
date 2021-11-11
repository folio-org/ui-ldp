import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import localforage from 'localforage';
import { useNamespace } from '@folio/stripes/core';
import { LoadingPane, Paneset, Pane, MultiColumnList, IconButton } from '@folio/stripes/components';


function processQueries(queries) {
  return Object.keys(queries).sort().map(key => {
    const obj = queries[key];
    if (obj.encoding !== 'base64') {
      throw new Error(`Unsupported GitHub content encoding ${obj.encoding}`);
    }

    const decoded = atob(obj.content);
    const json = JSON.parse(decoded);
    return {
      ...obj,
      decoded,
      json,
    };
  });
}


// eslint-disable-next-line no-unused-vars
function ListSavedQueries({ config, queries }) {
  const [processed, setProcessed] = useState();
  const history = useHistory();
  const [, getNamespace] = useNamespace();
  const namespace = getNamespace({ key: 'formState' });

  useEffect(() => {
    setProcessed(processQueries(queries));
  }, [queries]);

  if (!processed) return <LoadingPane />;

  const contentData = processed.map(obj => ({
    ...obj.json.META,
    name: obj.name,
    json: obj.json,
  }));

  function executeQuery(_unusedEvent, item) {
    localforage.setItem(namespace, { tables: item.json.tables })
      .then(() => history.push('/ldp'));
  }

  return (
    <Paneset>
      <Pane defaultWidth="fill">
        <MultiColumnList
          contentData={contentData}
          visibleColumns={['name', 'displayName', 'autoRun', 'creator', 'created', /* 'updated', */ 'comment']}
          columnMapping={{
            name: <FormattedMessage id="ui-ldp.saved-queries.name" />,
            displayName: <FormattedMessage id="ui-ldp.saved-queries.displayName" />,
            autoRun: <FormattedMessage id="ui-ldp.saved-queries.autoRun" />,
            creator: <FormattedMessage id="ui-ldp.saved-queries.creator" />,
            created: <FormattedMessage id="ui-ldp.saved-queries.created" />,
            comment: <FormattedMessage id="ui-ldp.saved-queries.comment" />,
            deleteQuery: '',
          }}
          columnWidths={{
            name: 150,
            displayName: 300,
            autoRun: 90,
            creator: 120,
            created: 120,
            comment: 250
          }}
          formatter={{
            name: r => <code>{r.name.replace('.json', '')}</code>,
            creator: r => <code>{r.creator}</code>,
            created: r => new Date(r.created).toLocaleString(),
            deleteQuery: () => <IconButton icon="trash" onClick={() => undefined} />
          }}
          onRowClick={executeQuery}
        />
      </Pane>
    </Paneset>
  );
}


ListSavedQueries.propTypes = {
  config: PropTypes.shape({
    owner: PropTypes.string,
    repo: PropTypes.string,
    branch: PropTypes.string,
  }).isRequired,
  queries: PropTypes.objectOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      encoding: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired, // XXX hopefully to use for deletion
    })
  ).isRequired,
};


export default ListSavedQueries;
