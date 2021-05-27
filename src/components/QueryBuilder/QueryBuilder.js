import React from 'react';
import P from 'prop-types';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { Pane, Paneset } from '@folio/stripes/components';
import QuerySingleTable from './QuerySingleTable';
import ResultsList from './ResultsList';


function QueryBuilder({ ldp, initialState, tables, onSubmit, queryResponse }) {
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
                      {({ fields }) => fields.map((table, tableIndex) => (
                        <Pane id={`table${tableIndex}`} defaultWidth="50%" key={table}>
                          <QuerySingleTable
                            table={table}
                            tableIndex={tableIndex}
                            tables={tables}
                            queryResponse={queryResponse}
                            tablesAreLoading={false}
                            onRemove={() => fields.remove(tableIndex)}
                            push={push}
                            pop={pop}
                          />
                        </Pane>
                      ))}
                    </FieldArray>
                    <Pane id="debug" defaultWidth="fill">
                      {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                      {/* <Button onClick={() => { setNumTables(numTables+1) }}>Add Join Table</Button> */}
                      LDP: <pre>{JSON.stringify(ldp, null, 2)}</pre>
                    </Pane>
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
