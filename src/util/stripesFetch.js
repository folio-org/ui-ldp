import fetch from 'cross-fetch';

async function stripesFetch(stripes, path, options) {
  const { okapi } = stripes;
  const okapiUrl = stripes?.config?.modLdpUrl || okapi.url;

  return fetch(`${okapiUrl}${path}`, {
    ...options,
    headers: {
      'X-Okapi-Tenant': okapi.tenant,
      'X-Okapi-Token': okapi.token,
      'Content-Type': 'application/json'
    }
  });
}

export default stripesFetch;
