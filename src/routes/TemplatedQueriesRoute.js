import React, { useState, useEffect } from 'react';
import { useStripes } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import BigError from '../components/BigError';
import TemplatedQueries from '../components/TemplatedQueries';
import stripesFetch from '../util/stripesFetch';
import fetchTemplatedQueries from '../util/fetchTemplatedQueries';


function TemplatedQueriesRoute() {
  const stripes = useStripes();
  const [error, setError] = useState();
  const [loaded, setLoaded] = useState();
  const [gitRepos, setGitRepos] = useState();
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const res = await stripesFetch(stripes, '/settings/entries?query=(scope==ui-ldp.admin%20and%20key==tqrepos)');
      const body = await res.text();
      if (!res.ok) {
        setError(`Could not fetch templated-query git repositories: ${body}`);
        return;
      }
      const json = JSON.parse(body);
      const repos = (json.resultInfo.totalRecords === 0) ? [] : json.items[0].value;
      setGitRepos(repos);
    };
    fetchRepos();
  }, [stripes]);

  useEffect(() => {
    if (gitRepos) {
      fetchTemplatedQueries(gitRepos, setLoaded, setQueries)
        .catch(e => {
          setError(e.toString());
        });
    }
  }, [gitRepos]);

  if (error) return <BigError message={error} />;
  if (!loaded) return <Loading size="large" />;

  return (
    <TemplatedQueries
      queries={queries}
    />
  );
}


export default TemplatedQueriesRoute;
