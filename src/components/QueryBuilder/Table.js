import React from "react";
import { Field } from "react-final-form";
import { Button, MultiColumnList, MultiSelection, Selection } from '@folio/stripes/components';

import css from './css/Table.css'
import Columns from "./Columns";
import get from "lodash.get";

// TODO: ability to add and remove table joins
// <span onClick={onRemove} style={{ cursor: "pointer" }}>❌</span>

const Results = ({ results, tableIndex }) => {
  const data = results || [];
  return (
    <div style={{ flex: 1 }}>
      {results? <MultiColumnList contentData={data} virtualize autosize /> : <div/>}
    </div>
  )
}

const Table = ({ table, tableIndex, tables, queryResponse, onRemove, push, pop }) => {
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
        <Columns table={table} tableIndex={tableIndex} push={push} pop={pop} />
        <div className={css.SubmitRow}>
          {/* <Button disabled >Show Columns...</Button> */}
          <Button type='submit' buttonStyle='primary'>Submit</Button>
        </div>
      </div>

      <Results results={queryResponse} tableIndex={tableIndex} />
    </div>
  );
};

export default Table;
