import fetch from 'cross-fetch';

async function gitHubFetch(config, path, options) {
  return fetch(`https://api.github.com/${path}`, {
    ...options,
    headers: {
      'User-Agent': 'FOLIO ui-ldp',
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'Authorization': `token ${config.token}`,
    }
  });
}

export default gitHubFetch;
