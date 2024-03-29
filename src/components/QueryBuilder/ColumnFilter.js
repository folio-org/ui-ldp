import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { IconButton, Selection, Select, TextField } from '@folio/stripes/components';


const operations = ['=', '<>', '<', '<=', '>', '>='].map(op => ({ value: op, label: op }));


const ColumnFilter = ({ name, availableColumns, disabled, onRemove }) => {
  const intl = useIntl();

  return (
    <div id={name} key={name} style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: 5 }}>
        <Field
          name={`${name}.key`}
          data-cy={`${name}.key`}
          component={Selection}
          placeholder={intl.formatMessage({ id: 'ui-ldp.placeholder.column' })}
          dataOptions={availableColumns}
          disabled={disabled}
        />
      </div>
      <div style={{ flex: 1, marginLeft: 5 }}>
        <Field
          name={`${name}.op`}
          data-cy={`${name}.op`}
          component={Select}
          dataOptions={operations}
          disabled={disabled}
        />
      </div>
      <div style={{ flex: 1, marginLeft: 5 }}>
        <Field
          name={`${name}.value`}
          data-cy={`${name}.value`}
          component={TextField}
          placeholder={intl.formatMessage({ id: 'ui-ldp.placeholder.value' })}
          validateFields={[]}
          disabled={disabled}
        />
      </div>
      <IconButton
        icon="trash"
        onClick={onRemove}
        style={{ marginLeft: 5, alignItems: 'flex-start' }}
        disabled={disabled}
        data-cy={`${name}.remove`}
      />
    </div>
  );
};

ColumnFilter.propTypes = {
  name: PropTypes.string.isRequired,
  availableColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ColumnFilter;
