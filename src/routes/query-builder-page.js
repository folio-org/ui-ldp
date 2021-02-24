import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pane, Paneset, Loading } from '@folio/stripes/components';

import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'cross-fetch';
import Table from '../components/QueryBuilder/Table';
import BigError from '../components/QueryBuilder/BigError';

const initialState = {
  tables: [
    {
      schema: 'public',
      tableName: null,
      columnFilters: [{}],
      showColumns: []
    }
  ]
};

const QueryBuilderPage = ({ okapi }) => {
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [tables, setTables] = useState({
    'public': [],
    'local': [],
    'folio_reporting': []
  });
  const [queryResponse, setQueryResponse] = useState({ key: null, resp: [] });

  useEffect(() => {
    const fetchTables = async () => {
      const url = `${okapi.url}/ldp/db/tables`;
      try {
        const resp = await fetch(url, {
          headers: {
            'X-Okapi-Tenant': okapi.tenant,
            'X-Okapi-Token': okapi.token
          }
        });
        resp
          .json()
          .then(jsonResp => {
            setLoading(false);
            // jsonResp: [{ tableSchema, tableName }, {}, {}, ...]
            // The server returns a sorted list by tableSchema
            let _public = [], local = [], folio_reporting = []
            for(let i=0; i<jsonResp.length; i++) {
              switch (jsonResp[i].tableSchema) {
                case 'public':
                  _public.push(jsonResp[i].tableName)
                  break
                case 'local':
                  local.push(jsonResp[i].tableName)
                  break
                case 'folio_reporting':
                  folio_reporting.push(jsonResp[i].tableName)
                  break
              }
            }
            // Sort the tableNames in each bucket alphabetically
            _public = _public.sort((a, b) => a.localeCompare(b));
            local = local.sort((a, b) => a.localeCompare(b));
            folio_reporting = folio_reporting.sort((a, b) => a.localeCompare(b));

            // Transform each tableName string to an Option object used in the Selection component
            _public = _public.map(t => ({ value: t, label: t }));
            local = local.map(t => ({ value: t, label: t }));
            folio_reporting = folio_reporting.map(t => ({ value: t, label: t }));

            const schemaMap = {}
            if(folio_reporting.length > 0) schemaMap['folio_reporting'] = folio_reporting
            if(local.length > 0) schemaMap['local'] = local
            if(_public.length > 0) schemaMap['public'] = _public
            setTables(schemaMap);
          })
          .catch(err => {
            setLoading(false);
            // console.error(err);
            setError('Failed connect to database' + err);
          });
      } catch (err) {
        setLoading(false);
        // console.error(err);
        setError(`Failed connecting to server ${url}`);
      }
    };
    fetchTables();
  }, []);

  const onSubmit = async (values) => {
    const url = `${okapi.url}/ldp/db/query`;
    try {
      const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'X-Okapi-Tenant': okapi.tenant,
          'X-Okapi-Token': okapi.token,
          'Content-Type': 'application/json'
        }
      });
      resp
        .json()
        .then(jsonResp => {
          // setIsLoadingFields(false)
          jsonResp.forEach(v => { delete v.data; });
          setQueryResponse({ key: uuidv4(), resp: jsonResp });
        })
        .catch(() => {
          // TODO: handle error
          // setLoading(false)
          // console.error(err)
          // setErrors(`Failed connect to database`)
        });
    } catch (error2) {
      // TODO: handle error
      // setLoading(false)
      // setErrors(`Failed connecting to server ${url}`)
    }
  };

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
        }
      }) => {
        return (
          <Paneset>
            <form
              id="form-querybuilder"
              onSubmit={handleSubmit}
              data-test-query-builder
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%'
              }}
            >
              <FieldArray name="tables">
                {({ fields }) => fields.map((table, tableIndex) => (
                  <Pane id={`table${tableIndex}`} defaultWidth="50%" key={table}>
                    {isLoading ? <div style={{ textAlign: 'center', margin: 20 }}><Loading size="xlarge" /></div> : (error ? <BigError message={error} /> :
                    <Table
                      table={table}
                      tableIndex={tableIndex}
                      tables={tables}
                      queryResponse={queryResponse}
                      tablesAreLoading={isLoading}
                      okapi={okapi}
                      onRemove={() => fields.remove(tableIndex)}
                      push={push}
                      pop={pop}
                    />)}
                  </Pane>
                ))}
              </FieldArray>
              <Pane id="empty-space" defaultWidth="fill" style={{ height: '0' }}>
                {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                {/* <Button onClick={() => { setNumTables(numTables+1) }}>Add Join Table</Button> */}
              </Pane>

            </form>
          </Paneset>
        );
      }}
    />
  );
};

QueryBuilderPage.propTypes = {
  okapi: PropTypes.shape({
    url: PropTypes.string,
    tenant: PropTypes.string,
    token: PropTypes.string,
  })
};

export default QueryBuilderPage;
