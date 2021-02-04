import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, FormSpy, useFormState } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import get from 'lodash.get';
import fetch from 'cross-fetch';
import { Button, MultiColumnList, Selection } from '@folio/stripes/components';

import css from './css/Table.css';
import Columns from './Columns';

// TODO: ability to add and remove table joins
// <span onClick={onRemove} style={{ cursor: "pointer" }}>❌</span>

const WhenFieldChanges = ({ field, set, to }) => (
  <Field name={set} subscription={{}}>
    {(
      // No subscription. We only use Field to get to the change function
      { input: { onChange } }
    ) => (
      <FormSpy subscription={{}}>
        {() => (
          <OnChange name={field}>
            {(value, previous) => {
              if (value !== previous) {
                onChange(to);
              }
            }}
          </OnChange>
        )}
      </FormSpy>
    )}
  </Field>
);

WhenFieldChanges.propTypes = {
  field: PropTypes.string,
  set: PropTypes.string,
  to: PropTypes.string,
};

const Results = ({ results, dirty }) => {
  const data = results.resp || [];
  return (
    <div style={{ flex: 1 }}>
      {(results.key && !dirty) ? <MultiColumnList key={results.key} contentData={data} virtualize autosize /> : <div />}
    </div>
  );
};
Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  dirty: PropTypes.bool,
};

const Table = ({
  table,
  tableIndex,
  tables,
  tablesAreLoading,
  okapi,
  queryResponse,
  // onRemove,
  push,
  pop
}) => {
  const { values, dirtySinceLastSubmit } = useFormState();
  // const [isLoadingColumns, setIsLoadingColumns] = useState(false);
  const selectedTableName = get(values, `${table}.tableName`);
  const [availableColumns, setAvailableColumns] = useState({ list: [], options: [] });

  useEffect(() => {
    const getColumns = async (tableName) => {
      const url = `${okapi.url}/ldp/db/columns?table=${tableName}`;
      try {
        // setIsLoadingColumns(true);
        const resp = await fetch(url, {
          headers: {
            'X-Okapi-Tenant': okapi.tenant,
            'X-Okapi-Token': okapi.token
          }
        });
        resp
          .json()
          .then(jsonResp => {
            // setIsLoadingColumns(false);
            setAvailableColumns({
              list: jsonResp.map(c => c.columnName),
              options: jsonResp.map(c => ({ value: c.columnName, label: c.columnName }))
            });
          })
          .catch(() => {
            // TODO: handle error
            // setIsLoadingColumns(false);
            // console.error(err)
            // setErrors(`Failed connect to database`)
          });
      } catch (error) {
        // TODO: handle error
        // setIsLoadingColumns(false);
        // setErrors(`Failed connecting to server ${url}`)
      }
    };
    if (selectedTableName) { getColumns(selectedTableName); }
  }, [okapi, selectedTableName]);

  const disabled = availableColumns.list === 0;

  return (
    <div className={css.Table} data-test-table>
      <div className="query-input">
        <Field
          name={`${table}.tableName`}
          label={(
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: 7 }}>Table</span>
            </div>
          )}
          component={Selection}
          placeholder="&nbsp;"
          dataOptions={tables}
          disabled={tablesAreLoading}
        />
        <WhenFieldChanges
          field={`${table}.tableName`}
          set={`${table}.columnFilters`}
          to={[{}]}
        />
        <WhenFieldChanges
          field={`${table}.tableName`}
          set={`${table}.showColumns`}
          to={[]}
        />
        <Columns
          selectedTableName={selectedTableName}
          availableColumns={availableColumns}
          disabled={disabled}
          table={table}
          tableIndex={tableIndex}
          push={push}
          pop={pop}
        />
        <div className={css.SubmitRow}>
          {/* <Button disabled >Show Columns...</Button> */}
          <Button type="submit" buttonStyle="primary" disabled={disabled}>Submit</Button>
        </div>
      </div>

      <Results results={queryResponse} dirty={dirtySinceLastSubmit} />
    </div>
  );
};

Table.propTypes = {
  table: PropTypes.string,
  tableIndex: PropTypes.number,
  tables: PropTypes.arrayOf(PropTypes.object),
  tablesAreLoading: PropTypes.bool,
  okapi: PropTypes.shape({
    url: PropTypes.string,
    tenant: PropTypes.string,
    token: PropTypes.string,
  }),
  queryResponse: PropTypes.object,
  push: PropTypes.func,
  pop: PropTypes.func,
};

export default Table;
