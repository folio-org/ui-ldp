import 'regenerator-runtime/runtime';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory, Switch, Route } from 'react-router-dom';
import { Loading, Paneset, Pane, NavList, NavListSection, NavListItem, IconButton } from '@folio/stripes/components';
import loadConfig from './util/loadConfig';
import { LdpContext } from './LdpContext';
import BigError from './components/BigError';
import QueryBuilderRoute from './routes/QueryBuilderRoute';
import SavedQueriesRoute from './routes/SavedQueriesRoute';
import TemplatedQueriesRoute from './routes/TemplatedQueriesRoute';
import TemplatedQueryRoute from './routes/TemplatedQueryRoute';
import LogsRoute from './routes/LogsRoute';
import UpdatesRoute from './routes/UpdatesRoute';
import Playground from './routes/Playground';
import Settings from './settings';

const LdpConfig = {};

const Ldp = (props) => {
  const { actAs, stripes, match } = props;
  const [navTo, setNavTo] = useState(); // Used to force navigation from outside the router
  const history = useHistory();
  const intl = useIntl();
  const [configLoaded, setConfigLoaded] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    loadConfig(intl, stripes, LdpConfig, setConfigLoaded, setError);
  }, [intl, stripes, stripes.okapi]);

  if (error) return <BigError message={error} />;
  if (!configLoaded) return <Loading size="xlarge" />;

  if (navTo) {
    // This emits a "Cannot update during an existing state transition" warning, but works
    history.push('/ldp/templated');
    setNavTo(undefined);
  }

  const showDevInfo = stripes.config?.showDevInfo;

  return (
    <LdpContext.Provider value={LdpConfig}>
      {actAs === 'settings' ?
        <Settings {...props} /> :
        <Paneset>
          <Pane defaultWidth="25%" paneTitle={<FormattedMessage id="ui-ldp.nav" />}>
            <NavList>
              <NavListSection activeLink={window.location.pathname}>
                <NavListItem data-cy="nav-queryBuilder" to={`${match.path}`}>
                  <FormattedMessage id="ui-ldp.nav.query-builder" />
                </NavListItem>
                <NavListItem data-cy="nav-savedQueries" to={`${match.path}/queries`}>
                  <FormattedMessage id="ui-ldp.nav.saved-queries" />
                </NavListItem>
                <NavListItem data-cy="nav-info" to={`${match.path}/info/updates`}>
                  <FormattedMessage id="ui-ldp.nav.info" />
                </NavListItem>
              </NavListSection>
              <br />
              <NavListSection activeLink={window.location.pathname}>
                <NavListItem data-cy="nav-templatedQueries" to={`${match.path}/templated`}>
                  <FormattedMessage id="ui-ldp.nav.templated-queries" />
                </NavListItem>
                {
                  LdpConfig.tqTabs?.map((tab, i) => (
                    <NavListItem key={tab.name} data-cy={`nav-tq-${tab.name}`} to={`${match.path}/tq/${tab.name}`}>
                      <IconButton
                        icon="times"
                        style={{ border: '1px solid #e0e0e0', marginRight: 10 }}
                        onClick={() => {
                          LdpConfig.tqTabs.splice(i, 1);
                          // For some reason, history.push('/ldp/templated') does nothing when invoked here
                          setNavTo('/ldp/templated');
                        }}
                      />
                      {tab.json?.displayName || tab.name}
                    </NavListItem>
                  ))
                }
                {showDevInfo &&
                  <>
                    <NavListItem data-cy="nav-logs" to={`${match.path}/logs`}>
                      <FormattedMessage id="ui-ldp.nav.logs" />
                    </NavListItem>
                    <NavListItem data-cy="nav-playground" to={`${match.path}/playground`}>
                      <FormattedMessage id="ui-ldp.nav.playground" />
                    </NavListItem>
                  </>
                }
              </NavListSection>
            </NavList>
          </Pane>

          <Switch>
            <Route
              path={match.path}
              exact
              component={QueryBuilderRoute}
            />
            <Route
              path={`${match.path}/queries`}
              exact
              component={SavedQueriesRoute}
            />
            <Route
              path={`${match.path}/templated`}
              exact
              component={TemplatedQueriesRoute}
            />
            <Route
              path={`${match.path}/tq`}
              component={TemplatedQueryRoute}
            />
            <Route
              path={`${match.path}/logs`}
              exact
              component={LogsRoute}
            />
            <Route path={`${match.path}/info/logs`} exact component={LogsRoute} />
            <Route path={`${match.path}/info/updates`} exact component={UpdatesRoute} />
            <Route path={`${match.path}/info/processes`} exact component={UpdatesRoute} />
            <Route
              path={`${match.path}/playground`}
              exact
              component={Playground}
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
    config: PropTypes.shape({
      showDevInfo: PropTypes.bool,
    }),
    connect: PropTypes.func
  })
};

export default Ldp;
