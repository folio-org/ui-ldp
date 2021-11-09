import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import gitHubFetch from '../../util/gitHubFetch';
import BigError from '../BigError';
import ListSavedQueries from './ListSavedQueries';


function SavedQueries({ config }) {
  const [error, setError] = useState();
  const [commit, setCommit] = useState();
  const [tree, setTree] = useState();
  const [directory, setDirectory] = useState();
  const [queries, setQueries] = useState({});

  useEffect(() => {
    (async () => {
      const res = await gitHubFetch(config, `repos/${config.owner}/${config.repo}/commits/${config.branch || 'HEAD'}`);
      if (res.ok) {
        setCommit(await res.json());
      } else {
        setError(`${res.statusText}: ${await res.text()}`);
      }
    })();
  }, [config]);

  useEffect(() => {
    if (commit) {
      (async () => {
        const res = await gitHubFetch(config, `repos/${config.owner}/${config.repo}/git/trees/${commit.commit.tree.sha}`);
        if (res.ok) {
          setTree(await res.json());
        } else {
          setError(`${res.statusText}: ${await res.text()}`);
        }
      })();
    }
  }, [config, commit]);

  useEffect(() => {
    if (tree) {
      (async () => {
        const directorySHA = tree.tree.filter(x => x.path === 'queries')[0].sha;
        const res = await gitHubFetch(config, `repos/${config.owner}/${config.repo}/git/trees/${directorySHA}`);
        if (res.ok) {
          setDirectory(await res.json());
        } else {
          setError(`${res.statusText}: ${await res.text()}`);
        }
      })();
    }
  }, [config, tree]);

  useEffect(() => {
    if (directory) {
      (async () => {
        directory.tree.forEach(x => {
          gitHubFetch(config, `repos/${config.owner}/${config.repo}/contents/queries/${x.path}`)
            .then(async res => {
              const json = await res.json();
              setQueries(old => {
                return ({ ...old, [x.path]: json });
              });
            });
        });
      })();
    }
  }, [config, directory]);

  if (error) return <BigError message={error} />;

  return <ListSavedQueries config={config} queries={queries} />;
}


SavedQueries.propTypes = {
  config: PropTypes.shape({
    owner: PropTypes.string,
    repo: PropTypes.string,
    branch: PropTypes.string,
  }).isRequired,
};


export default SavedQueries;
