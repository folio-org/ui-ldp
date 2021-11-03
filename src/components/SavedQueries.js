import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paneset, Pane } from '@folio/stripes/components';
import gitHubFetch from '../util/gitHubFetch';
import BigError from './BigError';


function SavedQueries({ config }) {
  const [error, setError] = useState();
  const [commit, setCommit] = useState();

  useEffect(() => {
    async function fetchData() {
      const { owner, repo, branch } = config;
      const res = await gitHubFetch(config, `repos/${owner}/${repo}/commits/${branch}`);
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
        <pre>
          {JSON.stringify(commit, null, 2)}
        </pre>
      </Pane>
    </Paneset>
  );
}


SavedQueries.propTypes = {
  config: PropTypes.shape({
    owner: PropTypes.string,
    repo: PropTypes.string,
    branch: PropTypes.string,
  }).isRequired,
};


export default SavedQueries;
