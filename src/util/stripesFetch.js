import fetch from 'cross-fetch';

async function stripesFetch(stripes, path, options) {
  const { okapi } = stripes;
  let okapiUrl;
  if (options?.noSideLoad) {
    delete options.noSideLoad;
    okapiUrl = okapi.url;
  } else {
    okapiUrl = stripes?.config?.modLdpUrl || okapi.url;
  }

  const headers = {
    'X-Okapi-Tenant': okapi.tenant,
    'Content-Type': 'application/json',
  };
  if (okapi.token) headers['X-Okapi-Token'] = okapi.token;

  return fetch(`${okapiUrl}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });
}

export default stripesFetch;
