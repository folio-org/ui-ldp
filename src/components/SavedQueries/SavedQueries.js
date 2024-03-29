import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { LoadingPane } from '@folio/stripes/components';
import loadData from '../../util/loadData';
import stripesFetch from '../../util/stripesFetch';
import BigError from '../BigError';
import ListSavedQueries from './ListSavedQueries';


function SavedQueries() {
  const intl = useIntl();
  const stripes = useStripes();
  const [data, setData] = useState();
  const [error, setError] = useState();

  const path = '/settings/entries?query=scope=="ui-ldp.queries"&limit=1000';
  useEffect(() => {
    loadData(intl, stripes, 'queries', path, setData, setError);
  }, [intl, stripes]); // XXX Do we also need to add stripes.okapi as we do, for some reason, in some other cases?

  if (error) return <BigError message={error} />;
  if (!data) return <LoadingPane />;

  const queries = data.items.map(entry => ({
    ...entry.value.META,
    json: {
      tables: entry.value.tables,
    },
    name: entry.key,
    id: entry.id,
  }));

  queries.sort((a, b) => {
    const an = a.displayName?.toLowerCase();
    const bn = b.displayName?.toLowerCase();
    if (!an) return -1;
    if (!bn) return 1;
    if (an < bn) return -1;
    if (an > bn) return 1;
    return 0;
  });

  const deleteQuery = (_item) => {
    // It's no good forcing a re-fetch to show the deleted search
    // gone, because there is a race condition where the fetch happens
    // before the delete is complete. Instead, we must manually remove
    // the relevant record.
    setData({ items: data.items.filter(x => x.id !== _item.id) });
    return stripesFetch(stripes, `/settings/entries/${_item.id}`, { method: 'DELETE' });
  };

  return <ListSavedQueries queries={queries} deleteQuery={deleteQuery} />;
}


export default SavedQueries;
