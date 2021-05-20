import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { NavList, NavListItem, NavListSection, Paneset, Pane } from '@folio/stripes-components';
// import loadConfig from '../util/loadConfig';
import { LdpContext } from './LdpContext';
import QueryBuilderRoute from './routes/QueryBuilderRoute';
import Logs from './routes/Logs';
import Settings from './settings';

const LdpConfig = {
  defaultShow: null,
  maxShow: null,
  maxExport: null,
};

const Ldp = (props) => {
  const {
    actAs,
    stripes: {
      okapi
    },
    match: {
      path
    }
  } = props;

  return (
    <LdpContext.Provider value={LdpConfig}>
      {actAs === 'settings' ?
        <Settings {...props} /> :
        <Paneset>
          <Pane defaultWidth="15%">
            <NavList>
              <NavListSection activeLink={window.location.pathname}>
                <NavListItem to={`${path}`}>Query Builder</NavListItem>
                {/* <NavListItem to={`${path}/logs`}>Logs</NavListItem> */}
              </NavListSection>
            </NavList>
          </Pane>

          <Switch>
            <Route
              path={path}
              exact
              render={(props2) => <QueryBuilderRoute {...props2} okapi={okapi} />}
            />
            <Route
              path={`${path}/logs`}
              exact
              render={(props2) => <Logs {...props2} okapi={okapi} />}
            />
          </Switch>
        </Paneset>
      }
    </LdpContext.Provider>
  );
};

Ldp.propTypes = {
  match: PropTypes.object.isRequired,
  actAs: PropTypes.string.isRequired,
  stripes: PropTypes.shape({
    okapi: PropTypes.shape({
      url: PropTypes.string,
      tenant: PropTypes.string,
      token: PropTypes.string,
    }),
    connect: PropTypes.func
  })
};

export default Ldp;
