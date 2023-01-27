import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import localforage from 'localforage';
import { useStripes, useNamespace } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import { useLdp } from '../LdpContext';
import loadTables from '../util/loadTables';
import BigError from '../components/BigError';
import QueryBuilder from '../components/QueryBuilder';


const QueryBuilderRoute = ({ location }) => {
  const intl = useIntl();
  const stripes = useStripes();
  const [, getNamespace] = useNamespace();
  const ldp = useLdp();
  const [initialState, setInitialState] = useState();
  const [tables, setTables] = useState();
  const [error, setError] = useState(false);
  const params = queryString.parse(location.search);

  useEffect(() => {
    loadTables(intl, stripes, setTables, setError);
  }, [intl, stripes, stripes.okapi, setTables]);

  const newQueryState = {
    tables: [
      {
        schema: 'public',
        tableName: null,
        columnFilters: [{}],
        showColumns: [],
        orderBy: [],
        limit: ldp.defaultShow,
      }
    ]
  };

  const newQuery = () => setInitialState(newQueryState);

  const namespace = getNamespace({ key: 'formState' });
  useEffect(() => {
    localforage.getItem(namespace).then((state) => {
      // console.log(`localforage.getItem('${namespace}') got state`, state);
      setInitialState(state || newQueryState);
    });
    // Including newQueryState in the dependency array makes weird things happen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namespace]);

  if (error) return <BigError message={error} />;
  if (!initialState || !tables) return <Loading size="xlarge" />;

  return <QueryBuilder
    ldp={ldp}
    initialState={initialState}
    stateHasChanged={values => localforage.setItem(namespace, values)}
    tables={tables}
    setError={setError}
    onClear={newQuery}
    execute={'execute' in params}
  />;
};

QueryBuilderRoute.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default QueryBuilderRoute;
