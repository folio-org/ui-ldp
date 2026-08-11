import stripesFetch from './stripesFetch';
import httpErrorMessage from './httpErrorMessage';

// Generic substrate for all the domain-specific load* functions

const loadData = async (intl, stripes, tag, path, setData, setError, opts = {}) => {
  try {
    const resp = await stripesFetch(stripes, path, opts);
    if (!resp.ok) {
      throw new Error(await httpErrorMessage(intl, resp));
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
