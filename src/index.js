import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import App from './routes/app';
import ExamplePage from './routes/example-page';
import Settings from './settings';

/*
  STRIPES-NEW-APP
  This is the main entry point into your new app.
*/

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

    this.connectedExamplePage = props.stripes.connect(ExamplePage);
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
      <Switch>
        <Route
          path={path}
          exact
          component={App}
        />
        <Route
          path={`${path}/examples`}
          exact
          component={this.connectedExamplePage}
        />
      </Switch>
    );
  }
}

export default Ldp;
