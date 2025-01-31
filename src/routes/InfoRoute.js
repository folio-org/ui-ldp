import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import loadData from '../util/loadData';
import BigError from '../components/BigError';
import Info from '../components/Info';


function InfoRoute() {
  const intl = useIntl();
  const stripes = useStripes();
  const [version, setVersion] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    loadData(intl, stripes, 'version', '/ldp/db/version', setVersion, setError);
  }, [intl, stripes]);

  if (error) {
    return <BigError message={error} />;
  }

  const data = {
    version,
  };

  return <Info data={data} />;
}

export default InfoRoute;
