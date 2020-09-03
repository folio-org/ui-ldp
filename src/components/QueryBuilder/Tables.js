import React, { useState } from 'react';
import { times } from './utils';
import Fields from './Fields';
import { Button, Selection, Icon } from '@folio/stripes/components';

const TableSelection = () => {
  const tableOptions = [
    { value: 'user_users', label: 'user_users' },
    { value: 'user_groups', label: 'user_groups' },
    { value: 'acquisitions_memberships', label: 'acquisitions_memberships' },
    { value: 'acquisitions_units', label: 'acquisitions_units' },
    { value: 'circulation_cancellation_reasons', label: 'circulation_cancellation_reasons' },
    { value: 'circulation_fixed_due_date_schedules', label: 'circulation_fixed_due_date_schedules' },
    { value: 'circulation_loan_history', label: 'circulation_loan_history' },
    { value: 'circulation_loan_policies', label: 'circulation_loan_policies' },
    { value: 'circulation_loans', label: 'circulation_loans' },
  ];
  return (
    <div>
      <Selection
        name="SelectionTable"
        label="Table"
        id="tableSelect"
        placeholder=""
        dataOptions={tableOptions}
      />
    </div>
  );
};

const SubmitRow = ({ displaySubmit, setSubmitted }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.2em',
    paddingTop: 14,
  }}>
    <Button>Show Columns...</Button>
    { displaySubmit? <Button buttonStyle='primary' onClick={() => setSubmitted(true)}>Submit</Button> : <div/> }
  </div>
)

const Table = (n, numTables, setSubmitted) => {
  const displaySubmit = n+1 == numTables // display Submit button if this is the last table
  const displayEditJoin = n != 0
  return (
    <div style={{ width: 400, padding: 15, paddingBottom: 4, borderRight: '1px solid rgba(0,0,0,.2)', borderBottom: '1px solid rgba(0,0,0,.2)' }}>
      <div style={{
        display: 'flex',
        // justifyContent: 'flex-end',
        background: '#eee',
        marginTop: -15,
        marginLeft: -15,
        marginRight: -15,
        marginBottom: 15,
        paddingTop: 10,
        paddingBottom: 10 }}>
          <Button style={{ marginBottom: 0, marginLeft: 15, visibility: displayEditJoin ? 'visible' : 'hidden' }}>Edit Join...</Button>
          {/* <Button buttonStyle='none' style={{ color: '#888', marginBottom: 0 }}>
            <Icon icon='times' />
          </Button> */}
      </div>
      <TableSelection />
      <Fields />
      <SubmitRow displaySubmit={displaySubmit} setSubmitted={setSubmitted} />
    </div>
  )
}

const Tables = ({ numTables, setSubmitted }) => {
  return (
    <div style={{ display: 'flex' }}>
      { times(numTables, n => Table(n, numTables, setSubmitted)) }
    </div>
  )
}

export default Tables