import React from 'react';
import P from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { useStripes } from '@folio/stripes/core';
import { Pane, Paneset } from '@folio/stripes/components';
import QuerySingleTable from './QuerySingleTable';
import ResultsList from './ResultsList';

function QueryBuilder({ ldp, initialState, tables, onSubmit, queryResponse }) {
  const stripes = useStripes();
  const showDevInfo = stripes.config?.showDevInfo;

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
            mutators: { push, pop }
          }
        }) => {
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
                        <Pane id={`table${tableIndex}`} defaultWidth="50%" key={namePrefix}>
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
  tables: P.objectOf(
    P.arrayOf(
      P.shape({
        value: P.string.isRequired,
        label: P.string.isRequired,
      }).isRequired,
    ).isRequired
  ).isRequired,
  onSubmit: P.func.isRequired,
  queryResponse: P.shape({
    key: P.string,
    resp: P.arrayOf(
      P.object.isRequired,
    ).isRequired,
  }).isRequired,
};


export default QueryBuilder;
