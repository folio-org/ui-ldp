import isEqual from 'lodash/isEqual';
import React, { useState } from 'react';
import P from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { useStripes } from '@folio/stripes/core';
import { Pane, Paneset } from '@folio/stripes/components';
import QuerySingleTable from './QuerySingleTable';
import ResultsList from './ResultsList';
import loadResults from '../../util/loadResults';


let _savedValues; // Private to stateMayHaveChanged
function stateMayHaveChanged(stateHasChanged, values) {
  if (!isEqual(values, _savedValues)) {
    stateHasChanged(values);
    _savedValues = values;
  }
}


function QueryBuilder({ ldp, initialState, stateHasChanged, tables, setError }) {
  const intl = useIntl();
  const stripes = useStripes();
  const [queryResponse, setQueryResponse] = useState({ key: null, resp: [] });
  const showDevInfo = stripes.config?.showDevInfo;
  const onSubmit = values => loadResults(intl, stripes, values, setQueryResponse, setError);

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
          stateMayHaveChanged(stateHasChanged, getState().values);
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
                          paneTitle={<FormattedMessage id="ui-ldp.nav.query-builder" />}
                        >
                          <QuerySingleTable
                            namePrefix={namePrefix}
                            tableIndex={tableIndex}
                            tables={tables}
                            queryResponse={queryResponse}
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
                    <ResultsList results={queryResponse} />
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      />
    </Paneset>
  );
}


QueryBuilder.propTypes = {
  ldp: P.shape({}).isRequired,
  initialState: P.object.isRequired,
  stateHasChanged: P.func.isRequired,
  tables: P.objectOf(
    P.arrayOf(
      P.shape({
        value: P.string.isRequired,
        label: P.string.isRequired,
      }).isRequired,
    ).isRequired
  ).isRequired,
  setError: P.func.isRequired,
};


export default QueryBuilder;
