import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import { useLdp } from '../LdpContext';
import loadTables from '../util/loadTables';
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
      // limit is set below, from dynamically loaded defaults
    }
  ]
};

const QueryBuilderRoute = () => {
  const intl = useIntl();
  const stripes = useStripes();
  const ldp = useLdp();
  const [tables, setTables] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    loadTables(intl, stripes, setTables, setError);
  }, [intl, stripes, stripes.okapi, setTables]);

  if (error) return <BigError message={error} />;
  if (!tables) return <Loading size="xlarge" />;

  initialState.tables[0].limit = ldp.defaultShow;

  return <QueryBuilder
    ldp={ldp}
    initialState={initialState}
    tables={tables}
    setError={setError}
  />;
};

QueryBuilderRoute.propTypes = {};

export default QueryBuilderRoute;
