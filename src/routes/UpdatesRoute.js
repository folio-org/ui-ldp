import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import loadData from '../util/loadData';
import BigError from '../components/BigError';
import Updates from '../components/Info/Updates';


function UpdatesRoute() {
  const intl = useIntl();
  const stripes = useStripes();
  const [updates, setUpdates] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    loadData(intl, stripes, 'updates', '/ldp/db/updates', setUpdates, setError);
  }, [intl, stripes]);

  if (error) {
    let message = error;
    // By the time we get here, `error` is a message, not a structure,
    // so we can't look at a `status` field and see whether it's
    // 501. So we have to be naughty and peek in the string.
    if (error.includes(' 501 ')) {
      message = intl.formatMessage({ id: 'ui-ldp.error.not-metadb' });
    }

    return <BigError message={message} />;
  }

  const data = {
    updates,
  };

  return <Updates data={data} />;
}

export default UpdatesRoute;
