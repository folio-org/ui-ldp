import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import localforage from 'localforage';
import { useNamespace, CalloutContext } from '@folio/stripes/core';
import { LoadingPane, Paneset, Pane, MultiColumnList, IconButton, ConfirmationModal } from '@folio/stripes/components';


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
function ListSavedQueries({ config, queries, deleteQuery }) {
  const [processed, setProcessed] = useState();
  const [queryToDelete, setQueryToDelete] = useState();
  const history = useHistory();
  const [, getNamespace] = useNamespace();
  const namespace = getNamespace({ key: 'formState' });
  const callout = useContext(CalloutContext);

  useEffect(() => {
    setProcessed(processQueries(queries));
  }, [queries]);

  if (!processed) return <LoadingPane />;

  const contentData = processed.map(obj => ({
    ...obj.json.META,
    name: obj.name,
    json: obj.json,
    sha: obj.sha,
  }));

  function executeQuery(_unusedEvent, item) {
    localforage.setItem(namespace, { tables: item.json.tables })
      .then(() => history.push('/ldp'));
  }

  function maybeDeleteQuery(e, item) {
    e.stopPropagation();
    setQueryToDelete(item);
  }

  function actuallyDeleteQuery(item) {
    deleteQuery(item).then(() => {
      setQueryToDelete(undefined);
      callout.sendCallout({
        message: (
          <FormattedMessage
            id="ui-ldp.saved-queries.delete.deleted"
            values={{
              name: item.name,
              code: chunks => <code>{chunks}</code>,
            }}
          />
        ),
      });
    });
  }

  return (
    <Paneset>
      <Pane defaultWidth="fill">
        <MultiColumnList
          contentData={contentData}
          visibleColumns={['name', 'displayName', 'autoRun', 'creator', 'created', 'comment', 'deleteQuery']}
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
            deleteQuery: r => <IconButton icon="trash" onClick={e => maybeDeleteQuery(e, r)} />
          }}
          onRowClick={executeQuery}
        />

        {queryToDelete !== undefined &&
          <ConfirmationModal
            open
            heading={<FormattedMessage id="ui-ldp.saved-queries.delete.deleteQuery" />}
            bodyTag="div"
            message={(
              <div style={{ textAlign: 'center' }}>
                <p>
                  {queryToDelete.displayName}
                  {' '}
                  (<code>{queryToDelete.name}</code>)
                </p>
                <p>
                  <FormattedMessage
                    id="ui-ldp.saved-queries.delete.createdBy"
                    values={{
                      creator: queryToDelete.creator,
                      code: chunks => <code>{chunks}</code>,
                    }}
                  />
                </p>
              </div>
            )}
            confirmLabel={<FormattedMessage id="ui-ldp.saved-queries.delete.confirm" />}
            onConfirm={() => actuallyDeleteQuery(queryToDelete)}
            onCancel={() => setQueryToDelete(undefined)}
          />
        }
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
    })
  ).isRequired,
  deleteQuery: PropTypes.func.isRequired,
};


export default ListSavedQueries;
