import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { IconButton, Selection, Select } from '@folio/stripes/components';

const OrderingCriterion = ({ name, availableColumns, disabled, onRemove }) => {
  return (
    <div key={name} style={{ display: 'flex' }}>
      <div style={{ flex: 3, marginRight: 5 }}>
        <Field
          name={`${name}.key`}
          component={Selection}
          dataOptions={availableColumns}
          disabled={disabled}
        />
      </div>
      <div style={{ flex: 2, marginLeft: 5, marginRight: 5 }}>
        <Field
          name={`${name}.direction`}
          component={Select}
          dataOptions={[
            { value: 'asc', label: 'XXX Ascending' },
            { value: 'desc', label: 'XXX Descending' },
          ]}
          defaultValue="asc"
          disabled={disabled}
        />
      </div>
      <div style={{ flex: 2, marginLeft: 5 }}>
        <Field
          name={`${name}.nulls`}
          component={Select}
          dataOptions={[
            { value: 'start', label: 'XXX At start' },
            { value: 'end', label: 'XXX At end' },
          ]}
          defaultValue="end"
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

OrderingCriterion.propTypes = {
  name: PropTypes.string.isRequired,
  availableColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default OrderingCriterion;
