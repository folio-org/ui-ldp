import React, { useState, useEffect } from 'react';
import { useStripes } from '@folio/stripes/core';
import { LoadingPane, Paneset, Pane } from '@folio/stripes/components';
import stripesFetch from '../util/stripesFetch';
import BigError from '../components/BigError';


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

  return (
    <Paneset>
      <Pane defaultWidth="fill">
        <pre>
          {JSON.stringify(config, null, 2)}
        </pre>
      </Pane>
    </Paneset>
  );
}

export default SavedQueriesRoute;
