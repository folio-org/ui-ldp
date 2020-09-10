import React, { useState, useEffect } from 'react';
import Tables from '../components/QueryBuilder/Tables';
import { Button, MultiColumnList } from '@folio/stripes/components';
import { times } from '../components/QueryBuilder/utils';

const mockData2 = [
  {id:'b6d44', desc: 'Faculty Member', group:'faculty'},
  {id:'e6847', desc: 'Faculty Member', group:'faculty'},
]
const ResultsRow = ({ numTables, results }) => {
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      { times(numTables, (n) => (
        <div key={n} style={{ width: 400, paddingTop: 10, borderRight: '1px solid rgba(0,0,0,.2)' }}>
          {results.length ? (
            <div style={{ /* marginLeft: -5, marginRight: -5 */ }}>
              <MultiColumnList contentData={n == 0? results : mockData2} />
            </div>
          ) : <div/>}
        </div>
      ) ) }
    </div>
  )
}

const QueryBuilderPage = () => {
  const [hasError, setErrors] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [numTables, setNumTables] = useState(1)
  const [results, setResults] = useState([])
  const [tables, setTables] = useState([])

  async function fetchTables() {
    const url = `${process.env.LDP_BACKEND_URL}/ldp/db/tables`
    try {
      const resp = await fetch(url)
      resp
        .json()
        .then(resp => {
          setLoading(false)
          setTables(resp.sort((a,b) => a.tableName.localeCompare(b.tableName) ))
        })
        .catch(err => {
          setLoading(false)
          console.error(err)
          setErrors(`Failed connect to database`)
        })
    } catch (error) {
      setLoading(false)
      setErrors(`Failed connecting to server ${url}`)
    }
  }

  useEffect(() => {
    fetchTables()
  }, []);

  return (
    <div style={{ position: 'relative', display: 'flex', height: '100%', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Tables tables={tables} numTables={numTables} setResults={setResults} />
        <ResultsRow numTables={numTables} results={results} />
      </div>
      <div style={{ padding: 10, borderTop: '1px solid rgba(0,0,0,.2)' }}>
        {/* <Button onClick={() => { setNumTables(numTables+1) }}>Add Join Table</Button> */}
      </div>
    </div>
  );
}

export default QueryBuilderPage
