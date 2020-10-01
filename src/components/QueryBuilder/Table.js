import React, { useState, useEffect } from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Button, Selection } from '@folio/stripes/components';

import ColumnFilter from "./ColumnFilter";
import css from './css/Table.css'
import Columns from "./Columns";

// TODO: ability to add and remove table joins
// <span onClick={onRemove} style={{ cursor: "pointer" }}>❌</span>

// TODO: ability to remove column filter
// <button type="button" onClick={() => pop(`${table}.columns`)}>Remove Column</button>

const Table = ({ table, tableIndex, tables, onRemove, push, pop }) => {
  return (
    <div className={css.Table}>
      
      <Field
        name={`${table}.tableName`}
        label="Table"
        component={Selection}
        placeholder=""
        dataOptions={tables}
      />
      
      <Columns table={table} tableIndex={tableIndex} />
      
      <div className={css.SubmitRow}>
        <Button disabled >Show Columns...</Button>
        <Button buttonStyle='primary'>Submit</Button>
      </div>
    </div>
  );
};

export default Table;
