import React from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useLdp } from '../LdpContext';
import BigError from '../components/BigError';
import TemplatedQuery from '../components/TemplatedQuery';

function TemplatedQueryRoute() {
  const intl = useIntl();
  const location = useLocation();
  const ldp = useLdp();

  const qname = location.pathname.replace('/ldp/tq/', '');
  const matching = ldp.tqTabs?.filter(tab => tab.name === qname);
  if (!matching || matching.length === 0) {
    const error = intl.formatMessage(
      { id: 'ui-ldp.error.no-such-query' },
      { qname }
    );
    return <BigError message={error} />;
  }

  return <TemplatedQuery query={matching[0]} />;
}

export default TemplatedQueryRoute;
