import isEqual from 'lodash/isEqual';
import React, { useState } from 'react';
import P from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { useStripes } from '@folio/stripes/core';
import { Pane, Paneset, IconButton, ConfirmationModal } from '@folio/stripes/components';
import QuerySingleTable from './QuerySingleTable';
import ResultsList from './ResultsList';
import loadResults from '../../util/loadResults';
import SaveQueryModal from './SaveQueryModal';


let _savedValues; // Private to stateMayHaveChanged
function stateMayHaveChanged(stateHasChanged, values) {
  if (!isEqual(values, _savedValues)) {
    stateHasChanged(values);
    _savedValues = values;
  }
}


// It can happen that the schema names that were stored as parts of
// the form state in the previous session refer to schemas that are no
// longer available in the underlying database (UILDP-48). When this
// happens, we change them to refer to the first legitimate schema.
//
function ensureSchemasAreAvailable(initialState, schemaNames) {
  initialState.tables.forEach(t => {
    if (!schemaNames.includes(t.schema)) {
      t.schema = schemaNames[0];
    }
  });
}


function QueryBuilder({ ldp, initialState, stateHasChanged, metadataHasChanged, onClear, tables, setError, execute }) {
  const intl = useIntl();
  const stripes = useStripes();
  const [queryResponse, setQueryResponse] = useState();
  const [showNewModal, setShowNewModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [alreadyExecuted, setAlreadyExecuted] = useState(false);
  const showDevInfo = stripes.config?.showDevInfo;
  const onSubmit = values => loadResults(intl, stripes, values, setQueryResponse, setError);
  const searchWithoutLimit = setResponse => loadResults(intl, stripes, _savedValues, setResponse, setError, ldp.maxExport);

  ensureSchemasAreAvailable(initialState, Object.keys(tables));
  if (execute && !alreadyExecuted) {
    setAlreadyExecuted(true);
    onSubmit(initialState);
  }

  const newQuery = async () => {
    onClear();
    setShowNewModal(false);
  };

  const copyQuery = async () => {
    const newState = {
      ...initialState,
      META: { ...initialState.META },
    };
    delete newState.META.id;
    newState.META.displayName = intl.formatMessage(
      { id: 'ui-ldp.copy-of' },
      { string: newState.META.displayName }
    );

    metadataHasChanged(newState);
    setShowCopyModal(false);
  };

  return (
    <Paneset>
      <FinalForm
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators
        }}
        initialValues={initialState}
        render={({
          handleSubmit,
          form: {
            getState,
            mutators: { push, pop }
          }
        }) => {
          const queryFormValues = getState().values;
          // console.log('QueryBuilder: queryFormValues =', queryFormValues);
          stateMayHaveChanged(stateHasChanged, queryFormValues);
          return (
            <form
              id="form-querybuilder"
              onSubmit={handleSubmit}
              data-test-query-builder
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ height: 'auto' }}>
                  <Paneset nested static>
                    <FieldArray name="tables">
                      {({ fields }) => fields.map((namePrefix, tableIndex) => (
                        <Pane
                          id={`table${tableIndex}`}
                          defaultWidth="50%"
                          key={namePrefix}
                          paneTitle={queryFormValues.META?.displayName}
                          lastMenu={
                            <>
                              <IconButton
                                icon="document"
                                aria-label={intl.formatMessage({ id: 'ui-ldp.button.new-query' })}
                                onClick={() => setShowNewModal(true)}
                                data-cy={`${namePrefix}.newQuery`}
                              />
                              <IconButton
                                icon="save"
                                aria-label={intl.formatMessage({ id: 'ui-ldp.button.save-query' })}
                                onClick={() => setShowSaveModal(true)}
                                data-cy={`${namePrefix}.saveQuery`}
                              />
                              <IconButton
                                icon="duplicate"
                                aria-label={intl.formatMessage({ id: 'ui-ldp.button.copy-query' })}
                                onClick={() => setShowCopyModal(true)}
                                data-cy={`${namePrefix}.copyQuery`}
                              />
                            </>
                          }
                        >
                          <QuerySingleTable
                            namePrefix={namePrefix}
                            tableIndex={tableIndex}
                            tables={tables}
                            onRemove={() => fields.remove(tableIndex)}
                            push={push}
                            pop={pop}
                          />
                        </Pane>
                      ))}
                    </FieldArray>
                    {showDevInfo &&
                      <Pane id="debug" defaultWidth="fill">
                        {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                        {/* <Button onClick={() => { setNumTables(numTables+1) }}><FormattedMessage id="ui-ldp.button.add-join-table" /></Button> */}
                        <h2><FormattedMessage id="ui-ldp.heading.current-settings" /></h2>
                        <pre>{JSON.stringify(ldp, null, 2)}</pre>
                      </Pane>
                    }
                  </Paneset>
                </div>
                <div style={{ height: '100%' }}>
                  <div style={{ height: '100%' }}>
                    <ResultsList results={queryResponse} searchWithoutLimit={searchWithoutLimit} />
                  </div>
                </div>
              </div>
              <ConfirmationModal
                open={showNewModal}
                heading={<FormattedMessage id="ui-ldp.button.new-query" />}
                message={<FormattedMessage id="ui-ldp.desc.new-query" />}
                confirmLabel={<FormattedMessage id="ui-ldp.button.new-query" />}
                onConfirm={newQuery}
                onCancel={() => setShowNewModal(false)}
              />
              {
                showSaveModal &&
                  <SaveQueryModal
                    onClose={() => setShowSaveModal(false)}
                    queryFormValues={queryFormValues}
                    metadataHasChanged={metadataHasChanged}
                  />
              }
              <ConfirmationModal
                open={showCopyModal}
                heading={<FormattedMessage id="ui-ldp.button.copy-query" />}
                message={<FormattedMessage id="ui-ldp.desc.copy-query" />}
                confirmLabel={<FormattedMessage id="ui-ldp.button.copy-query" />}
                onConfirm={copyQuery}
                onCancel={() => setShowCopyModal(false)}
              />
            </form>
          );
        }}
      />
    </Paneset>
  );
}


QueryBuilder.propTypes = {
  ldp: P.shape({
    maxExport: P.number.isRequired,
  }).isRequired,
  initialState: P.object.isRequired,
  stateHasChanged: P.func.isRequired,
  metadataHasChanged: P.func.isRequired,
  tables: P.objectOf(
    P.arrayOf(
      P.shape({
        value: P.string.isRequired,
        label: P.string.isRequired,
      }).isRequired,
    ).isRequired
  ).isRequired,
  setError: P.func.isRequired,
  onClear: P.func.isRequired,
  execute: P.bool.isRequired,
};


export default QueryBuilder;
