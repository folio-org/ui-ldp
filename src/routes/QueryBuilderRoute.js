import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useStripes } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import { useLdp } from '../LdpContext';
import getTables from '../util/getTables';
import stripesFetch from '../util/stripesFetch';
import defaultConfig from '../util/defaultConfig';
import QueryBuilder from '../components/QueryBuilder';

const initialState = {
  tables: [
    {
      schema: 'public',
      tableName: null,
      columnFilters: [{}],
      showColumns: [],
      orderBy: [],
      limit: 1000,
    }
  ]
};


const QueryBuilderRoute = ({ okapi }) => {
  const stripes = useStripes();
  const ldp = useLdp();
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [tables, setTables] = useState({
    'public': [],
    'local': [],
    'folio_reporting': []
  });
  const [queryResponse, setQueryResponse] = useState({ key: null, resp: [] });

  useEffect(() => {
    getTables(stripes, setLoading, setTables, setError);
  }, [stripes, stripes.okapi, setTables]);

  useEffect(() => {
    const setDefaults = async () => {
      if (!ldp.defaultShow) {
        try {
          const path = '/configurations/entries?query=(module==LDP and configName==recordLimits)';
          const resp = await stripesFetch(stripes, path, { noSideLoad: true });
          resp.json().then(json => {
            const data = (json.configs && json.configs.length !== 0) ?
              JSON.parse(json.configs[0].value) :
              defaultConfig;
            ldp.defaultShow = data.defaultShow;
            ldp.maxShow = data.maxShow;
            ldp.maxExport = data.maxExport;
          });
        } catch (err) {
          setLoading(false);
          setError('Could not load defaults:' + err);
        }
      }
    };

    setDefaults();
  }, [stripes, ldp, ldp.defaultShow, ldp.maxShow, ldp.maxExport]);

  const onSubmit = async (values) => {
    try {
      const resp = await stripesFetch(stripes, '/ldp/db/query', {
        method: 'POST',
        body: JSON.stringify(values),
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

  if (!ldp.defaultShow) return <Loading size="xlarge" />;

  initialState.tables[0].limit = ldp.defaultShow;
  return <QueryBuilder
    okapi={okapi}
    ldp={ldp}
    isLoading={isLoading}
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
