import stripesFetch from './stripesFetch';

async function fetchSavedQueryConfig(stripes, setConfig, setError) {
  const res = await stripesFetch(stripes, '/ldp/config/sqconfig');
  if (res.ok) {
    const json = await res.json();
    const data = JSON.parse(json.value);
    setConfig(data);
  } else {
    const content = await res.text();
    setError(`${res.statusText}: ${content}`);
  }
}

export default fetchSavedQueryConfig;
