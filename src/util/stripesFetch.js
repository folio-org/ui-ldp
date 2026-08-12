// "Side-loading" sends LDP requests straight to a locally running
// mod-ldp named by the `modLdpUrl` Stripes config setting, instead of
// through Okapi: see the README for how to set that up. Requests that
// are not served by mod-ldp at all -- the configuration held in
// mod-settings, for example -- must still go to Okapi even when
// side-loading is configured, and pass `noSideLoad` to say so.
//
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
