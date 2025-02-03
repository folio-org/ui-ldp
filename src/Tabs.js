import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Pane, Button, ButtonGroup } from '@folio/stripes/components';


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


function Tabs({ version, children }) {
  const location = useLocation();
  const stripes = useStripes();

  return (
    <Pane paneTitle={<FormattedMessage id="ui-ldp.dbinfo.version" values={{ version }} />}>
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
  version: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};


export default Tabs;
