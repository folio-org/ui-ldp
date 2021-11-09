import React, { useState, useEffect } from 'react';
import { useStripes } from '@folio/stripes/core';
import { LoadingPane } from '@folio/stripes/components';
import stripesFetch from '../util/stripesFetch';
import BigError from '../components/BigError';
import SavedQueries from '../components/SavedQueries';


function SavedQueriesRoute() {
  const stripes = useStripes();
  const [config, setConfig] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await stripesFetch(stripes, '/ldp/config/sqconfig');
      if (res.ok) {
        const json = await res.json();
        const data = JSON.parse(json.value);
        setConfig(data);
      } else {
        const content = await res.text();
        setError(`${res.statusText}: ${content}`);
      }
    }
    fetchData();
  }, [stripes]);

  if (error) return <BigError message={error} />;
  if (!config) return <LoadingPane />;

  return <SavedQueries config={config} />;
}

export default SavedQueriesRoute;
