import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes, CalloutContext } from '@folio/stripes/core';
import { LoadingPane, Pane, Row, Col, TextField, Button } from '@folio/stripes/components';
import BigError from '../components/BigError';
import stripesFetch from '../util/stripesFetch';


function DatabaseConfig(props) {
  const [loadedConfig, setLoadedConfig] = useState();
  const [url, setUrl] = useState();
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [error, setError] = useState();
  const [submitting, setSubmitting] = useState(false);
  const stripes = useStripes();
  const callout = useContext(CalloutContext);

  useEffect(() => {
    async function fetchData() {
      const res = await stripesFetch(stripes, '/ldp/config/dbinfo');
      if (res.ok) {
        const json = await res.json();
        const data = JSON.parse(json.value);
        setLoadedConfig(data);
        setUrl(data.url);
        setUser(data.user);
        setPass(data.pass);
      } else {
        const content = await res.text();
        setError(`${res.statusText}: ${content}`);
      }
    }
    fetchData();
  }, [stripes]);

  if (error) return <BigError message={error} />;
  if (!loadedConfig) return <LoadingPane />;

  const saveData = async () => {
    setSubmitting(true);
    const newConfig = { url, user, pass };
    const res = await stripesFetch(stripes, '/ldp/config/dbinfo', {
      method: 'PUT',
      body: JSON.stringify({
        key: 'dbinfo',
        tenant: stripes.okapi.tenant,
        value: JSON.stringify(newConfig),
      }),
    });

    setSubmitting(false);
    if (res.ok) {
      setLoadedConfig(newConfig);
      callout.sendCallout({
        message: <FormattedMessage id="ui-ldp.settings.database-configuration.update.ok" />
      });
    } else {
      const content = await res.text();
      setError(`${res.statusText}: ${content}`);
    }
  };

  const disabled = (submitting ||
                    (url === loadedConfig.url &&
                     user === loadedConfig.user &&
                     pass === loadedConfig.pass));

  return (
    <Pane paneTitle={props.label} defaultWidth="fill">
      <Row>
        <Col xs={12}>
          <TextField
            label={<FormattedMessage id="ui-ldp.settings.database-configuration.url" />}
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <TextField
            label={<FormattedMessage id="ui-ldp.settings.database-configuration.user" />}
            value={user}
            onChange={e => setUser(e.target.value)}
          />
        </Col>
        <Col xs={6}>
          <TextField
            label={<FormattedMessage id="ui-ldp.settings.database-configuration.pass" />}
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Button buttonStyle="primary" onClick={saveData} disabled={disabled}>
            <FormattedMessage id="ui-ldp.button.submit" />
          </Button>
        </Col>
      </Row>
    </Pane>
  );
}


DatabaseConfig.propTypes = {
  label: PropTypes.node.isRequired,
};


export default DatabaseConfig;
