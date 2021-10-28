import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import localforage from 'localforage';
import { useStripes, useNamespace } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import { useLdp } from '../LdpContext';
import loadTables from '../util/loadTables';
import BigError from '../components/BigError';
import QueryBuilder from '../components/QueryBuilder';

const initialInitialState = {
  tables: [
    {
      schema: 'public',
      tableName: null,
      columnFilters: [{}],
      showColumns: [],
      orderBy: [],
      // limit is set below, from dynamically loaded defaults
    }
  ]
};

const QueryBuilderRoute = () => {
  const intl = useIntl();
  const stripes = useStripes();
  const [, getNamespace] = useNamespace();
  const ldp = useLdp();
  const [initialState, setInitialState] = useState();
  const [tables, setTables] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    loadTables(intl, stripes, setTables, setError);
  }, [intl, stripes, stripes.okapi, setTables]);

  initialInitialState.tables[0].limit = ldp.defaultShow;

  const namespace = getNamespace({ key: 'formState' });
  useEffect(() => {
    localforage.getItem(namespace).then((state) => {
      // console.log(`localforage.getItem('${namespace}') got state`, state);
      setInitialState(state || initialInitialState);
    });
  }, [namespace]);

  if (error) return <BigError message={error} />;
  if (!initialState || !tables) return <Loading size="xlarge" />;

  return <QueryBuilder
    ldp={ldp}
    initialState={initialState}
    stateHasChanged={values => localforage.setItem(namespace, values)}
    tables={tables}
    setError={setError}
  />;
};

QueryBuilderRoute.propTypes = {};

export default QueryBuilderRoute;
