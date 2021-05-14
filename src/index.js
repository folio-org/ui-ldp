import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { NavList, NavListItem, NavListSection, Paneset, Pane } from '@folio/stripes-components';
import { LdpContext } from './LdpContext';
import QueryBuilder from './routes/QueryBuilder';
import Logs from './routes/Logs';
import Settings from './settings';

const LdpConfig = {
  defaultShow: null,
  maxShow: null,
  maxExport: null,
};

class Ldp extends React.Component {
  static propTypes = {
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

  render() {
    const {
      actAs,
      stripes: {
        okapi
      },
      match: {
        path
      }
    } = this.props;

    return (
      <LdpContext.Provider value={LdpConfig}>
        {actAs === 'settings' ?
          <Settings {...this.props} /> :
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
                render={(props) => <QueryBuilder {...props} okapi={okapi} />}
              />
              <Route
                path={`${path}/logs`}
                exact
                render={(props) => <Logs {...props} okapi={okapi} />}
              />
            </Switch>
          </Paneset>
        }
      </LdpContext.Provider>
    );
  }
}

export default Ldp;
