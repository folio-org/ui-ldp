import React, { useState, useEffect } from 'react';
import { useStripes } from '@folio/stripes/core';
import { LoadingPane } from '@folio/stripes/components';
import BigError from '../components/BigError';
import fetchSavedQueryConfig from '../util/fetchSavedQueryConfig';
import SavedQueries from '../components/SavedQueries';

function SavedQueriesRoute() {
  const stripes = useStripes();
  const [config, setConfig] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetchSavedQueryConfig(stripes, setConfig, setError);
  }, [stripes]);

  if (error) return <BigError message={error} />;
  if (!config) return <LoadingPane />;

  return <SavedQueries config={config} />;
}

export default SavedQueriesRoute;
