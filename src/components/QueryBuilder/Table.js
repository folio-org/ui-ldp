import React, { useState, useEffect } from "react";
import { Field, FormSpy, useFormState } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import get from 'lodash.get';
import fetch from 'cross-fetch'
import { Button, MultiColumnList, Selection, Loading } from '@folio/stripes/components';

import css from './css/Table.css'
import Columns from "./Columns";

// TODO: ability to add and remove table joins
// <span onClick={onRemove} style={{ cursor: "pointer" }}>❌</span>

const WhenFieldChanges = ({ field, set, to }) => (
  <Field name={set} subscription={{}}>
    {(
      // No subscription. We only use Field to get to the change function
      { input: { onChange } }
    ) => (
      <FormSpy subscription={{}}>
        {({ form }) => (
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

const Results = ({ results, dirty }) => {
  const data = results.resp || [];
  return (
    <div style={{ flex: 1 }}>
      {(results.key && !dirty) ? <MultiColumnList key={results.key} contentData={data} virtualize autosize /> : <div/>}
    </div>
  )
}

const Table = ({
  table,
  tableIndex,
  tables,
  tablesAreLoading,
  okapi,
  queryResponse,
  onRemove,
  push,
  pop
}) => {
  const { values, dirtySinceLastSubmit } = useFormState();
  const [isLoadingColumns, setIsLoadingColumns] = useState(false);
  const selectedTableName = get(values, `${table}.tableName`)
  const [availableColumns, setAvailableColumns] = useState({ list: [], options: [] });
  
  const getColumns = async (selectedTableName) => {
    const url = `${okapi.url}/ldp/db/columns?table=${selectedTableName}`
    try {
      setIsLoadingColumns(true)
      const resp = await fetch(url, {
        headers: {
          'X-Okapi-Tenant': okapi.tenant,
          'X-Okapi-Token': okapi.token
        }
      });
      resp
        .json()
        .then(resp => {
          setIsLoadingColumns(false)
          setAvailableColumns({
            list: resp.map(c => c.columnName),
            options: resp.map(c => ({ value: c.columnName, label: c.columnName }))
          })
        })
        .catch(err => {
          // TODO: handle error
          setIsLoadingColumns(false)
          // console.error(err)
          // setErrors(`Failed connect to database`)
        })
    } catch (error) {
      // TODO: handle error
      setIsLoadingColumns(false)
      // setErrors(`Failed connecting to server ${url}`)
    }
  }
  useEffect(() => {
    if(selectedTableName) { getColumns(selectedTableName) }
  }, [selectedTableName]);

  const disabled = availableColumns.list == 0;

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
          placeholder='&nbsp;'
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
          <Button type='submit' buttonStyle='primary' disabled={disabled} >Submit</Button>
        </div>
      </div>

      <Results results={queryResponse} dirty={dirtySinceLastSubmit} />
    </div>
  );
};

export default Table;
