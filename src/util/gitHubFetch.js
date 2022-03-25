import fetch from 'cross-fetch';

// GitHub API notes
//
// User-Agent header is required, but supplied by HTTP library or browser
// Send header `Accept: application/vnd.github.v3+json`
// Authentication method 1 (HTTP Basic): `curl -u "username:password" https://api.github.com`
// Authentication method 2 preferred (OAuth2 token): `curl -H "Authorization: token OAUTH-TOKEN" https://api.github.com`
// See https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#using-personal-access-tokens
// Actually fetching files is from a specific commit or branch:
// see https://stackoverflow.com/questions/25022016/get-all-file-names-from-a-github-repo-through-the-github-api

async function gitHubFetch(config, path, options) {
  return fetch(`https://api.github.com/${path}`, {
    ...options,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'Authorization': `token ${config.token}`,
    }
  });
}

export default gitHubFetch;
