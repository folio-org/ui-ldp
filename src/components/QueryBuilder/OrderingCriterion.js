import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { IconButton, Selection, Select } from '@folio/stripes/components';

const OrderingCriterion = ({ name, availableColumns, disabled, onRemove }) => {
  const intl = useIntl();

  return (
    <div key={name} style={{ display: 'flex' }}>
      <div style={{ flex: 3, marginRight: 5 }}>
        <Field
          name={`${name}.key`}
          component={Selection}
          placeholder={intl.formatMessage({ id: 'ui-ldp.placeholder.column' })}
          dataOptions={availableColumns}
          disabled={disabled}
        />
      </div>
      <div style={{ flex: 2, marginLeft: 5, marginRight: 5 }}>
        <Field
          name={`${name}.direction`}
          aria-label={intl.formatMessage({ id: 'ui-ldp.direction' })}
          component={Select}
          dataOptions={[
            { value: 'asc', label: intl.formatMessage({ id: 'ui-ldp.direction.asc' }) },
            { value: 'desc', label: intl.formatMessage({ id: 'ui-ldp.direction.desc' }) },
          ]}
          defaultValue="asc"
          disabled={disabled}
        />
      </div>
      <div style={{ flex: 2, marginLeft: 5 }}>
        <Field
          name={`${name}.nulls`}
          component={Select}
          aria-label={intl.formatMessage({ id: 'ui-ldp.nulls' })}
          dataOptions={[
            { value: 'start', label: intl.formatMessage({ id: 'ui-ldp.nulls.start' }) },
            { value: 'end', label: intl.formatMessage({ id: 'ui-ldp.nulls.end' }) },
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
