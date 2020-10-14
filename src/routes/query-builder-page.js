import React, { useState, useEffect } from 'react';
import { Pane, Paneset } from '@folio/stripes/components';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays';
import Table from '../components/QueryBuilder/Table';

const initialState = {
  tables: [
    {
      tableName: null,
      columns: [{}]
    }
  ]
}

const QueryBuilderPage = props => {
  const [hasError, setErrors] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [tables, setTables] = useState([]);
  const [queryResponse, setQueryResponse] = useState(null);

  async function fetchTables() {
    const url = `${process.env.LDP_BACKEND_URL}/ldp/db/tables`;
    try {
      const resp = await fetch(url);
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
    fetchTables();
  }, []);

  const onSubmit = async (values) => {
    const url = `${process.env.LDP_BACKEND_URL}/ldp/db/query`
    try {
      const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      resp
        .json()
        .then(resp => {
          // setIsLoadingFields(false)
          resp.forEach(v => { delete v.data });
          setQueryResponse(resp);
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
          <Paneset>
            <form id="form-querybuilder" onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%'
            }}>
              <FieldArray name="tables">
                {({ fields }) =>
                fields.map((table, tableIndex) => (
                  <Pane id={`table${tableIndex}`} defaultWidth="50%" >
                    <Table
                      table={table}
                      tableIndex={tableIndex}
                      key={table}
                      tables={tables}
                      queryResponse={queryResponse}
                      onRemove={() => fields.remove(tableIndex)}
                      push={push}
                      pop={pop}
                    />
                  </Pane>
                ))}
              </FieldArray>
              <Pane id='empty-space' defaultWidth="fill" style={{ height: 'auto' }}>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
                {/* <Button onClick={() => { setNumTables(numTables+1) }}>Add Join Table</Button> */}
              </Pane>

            </form>
          </Paneset>
        )
      }}
    />
  );
}

export default QueryBuilderPage
