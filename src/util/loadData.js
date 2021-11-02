import stripesFetch from './stripesFetch';

// Generic substrate for all the domain-specific load* functions

const loadData = async (intl, stripes, tag, path, setData, setError, opts = {}) => {
  try {
    const resp = await stripesFetch(stripes, path, opts);
    if (!resp.ok) {
      throw new Error(intl.formatMessage(
        { id: 'ui-ldp.error.http' },
        { status: resp.status, text: resp.statusText },
      ));
    }

    resp
      .json()
      .then(raw => setData(raw))
      .catch(error => {
        setError(intl.formatMessage(
          { id: 'ui-ldp.error.fetch-reject' },
          { error: error.toString() },
        ));
      });
  } catch (error) {
    setError(intl.formatMessage(
      { id: `ui-ldp.error.load-${tag}` },
      { error: error.toString() },
    ));
  }
};

export default loadData;
