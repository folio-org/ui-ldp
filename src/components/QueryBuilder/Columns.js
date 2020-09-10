import React, { useState } from 'react';
import { Button, Selection, TextField, MultiSelection } from '@folio/stripes/components';
import { times } from './utils';

const SelectionAndTextField = ({ columns }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: 5 }}>
        <Selection
          name="SelectionField"
          placeholder=""
          dataOptions={columns}
        />
      </div>
      <div style={{ flex: 1, marginLeft: 5 }}>
        <TextField placeholder='Value' />
      </div>
    </div>
  )
}

const Columns = ({ columns }) => {
  const [numInputs, setNumInputs] = useState(1)
  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.5, marginBottom: '0.25rem' }}>Column</div>
      { times(numInputs, () => SelectionAndTextField({ columns })) }
      <Button onClick={() => { setNumInputs(numInputs+1) }}>Add Filter</Button>
    </div>
  )
}

export default Columns