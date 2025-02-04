import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import loadData from '../util/loadData';
import BigError from '../components/BigError';
import Updates from '../components/Info/Updates';


function UpdatesRoute() {
  const intl = useIntl();
  const stripes = useStripes();
  const [updates, setUpdates] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    loadData(intl, stripes, 'updates', '/ldp/db/updates', setUpdates, setError);
  }, [intl, stripes]);

  if (error) {
    return <BigError message={error} />;
  }

  const data = {
    updates,
  };

  return <Updates data={data} />;
}

export default UpdatesRoute;
