import React, { useState, useEffect } from "react";
import { Field, useFormState } from "react-final-form";
import get from 'lodash.get';
import { Button, MultiColumnList, Selection } from '@folio/stripes/components';

import css from './css/Table.css'
import Columns from "./Columns";

// TODO: ability to add and remove table joins
// <span onClick={onRemove} style={{ cursor: "pointer" }}>❌</span>

const Results = ({ results, dirty }) => {
  const data = results.resp || [];
  return (
    <div style={{ flex: 1 }}>
      {(results.key && !dirty) ? <MultiColumnList key={results.key} contentData={data} virtualize autosize /> : <div/>}
    </div>
  )
}

const Table = ({ table, tableIndex, tables, queryResponse, onRemove, push, pop }) => {
  const { values, dirtySinceLastSubmit } = useFormState();
  const selectedTableName = get(values, `${table}.tableName`)
  const [availableColumns, setAvailableColumns] = useState({ list: [], options: [] });
  
  const getColumns = async (selectedTableName) => {
    const { okapi } = process.env;
    const url = `${okapi.url}/ldp/db/columns?table=${selectedTableName}`
    try {
      const resp = await fetch(url, {
        headers: {
          'X-Okapi-Tenant': okapi.tenant,
          'X-Okapi-Token': okapi.token
        }
      });
      resp
        .json()
        .then(resp => {
          // setIsLoadingFields(false)
          setAvailableColumns({
            list: resp.map(c => c.columnName),
            options: resp.map(c => ({ value: c.columnName, label: c.columnName }))
          })
        })
        .catch(err => {
          // TODO: handle error
          // setLoading(false)
          // console.error(err)
          // setErrors(`Failed connect to database`)
        })
    } catch (error) {
      // TODO: handle error
      // setLoading(false)
      // setErrors(`Failed connecting to server ${url}`)
    }
  }
  useEffect(() => {
    if(selectedTableName) { getColumns(selectedTableName) }
  }, [selectedTableName]);

  const disabled = availableColumns.list == 0;

  return (
    <div className={css.Table}>

      <div className="query-input">
        <Field
          name={`${table}.tableName`}
          label="Table"
          component={Selection}
          placeholder=""
          dataOptions={tables}
        />
        <Columns
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
