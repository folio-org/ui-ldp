import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import BigError from '../components/BigError';
import TemplatedQueries from '../components/TemplatedQueries';
import stripesFetch from '../util/stripesFetch';
import httpErrorMessage from '../util/httpErrorMessage';
import fetchTemplatedQueries from '../util/fetchTemplatedQueries';


function TemplatedQueriesRoute() {
  const intl = useIntl();
  const stripes = useStripes();
  const [error, setError] = useState();
  const [loaded, setLoaded] = useState();
  const [gitRepos, setGitRepos] = useState();
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const res = await stripesFetch(stripes, '/settings/entries?query=(scope==ui-ldp.admin%20and%20key==tqrepos)');
      if (!res.ok) {
        setError(intl.formatMessage(
          { id: 'ui-ldp.error.load-tqrepos' },
          { error: await httpErrorMessage(intl, res) },
        ));
        return;
      }
      const json = JSON.parse(await res.text());
      const repos = (json.resultInfo.totalRecords === 0) ? [] : json.items[0].value;
      setGitRepos(repos);
    };
    fetchRepos();
  }, [intl, stripes]);

  useEffect(() => {
    if (gitRepos) {
      fetchTemplatedQueries(intl, gitRepos, setLoaded, setQueries)
        .catch(e => {
          setError(e.toString());
        });
    }
  }, [intl, gitRepos]);

  if (error) return <BigError message={error} />;
  if (!loaded) return <Loading size="large" />;

  return (
    <TemplatedQueries
      queries={queries}
    />
  );
}


export default TemplatedQueriesRoute;
