import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { NavList, NavListItem, NavListSection, Paneset, Pane } from '@folio/stripes-components';
import QueryBuilder from './routes/QueryBuilder';
import LogsPage from './routes/Logs';
import Settings from './settings';

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

    if (actAs === 'settings') {
      return <Settings {...this.props} />;
    }
    return (
      <div style={{ position: 'absolute', display: 'flex', height: '100%', width: '100%' }}>
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
              render={(props) => <LogsPage {...props} okapi={okapi} />}
            />
          </Switch>
        </Paneset>
      </div>
    );
  }
}

export default Ldp;
