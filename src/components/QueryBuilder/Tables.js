import React, { useState, useEffect } from 'react';
import { times } from './utils';
import Columns from './Columns';
import { Button, Selection, Icon } from '@folio/stripes/components';

const TableSelection = ({ tables, setSelectedTableName, setIsLoadingFields }) => {
  const tableOptions = tables.map(t => ({ value: t.tableName, label: t.tableName }));
  return (
    <div>
      <Selection
        name="SelectionTable"
        label="Table"
        id="tableSelect"
        placeholder=""
        onChange={value => {
          setSelectedTableName(value);
          setIsLoadingFields(true);
        }}
        dataOptions={tableOptions}
      />
    </div>
  );
};

const SubmitRow = ({ displaySubmit, setResults, selectedTableName }) => {

  const submitQuery = async () => {
    const url = `${process.env.LDP_BACKEND_URL}/ldp/db/query?table=${selectedTableName}`
    const data = { 'username': 'example' };
    try {
      const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      resp
        .json()
        .then(resp => {
          // setIsLoadingFields(false)
          resp.forEach(v => { delete v.data })
          setResults(resp);
        })
        .catch(err => {
          // TODO: handle error
          // setLoading(false)
          // console.error(err)
          // setErrors(`Failed connect to database`)
        })
    } catch (error) {
      // TODO: handle error
      // setLoading(false)
      // setErrors(`Failed connecting to server ${url}`)
    }
  }

  return (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.2em',
    paddingTop: 14,
  }}>
    <Button>Show Columns...</Button>
    { displaySubmit? <Button buttonStyle='primary' onClick={submitQuery}>Submit</Button> : <div/> }
  </div>
)}

const Table = (n, numTables, setResults, tables) => {
  const [selectedTableName, setSelectedTableName] = useState('');
  const [isLoadingFields, setIsLoadingFields] = useState(false);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [columnsQuery, setColumnsQuery] = useState({})
  const displaySubmit = n+1 == numTables // display Submit button if this is the last table
  const displayEditJoin = n != 0

  const getColumns = async (selectedTableName) => {
    const url = `${process.env.LDP_BACKEND_URL}/ldp/db/columns?table=${selectedTableName}`
    try {
      const resp = await fetch(url)
      resp
        .json()
        .then(resp => {
          setIsLoadingFields(false)
          setAvailableColumns(resp.map(c => ({ value: c.columnName, label: c.columnName })))
        })
        .catch(err => {
          // TODO: handle error
          // setLoading(false)
          // console.error(err)
          // setErrors(`Failed connect to database`)
        })
    } catch (error) {
      // TODO: handle error
      // setLoading(false)
      // setErrors(`Failed connecting to server ${url}`)
    }
  }

  useEffect(() => {
    if(selectedTableName) { getColumns(selectedTableName); }
  }, [selectedTableName]);

  return (
    <div key={`table${n}`} style={{ width: 400, padding: 15, paddingBottom: 4, borderRight: '1px solid rgba(0,0,0,.2)', borderBottom: '1px solid rgba(0,0,0,.2)' }}>
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
      <TableSelection
        tables={tables}
        setSelectedTableName={setSelectedTableName}
        setIsLoadingFields={setIsLoadingFields}
      />
      <Columns availableColumns={availableColumns} setColumnsQuery={setColumnsQuery} />
      <SubmitRow
        selectedTableName={selectedTableName}
        displaySubmit={displaySubmit}
        setResults={setResults}
      />
    </div>
  )
}

const Tables = ({ numTables, setResults, tables }) => {
  return (
    <div style={{ display: 'flex' }}>
      { times(numTables, n => Table(n, numTables, setResults, tables)) }
    </div>
  )
}

export default Tables