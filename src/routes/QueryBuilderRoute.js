import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStripes } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import { useLdp } from '../LdpContext';
import loadTables from '../util/loadTables';
import stripesFetch from '../util/stripesFetch';
import BigError from '../components/QueryBuilder/BigError';
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
      const resp = await stripesFetch(stripes, '/ldp/db/query', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      resp
        .json()
        .then(jsonResp => {
          jsonResp.forEach(v => { delete v.data; });
          setQueryResponse({ key: uuidv4(), resp: jsonResp });
        })
        .catch(() => {
          // TODO: handle error
        });
    } catch (error2) {
      // TODO: handle error
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
