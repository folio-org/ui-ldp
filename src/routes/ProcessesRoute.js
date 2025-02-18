import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import loadData from '../util/loadData';
import BigError from '../components/BigError';
import Processes from '../components/Info/Processes';


function ProcessesRoute() {
  const intl = useIntl();
  const stripes = useStripes();
  const [processes, setProcesses] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    loadData(intl, stripes, 'processes', '/ldp/db/processes', setProcesses, setError);
  }, [intl, stripes]);

  if (error) {
    return <BigError message={error} />;
  }

  const data = {
    processes,
  };

  return <Processes data={data} />;
}

export default ProcessesRoute;
