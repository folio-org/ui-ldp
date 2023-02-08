import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import localforage from 'localforage';
import { useNamespace, CalloutContext } from '@folio/stripes/core';
import { Paneset, Pane, MultiColumnList, IconButton, ConfirmationModal } from '@folio/stripes/components';


function ListSavedQueries({ queries, deleteQuery }) {
  const [queryToDelete, setQueryToDelete] = useState();
  const history = useHistory();
  const [, getNamespace] = useNamespace();
  const namespace = getNamespace({ key: 'formState' });
  const callout = useContext(CalloutContext);

  const selectQuery = async (_unusedEvent, item) => {
    await localforage.setItem(namespace, { META: item, tables: item.json.tables });
    history.push(`/ldp${item.autoRun ? '?execute' : ''}`);
  };

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
              name: item.displayName,
              b: chunks => <b>{chunks}</b>,
              code: chunks => <b>{chunks}</b>, // For old translations that still use <code>
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
          contentData={queries}
          visibleColumns={['displayName', 'autoRun', 'creator', 'created', 'updater', 'updated', 'comment', 'deleteQuery']}
          columnMapping={{
            displayName: <FormattedMessage id="ui-ldp.saved-queries.displayName" />,
            autoRun: <FormattedMessage id="ui-ldp.saved-queries.autoRun" />,
            creator: <FormattedMessage id="ui-ldp.saved-queries.creator" />,
            created: <FormattedMessage id="ui-ldp.saved-queries.created" />,
            updater: <FormattedMessage id="ui-ldp.saved-queries.updater" />,
            updated: <FormattedMessage id="ui-ldp.saved-queries.updated" />,
            comment: <FormattedMessage id="ui-ldp.saved-queries.comment" />,
            deleteQuery: '',
          }}
          columnWidths={{
            displayName: 300,
            autoRun: 90,
            creator: 120,
            created: 120,
            updater: 120,
            updated: 120,
            comment: 250
          }}
          formatter={{
            autoRun: r => (r.autoRun ? '✓' : ''),
            creator: r => <code>{r.creator}</code>,
            created: r => new Date(r.created).toLocaleString(),
            updater: r => <code>{r.updater}</code>,
            updated: r => new Date(r.updated).toLocaleString(),
            deleteQuery: r => <IconButton icon="trash" onClick={e => maybeDeleteQuery(e, r)} />
          }}
          onRowClick={selectQuery}
        />

        {queryToDelete !== undefined &&
          <ConfirmationModal
            open
            heading={<FormattedMessage id="ui-ldp.saved-queries.delete.deleteQuery" />}
            bodyTag="div"
            message={(
              <div style={{ textAlign: 'center' }}>
                <p>
                  <b>{queryToDelete.displayName}</b>
                </p>
                <p>
                  <FormattedMessage
                    id="ui-ldp.saved-queries.delete.createdBy"
                    values={{
                      creator: queryToDelete.creator,
                      created: new Date(queryToDelete.created).toLocaleString(),
                      code: chunks => <code>{chunks}</code>,
                    }}
                  />
                  <br />
                  <FormattedMessage
                    id="ui-ldp.saved-queries.delete.updatedBy"
                    values={{
                      updater: queryToDelete.creator,
                      updated: new Date(queryToDelete.updated).toLocaleString(),
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
  queries: PropTypes.arrayOf(
    PropTypes.shape({
    }).isRequired,
  ).isRequired,
  deleteQuery: PropTypes.func.isRequired,
};


export default ListSavedQueries;
