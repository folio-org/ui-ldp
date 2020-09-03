import React, { useState } from 'react';
import Tables from '../components/QueryBuilder/Tables';
import { Button, MultiColumnList } from '@folio/stripes/components';
import { times } from '../components/QueryBuilder/utils';

const SubmitRow = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '1.2em',
    borderTop: '1px solid rgba(0,0,0,.2)',
    borderBottom: '1px solid rgba(0,0,0,.2)',
    borderRight: '1px solid rgba(0,0,0,.2)',
    paddingTop: 14,
    paddingRight: 15
  }}>
    <Button buttonStyle='primary'>Submit</Button>
  </div>
)
const mockData1 = [
  {id:'011dc2', active: 'TRUE', username:'johnw8', type: 'patron'},
  {id:'ae91b7', active: 'FALSE', username:'johnson', type: 'patron'},
]
const mockData2 = [
  {id:'b6d44', desc: 'Faculty Member', group:'faculty'},
  {id:'e6847', desc: 'Faculty Member', group:'faculty'},
]
const ResultsRow = ({ numTables, submitted }) => {
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      { times(numTables, (n) => (
        <div style={{ width: 400, paddingTop: 10, borderRight: '1px solid rgba(0,0,0,.2)' }}>
          {submitted ? (
            <div style={{ marginLeft: -5, marginRight: -5 }}>
              <MultiColumnList contentData={n == 0? mockData1 : mockData2} />
            </div>
          ) : <div/>}
        </div>
      ) ) }
    </div>
  )
}

const QueryBuilderPage = () => {
  const [numTables, setNumTables] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  return (
    <div style={{ position: 'relative', display: 'flex', height: '100%', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Tables numTables={numTables} setSubmitted={setSubmitted} />
        {/* <SubmitRow /> */}
        <ResultsRow numTables={numTables} submitted={submitted} />
      </div>
      <div style={{ padding: 10, borderTop: '1px solid rgba(0,0,0,.2)' }}>
        <Button onClick={() => { setNumTables(numTables+1) }}>Add Join Table</Button>
      </div>
    </div>
  );
}

export default QueryBuilderPage
