import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import loadData from '../util/loadData';
import BigError from '../components/BigError';
import Logs from '../components/Info/Logs';


function LogsRoute() {
  const intl = useIntl();
  const stripes = useStripes();
  const [logs, setLogs] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    loadData(intl, stripes, 'logs', '/ldp/db/log', setLogs, setError);
  }, [intl, stripes]);

  if (error) {
    return <BigError message={error} />;
  }

  const data = {
    logs,
  };

  return <Logs data={data} />;
}

export default LogsRoute;
