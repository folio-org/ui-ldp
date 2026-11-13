import { useState, useEffect, useCallback } from 'react';
import { useOkapiKy } from '@folio/stripes/core';

// Keep CQL queries short enough to fit comfortably in a URL
const CHUNK_SIZE = 50;

// Returns a map of user records keyed by ID for the specified IDs,
// fetching from mod-users only those that are not already known.
// `addUsers` lets the caller seed the cache with records it already
// has (e.g. those returned by the find-user plugin) to avoid refetching.
// IDs that are looked up but not found map to `null`.
function useUsersByIds(ids) {
  const ky = useOkapiKy();
  const [usersById, setUsersById] = useState({});
  const [error, setError] = useState();

  // `missing` is a new array on every render, and React compares effect
  // dependencies by reference, so the effect depends on this string key
  // instead and recovers the list from it. UUIDs contain no commas.
  const missing = ids.filter(id => !(id in usersById));
  const missingKey = missing.join(',');

  useEffect(() => {
    if (!missingKey) return;

    const toFetch = missingKey.split(',');
    const chunks = [];
    for (let i = 0; i < toFetch.length; i += CHUNK_SIZE) {
      chunks.push(toFetch.slice(i, i + CHUNK_SIZE));
    }

    Promise.all(chunks.map(chunk => ky.get('users', {
      searchParams: {
        query: `id==(${chunk.join(' or ')})`,
        limit: chunk.length,
      },
    }).json()))
      .then(responses => {
        const found = Object.fromEntries(toFetch.map(id => [id, null])); // Mark these IDs as having been looked up
        responses.forEach(res => res.users.forEach(u => { found[u.id] = u; }));
        setUsersById(prev => ({ ...prev, ...found }));
      })
      .catch(e => setError(e));
  }, [ky, missingKey]);

  const addUsers = useCallback((users) => {
    setUsersById(prev => ({ ...prev, ...Object.fromEntries(users.map(u => [u.id, u])) }));
  }, []);

  return {
    usersById,
    isLoading: missing.length > 0 && !error,
    error,
    addUsers,
  };
}

export default useUsersByIds;
