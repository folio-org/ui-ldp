import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Pane, LoadingPane } from '@folio/stripes/components';
import BigError from '../components/BigError';
import stripesFetch from '../util/stripesFetch';


function DatabaseConfig(props) {
  const [config, setConfig] = useState();
  const [error, setError] = useState();
  const stripes = useStripes();

  useEffect(() => {
    async function fetchData() {
      const res = await stripesFetch(stripes, '/ldp/config/dbinfo');
      if (res.ok) {
        const json = await res.json();
        setConfig(JSON.parse(json.value));
      } else {
        const content = await res.text();
        setError(`${res.statusText}: ${content}`);
      }
    }
    fetchData();
  }, [stripes]);

  if (error) return <BigError message={error} />;
  if (!config) return <LoadingPane />;

  return (
    <Pane paneTitle={props.label} defaultWidth="fill">
      <p>
        <FormattedMessage id="ui-ldp.settings.database-configuration.url" />:
        &nbsp;
        <b>{config.url}</b>
      </p>
      <p>
        <FormattedMessage id="ui-ldp.settings.database-configuration.user" />:
        &nbsp;
        <b>{config.user}</b>
      </p>
      <p>
        <FormattedMessage id="ui-ldp.settings.database-configuration.pass" />:
        &nbsp;
        <b>{config.pass}</b>
      </p>
    </Pane>
  );
}


DatabaseConfig.propTypes = {
  label: PropTypes.node.isRequired,
};


export default DatabaseConfig;
