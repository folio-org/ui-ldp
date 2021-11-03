import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paneset, Pane } from '@folio/stripes/components';
import gitHubFetch from '../util/gitHubFetch';
import BigError from './BigError';


function SavedQueries({ config }) {
  const [error, setError] = useState();
  const [commit, setCommit] = useState();

  useEffect(() => {
    // GitHub URL is of the form https://github.com/RandomOtherGuy/ldp-queries
    const [, owner, repo] = config.repo.match(/.*\/(.*)\/(.*)/);

    async function fetchData() {
      const res = await gitHubFetch(config, `repos/${owner}/${repo}/commits/HEAD`);
      if (!res.ok) {
        const content = await res.text();
        setError(`${res.statusText}: ${content}`);
      } else {
        const json = await res.json();
        setCommit(json);
      }
    }
    fetchData();
  }, [config]);

  if (error) return <BigError message={error} />;

  return (
    <Paneset>
      <Pane defaultWidth="fill">
        <h3>Config</h3>
        <pre>
          {JSON.stringify(config, null, 2)}
        </pre>
        <h3>Commit</h3>
        <pre>
          {JSON.stringify(commit, null, 2)}
        </pre>
      </Pane>
    </Paneset>
  );
}


SavedQueries.propTypes = {
  config: PropTypes.shape({
    repo: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
};


export default SavedQueries;
