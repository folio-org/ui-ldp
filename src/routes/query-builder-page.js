import React, { useState, useEffect } from 'react';
import Tables from '../components/QueryBuilder/Tables';
import { Button, MultiColumnList, TextField } from '@folio/stripes/components';
import { times } from '../components/QueryBuilder/utils';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays';
import Table from '../components/QueryBuilder/Table';

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
const initialState = {
  tables: [
    {
      tableName: null,
      columns: [{}]
    }
  ]
}

const QueryBuilderPage = props => {
  const { mutator, resources: { someLocalResource } } = props
  const [hasError, setErrors] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [numTables, setNumTables] = useState(1)
  const [results, setResults] = useState([])
  const [tables, setTables] = useState([])

  useEffect(() => {
    mutator.someLocalResource.update({ stuff: 7 });
  }, [])
  // console.debug(someLocalResource)

  async function fetchTables() {
    const url = `${process.env.LDP_BACKEND_URL}/ldp/db/tables`
    try {
      const resp = await fetch(url)
      resp
        .json()
        .then(resp => {
          setLoading(false)
          const sortedTables = resp.sort((a,b) => a.tableName.localeCompare(b.tableName) )
          const tableOptions = sortedTables.map(t => ({ value: t.tableName, label: t.tableName }));
          setTables(tableOptions)
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

  const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
    // event.preventDefault();
  }

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{
        ...arrayMutators
      }}
      initialValues={initialState}
      render={({
        handleSubmit,
        form: {
          mutators: { push, pop }
        }, // injected from final-form-arrays above
        pristine,
        form,
        submitting,
        values
      }) => {
        return (
          <form id="form-querybuilder" onSubmit={onSubmit}>{props.children}
            <div style={{ position: 'relative', display: 'flex', height: '100%', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FieldArray name="tables">
                  {({ fields }) =>
                  fields.map((table, tableIndex) => (
                    <Table
                      table={table}
                      tableIndex={tableIndex}
                      key={table}
                      tables={tables}
                      onRemove={() => fields.remove(tableIndex)}
                      push={push}
                      pop={pop}
                    />
                  ))}
                </FieldArray>
{/* 
                <Tables tables={tables} numTables={numTables} setResults={setResults} />
                <ResultsRow numTables={numTables} results={results} />
  */}
              </div>
              <div style={{ padding: 10, borderTop: '1px solid rgba(0,0,0,.2)' }}>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
                {/* <div>{someLocalResource}</div> */}
                {/* <Button onClick={() => { setNumTables(numTables+1) }}>Add Join Table</Button> */}
              </div>
            </div>
          </form>
        )
      }}
    />
  );
}

QueryBuilderPage.propTypes = {
  resources: PropTypes.shape({
    someLocalResource: PropTypes.object
  }).isRequired
}
QueryBuilderPage.manifest = {
  dataKey: 'ldp',
  someLocalResource: {}
}

export default QueryBuilderPage
