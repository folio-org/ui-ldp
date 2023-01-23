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

  const path = '/settings/entries?query=scope=="ui-ldp.admin"'; // XXX ui-ldp.queries
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

  const deleteQuery = (_item) => {
    console.log(_item);
    return stripesFetch(stripes, `/settings/entries/${_item.id}`, { method: 'DELETE' });
  };

  return <ListSavedQueries queries={queries} deleteQuery={deleteQuery} />;
}


export default SavedQueries;
