import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useStripes } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import { useLdp } from '../LdpContext';
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
    const getTables = async () => {
      try {
        const resp = await stripesFetch(stripes, '/ldp/db/tables');
        if (!resp.ok) throw new Error(`HTTP error ${resp.status}: ${resp.statusText}`);
        resp
          .json()
          .then(jsonResp => {
            setLoading(false);
            // jsonResp: [{ tableSchema, tableName }, {}, {}, ...]
            // The server returns a sorted list by tableSchema
            let _public = [];
            let local = [];
            let folioReporting = [];
            for (let i = 0; i < jsonResp.length; i++) {
              switch (jsonResp[i].tableSchema) {
                case 'public':
                  _public.push(jsonResp[i].tableName);
                  break;
                case 'local':
                  local.push(jsonResp[i].tableName);
                  break;
                case 'folio_reporting':
                  folioReporting.push(jsonResp[i].tableName);
                  break;
                default:
                  throw Error(`cannot happen: tableSchema='${jsonResp[i].tableSchema}'`);
              }
            }
            // Sort the tableNames in each bucket alphabetically
            _public = _public.sort((a, b) => a.localeCompare(b));
            local = local.sort((a, b) => a.localeCompare(b));
            folioReporting = folioReporting.sort((a, b) => a.localeCompare(b));

            // Transform each tableName string to an Option object used in the Selection component
            _public = _public.map(t => ({ value: t, label: t }));
            local = local.map(t => ({ value: t, label: t }));
            folioReporting = folioReporting.map(t => ({ value: t, label: t }));

            const schemaMap = {};
            if (folioReporting.length > 0) schemaMap.folio_reporting = folioReporting;
            if (local.length > 0) schemaMap.local = local;
            if (_public.length > 0) schemaMap.public = _public;
            setTables(schemaMap);
          })
          .catch(err => {
            setLoading(false);
            // console.error(err);
            setError('Failed connect to database: ' + err);
          });
      } catch (err) {
        setLoading(false);
        // console.error(err);
        setError('Failed connecting to server' + err);
      }
    };

    getTables();
  }, [stripes, okapi]);

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
  }, [stripes, ldp, ldp.defaultShow, ldp.maxShow, ldp.maxExport, counter]);

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
