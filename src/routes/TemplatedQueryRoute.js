import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Loading } from '@folio/stripes/components';
import { useLdp } from '../LdpContext';
import BigError from '../components/BigError';
import TemplatedQuery from '../components/TemplatedQuery';
import resolveTemplatedQuery from '../util/resolveTemplatedQuery';

function TemplatedQueryRoute() {
  const intl = useIntl();
  const location = useLocation();
  const ldp = useLdp();
  const stripes = useStripes();
  const [error, setError] = useState();

  const qname = location.pathname.replace('/ldp/tq/', '');
  const tab = ldp.tqTabs?.find(t => t.name === qname);

  // The URL specifies which report we are looking at: the tab itself
  // is only a cache of information abut it. So when a user links
  // directly to a tab from outside the app, and there is no extant
  // tab, we summon one into existence rather than complaining that
  // the report does not exist.
  useEffect(() => {
    let cancelled = false;

    // Nothing to do when the report has already been resolved, either
    // by clicking it in the list or by an earlier visit to this URL
    if (ldp.tqTabs?.some(t => t.name === qname)) return undefined;

    // Caching the resolved report is right even if we have since
    // navigated away, but reporting its failure is not: that error
    // belongs to a page the user is no longer looking at.
    resolveTemplatedQuery(intl, stripes, qname)
      .then(query => ldp.addTqTab(query))
      .catch(e => { if (!cancelled) setError(e.message); });

    return () => { cancelled = true; };
  }, [intl, stripes, ldp, qname]);

  if (error) return <BigError message={error} />;
  if (!tab) return <Loading size="large" />;

  return <TemplatedQuery query={tab} />;
}

export default TemplatedQueryRoute;
