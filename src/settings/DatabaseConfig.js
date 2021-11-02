import isEqual from 'lodash/isEqual';
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes, CalloutContext } from '@folio/stripes/core';
import { LoadingPane, Pane, Row, Col, TextField, Button } from '@folio/stripes/components';
import BigError from '../components/BigError';
import stripesFetch from '../util/stripesFetch';


// Batch the fields up into rows whose xs values total no more than 12
function compileRows(fields) {
  const rows = [];

  let row = [];
  let acc = 0;
  fields.forEach(field => {
    if (row.length > 0 && field.xs + acc > 12) {
      rows.push(row);
      row = [];
      acc = 0;
    }
    row.push(field);
    acc += field.xs;
  });
  rows.push(row);

  return rows;
}


function DatabaseConfig(props) {
  const key = 'dbinfo';
  const fields = [
    { name: 'url', xs: 12 },
    { name: 'user', xs: 6 },
    { name: 'pass', xs: 6 },
  ];

  const [loadedConfig, setLoadedConfig] = useState();
  const [currentConfig, setCurrentConfig] = useState({});
  const [error, setError] = useState();
  const [submitting, setSubmitting] = useState(false);
  const stripes = useStripes();
  const callout = useContext(CalloutContext);

  useEffect(() => {
    async function fetchData() {
      const res = await stripesFetch(stripes, `/ldp/config/${key}`);
      if (res.ok) {
        const json = await res.json();
        const data = JSON.parse(json.value);
        setLoadedConfig(data);
        setCurrentConfig(data);
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
    const res = await stripesFetch(stripes, `/ldp/config/${key}`, {
      method: 'PUT',
      body: JSON.stringify({
        key,
        tenant: stripes.okapi.tenant,
        value: JSON.stringify(currentConfig),
      }),
    });

    setSubmitting(false);
    if (res.ok) {
      setLoadedConfig(currentConfig);
      callout.sendCallout({
        // eslint-disable-next-line @calm/react-intl/missing-attribute
        message: <FormattedMessage id={`ui-ldp.settings.${key}.update.ok`} />
      });
    } else {
      const content = await res.text();
      setError(`${res.statusText}: ${content}`);
    }
  };

  const rows = compileRows(fields);
  const disabled = (submitting || isEqual(currentConfig, loadedConfig));

  return (
    <Pane paneTitle={props.label} defaultWidth="fill">
      {rows.map((row, i) => (
        <Row key={i}>
          {row.map((field, j) => (
            <Col key={j} xs={field.xs}>
              <TextField
                // eslint-disable-next-line @calm/react-intl/missing-attribute
                label={<FormattedMessage id={`ui-ldp.settings.${key}.${field.name}`} />}
                value={currentConfig[field.name]}
                onChange={e => setCurrentConfig({ ...currentConfig, [field.name]: e.target.value })}
              />
            </Col>
          ))}
        </Row>
      ))}
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
