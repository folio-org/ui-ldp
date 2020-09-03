import React, { useState } from 'react';
import { Button, Selection, TextField, MultiSelection } from '@folio/stripes/components';
import { times } from './utils';

const SelectionAndTextField = ({ availableFields }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: 5 }}>
        <Selection
          name="SelectionField"
          id="fieldSelect"
          placeholder=""
          dataOptions={availableFields}
        />
      </div>
      <div style={{ flex: 1, marginLeft: 5 }}>
        <TextField placeholder='Value' />
      </div>
    </div>
  )
}

const Fields = () => {
  const [availableFields, setAvailableFields] = useState([
    { value: 'username', label: 'username' },
    { value: 'group', label: 'group' },
    { value: 'acquisitions_memberships', label: 'acquisitions_memberships' },
    { value: 'acquisitions_units', label: 'acquisitions_units' },
    { value: 'circulation_cancellation_reasons', label: 'circulation_cancellation_reasons' },
    { value: 'circulation_fixed_due_date_schedules', label: 'circulation_fixed_due_date_schedules' },
    { value: 'circulation_loan_history', label: 'circulation_loan_history' },
    { value: 'circulation_loan_policies', label: 'circulation_loan_policies' },
    { value: 'circulation_loans', label: 'circulation_loans' },
  ])
  const [numInputs, setNumInputs] = useState(1)
  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.5, marginBottom: '0.25rem' }}>Column</div>
      { times(numInputs, () => SelectionAndTextField({ availableFields })) }
      <Button onClick={() => { setNumInputs(numInputs+1) }}>Add Filter</Button>
    </div>
  )
}

export default Fields