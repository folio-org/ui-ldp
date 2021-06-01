import React, { useState, useEffect } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { v4 as uuidv4 } from 'uuid';
import { useStripes } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import { useLdp } from '../LdpContext';
import loadTables from '../util/loadTables';
import stripesFetch from '../util/stripesFetch';
import BigError from '../components/BigError';
import QueryBuilder from '../components/QueryBuilder';

const initialState = {
  tables: [
    {
      schema: 'public',
      tableName: null,
      columnFilters: [{}],
      showColumns: [],
      orderBy: [],
    }
  ]
};

const QueryBuilderRoute = () => {
  const stripes = useStripes();
  const ldp = useLdp();
  const [tables, setTables] = useState();
  const [error, setError] = useState(false);
  const [queryResponse, setQueryResponse] = useState({ key: null, resp: [] });

  useEffect(() => {
    loadTables(stripes, setTables, setError);
  }, [stripes, stripes.okapi, setTables]);

  if (error) return <BigError message={error} />;
  if (!tables) return <Loading size="xlarge" />;

  const onSubmit = async (values) => {
    try {
      const limit = values.tables[0].limit;
      const modifiedValues = cloneDeep(values);
      modifiedValues.tables[0].limit = parseInt(limit, 10) + 1;

      const resp = await stripesFetch(stripes, '/ldp/db/query', {
        method: 'POST',
        body: JSON.stringify(modifiedValues),
      });
      if (!resp.ok) throw new Error(`XXX HTTP error ${resp.status}: ${resp.statusText}`);
      resp
        .json()
        .then(jsonResp => {
          jsonResp.forEach(v => { delete v.data; });
          const isComplete = jsonResp.length < limit;

          if (!isComplete) {
            let firstField;

            // ### I don't know if this is guaranteed to work, but it seems to
            Object.keys(jsonResp[0]).forEach(key => {
              if (!firstField) firstField = key;
            });

            jsonResp[jsonResp.length - 1] = {
              [firstField]: '... More records ...',
            };
          }

          setQueryResponse({
            key: uuidv4(),
            count: isComplete ? jsonResp.length : limit,
            isComplete,
            resp: jsonResp,
          });
        })
        .catch((e) => {
          setError(e.toString());
        });
    } catch (err) {
      setError('XXX Query failed: ' + err);
    }
  };

  initialState.tables[0].limit = ldp.defaultShow;

  return <QueryBuilder
    ldp={ldp}
    initialState={initialState}
    tables={tables}
    onSubmit={onSubmit}
    queryResponse={queryResponse}
  />;
};

QueryBuilderRoute.propTypes = {};

export default QueryBuilderRoute;
