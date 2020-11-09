import React from "react";
import { Field } from "react-final-form";
import { Selection, TextField } from "@folio/stripes/components";

// TODO: ability to remove filters
// <span onClick={onRemove} style={{ cursor: "pointer" }}>❌</span>

const ColumnFilter = ({ name, index, availableColumns, disabled, onRemove }) => {
  return (
  <div key={name} style={{ display: 'flex' }}>
    <div style={{ flex: 1, marginRight: 5 }}>
        <Field
          name={`${name}.key`}
          component={Selection}
          placeholder={<span style={{ color: 'transparent' }}>-</span> /* Workaround for Safari sizing bug */}
          dataOptions={availableColumns}
          disabled={disabled}
        />
    </div>
    <div style={{ flex: 1, marginLeft: 5 }}>
      <Field
        name={`${name}.value`}
        component={TextField}
        placeholder="Value"
        validateFields={[]}
        disabled={disabled}
      />
    </div>
  </div>
)};

export default ColumnFilter;
