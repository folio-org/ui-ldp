import React from "react";
import { Field } from "react-final-form";
import { Selection, TextField } from "@folio/stripes/components";

// TODO: ability to remove filters
// <span onClick={onRemove} style={{ cursor: "pointer" }}>❌</span>

const ColumnFilter = ({ name, index, availableColumns, onRemove }) => (
  <div key={name} style={{ display: 'flex' }}>
    <div style={{ flex: 1, marginRight: 5 }}>
        <Field
          name={`${name}.key`}
          component={Selection}
          placeholder=""
          dataOptions={availableColumns}
        />
    </div>
    <div style={{ flex: 1, marginLeft: 5 }}>
      <Field
        name={`${name}.value`}
        component={TextField}
        placeholder="Value"
        validateFields={[]}
      />
    </div>
  </div>
);

export default ColumnFilter;
