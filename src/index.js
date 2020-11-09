import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';
import QueryBuilderPage from './routes/query-builder-page';
import LogsPage from './routes/logs';
import Settings from './settings';
import { NavList, NavListItem, NavListSection, Paneset, Pane } from '@folio/stripes-components'

class Ldp extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
    stripes: PropTypes.shape({
      connect: PropTypes.func
    })
  };

  constructor(props) {
    super(props);

    // TODO: Curry okapi params into apiCall() function that can be imported
    process.env.okapi = props.stripes.okapi;

    this.connectedQueryBuilderPage = props.stripes.connect(QueryBuilderPage);
  }

  render() {
    const {
      showSettings,
      match: {
        path
      }
    } = this.props;
    
    if (showSettings) {
      return <Settings {...this.props} />;
    }
    return (
      <div style={{ position: 'absolute', display: 'flex', height: '100%', width: '100%',  }}>
        <Paneset>
          <Pane defaultWidth="15%">
            <NavList>
              <NavListSection activeLink={window.location.pathname}>
                <NavListItem to={`${path}`}>Query Builder</NavListItem>
                <NavListItem to={`${path}/logs`}>Logs</NavListItem>
              </NavListSection>
            </NavList>
          </Pane>
        
          <Switch>
            <Route
              path={path}
              exact
              component={this.connectedQueryBuilderPage}
            />
            {/* <Route
              path={`${path}/examples`}
              exact
              component={this.connectedExamplePage}
            /> */}
            <Route
              path={`${path}/logs`}
              exact
              component={LogsPage}
            />
          </Switch>
        </Paneset>
      </div>
    );
  }
}

export default Ldp;
