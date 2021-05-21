import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useStripes } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import { useLdp } from '../LdpContext';
import loadTables from '../util/loadTables';
import stripesFetch from '../util/stripesFetch';
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

const QueryBuilderRoute = ({ okapi }) => {
  const stripes = useStripes();
  const ldp = useLdp();
  const [tables, setTables] = useState();
  const [error, setError] = useState(false);
  const [queryResponse, setQueryResponse] = useState({ key: null, resp: [] });

  useEffect(() => {
    loadTables(stripes, setTables, setError);
  }, [stripes, stripes.okapi, setTables]);

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
    okapi={okapi}
    ldp={ldp}
    initialState={initialState}
    tables={tables}
    onSubmit={onSubmit}
    queryResponse={queryResponse}
    error={error}
  />;
};

QueryBuilderRoute.propTypes = {
  okapi: PropTypes.shape({
    url: PropTypes.string.isRequired,
    tenant: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};

export default QueryBuilderRoute;
