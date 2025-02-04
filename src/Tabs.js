import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Pane, Button, ButtonGroup } from '@folio/stripes/components';
import BigError from './components/BigError';
import loadData from './util/loadData';


// XXX Use visible permissions defined by the UI in place of these low-level permissions
const segments = [{
  name: 'logs',
  perm: 'ldp.log.get',
}, {
  name: 'updates',
  perm: 'ldp.updates.read',
}, {
  name: 'processes',
  perm: 'ldp.processes.read',
}];


function Tabs({ children }) {
  const intl = useIntl();
  const location = useLocation();
  const stripes = useStripes();
  const [version, setVersion] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    loadData(intl, stripes, 'version', '/ldp/db/version', setVersion, setError);
  }, [intl, stripes]);

  if (error) {
    return <BigError message={error} />;
  }

  return (
    <Pane defaultWidth="fill" paneTitle={<FormattedMessage id="ui-ldp.dbinfo.version" values={{ version: version?.version }} />}>
      <div style={{ margin: '0.75em auto', justifyContent: 'center' }}>
        <ButtonGroup>
          {
            segments.filter(({ perm }) => stripes.hasPerm(perm)).map(({ name }) => {
              const effectiveTab = location.pathname.replace(/^\/ldp\/info\//, '').replace(/\/.*/, '');
              const selected = (effectiveTab === name);
              return (
                <Button
                  key={`${name}`}
                  to={`/ldp/info/${name}`}
                  buttonStyle={selected ? 'primary' : 'default'}
                  aria-selected={selected}
                >
                  <FormattedMessage id={`ui-ldp.dbinfo.nav.${name}`} />
                </Button>
              );
            })
          }
        </ButtonGroup>
      </div>
      {children}
    </Pane>
  );
}


Tabs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};


export default Tabs;
