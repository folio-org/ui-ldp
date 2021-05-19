import React from 'react';
import P from 'prop-types';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { Loading, Pane, Paneset } from '@folio/stripes/components';
import Table from './Table';
import BigError from './BigError';


function QueryBuilder({ okapi, ldp, isLoading, initialState, tables, onSubmit, queryResponse, error }) {
  return (
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
          <Paneset>
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
              <FieldArray name="tables">
                {({ fields }) => fields.map((table, tableIndex) => (
                  <Pane id={`table${tableIndex}`} defaultWidth="50%" key={table}>
                    {isLoading ? <div style={{ textAlign: 'center', margin: 20 }}><Loading size="xlarge" /></div> : (error ? <BigError message={error} /> :
                    <Table
                      table={table}
                      tableIndex={tableIndex}
                      tables={tables}
                      queryResponse={queryResponse}
                      tablesAreLoading={isLoading}
                      okapi={okapi}
                      onRemove={() => fields.remove(tableIndex)}
                      push={push}
                      pop={pop}
                    />)}
                  </Pane>
                ))}
              </FieldArray>
              <Pane id="debug" defaultWidth="fill">
                {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                {/* <Button onClick={() => { setNumTables(numTables+1) }}>Add Join Table</Button> */}
                LDP: <code>{JSON.stringify(ldp, null, 2)}</code>
              </Pane>
            </form>
          </Paneset>
        );
      }}
    />
  );
}


QueryBuilder.propTypes = {
  okapi: P.object.isRequired,
  ldp: P.shape({}).isRequired,
  isLoading: P.bool.isRequired,
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
  error: P.oneOfType([
    P.bool,
    P.string
  ]).isRequired,
};


export default QueryBuilder;
