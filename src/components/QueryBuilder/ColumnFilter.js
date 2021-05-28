import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { IconButton, Selection, TextField } from '@folio/stripes/components';

const ColumnFilter = ({ name, availableColumns, disabled, onRemove }) => {
  return (
    <div key={name} style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: 5 }}>
        <Field
          name={`${name}.key`}
          component={Selection}
          placeholder="&nbsp;"
          dataOptions={availableColumns}
          disabled={disabled}
        />
      </div>
      =
      <div style={{ flex: 1, marginLeft: 5 }}>
        <Field
          name={`${name}.value`}
          component={TextField}
          placeholder="Value"
          validateFields={[]}
          disabled={disabled}
        />
      </div>
      <IconButton
        icon="trash"
        onClick={onRemove}
        style={{ marginLeft: 5, alignItems: 'flex-start' }}
        disabled={disabled}
      />
    </div>
  );
};

ColumnFilter.propTypes = {
  name: PropTypes.string,
  availableColumns: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
  onRemove: PropTypes.func,
};

export default ColumnFilter;
