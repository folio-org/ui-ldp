import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { ConfigManager } from '@folio/stripes/smart-components';
import { Col, Row, TextField } from '@folio/stripes/components';


function DatabaseConfig(props) {
  const intl = useIntl();
  const [ConnectedConfigManager, setConfigManager] = useState();

  useEffect(() => {
    setConfigManager(props.stripes.connect(ConfigManager));
  }, [props.stripes]);

  if (!ConnectedConfigManager) return null;

  const getInitialValues = (settings) => {
    let config = settings.length === 0 ? {} : settings[0].value;
    if (typeof config === 'string') {
      config = JSON.parse(config);
    }
    return { ...config, pass: config.pass ? '********' : '' };
  };

  const beforeSave = (data) => {
    return JSON.stringify(data);
  };

  return (
    <ConnectedConfigManager
      formType="final-form"
      label={props.label}
      scope="ui-ldp.admin"
      configName="dbinfo"
      getInitialValues={getInitialValues}
      onBeforeSave={beforeSave}
    >
      <Row>
        <Col xs={12} id="url">
          <FormattedMessage id="ui-ldp.settings.dbinfo.url">
            {label => (
              <Field
                id="url"
                name="url"
                label={label}
                component={TextField}
              />
            )}
          </FormattedMessage>
        </Col>
      </Row>
      <Row>
        <Col xs={6} id="user">
          <FormattedMessage id="ui-ldp.settings.dbinfo.user">
            {label => (
              <Field
                id="user"
                name="user"
                label={label}
                component={TextField}
              />
            )}
          </FormattedMessage>
        </Col>
        <Col xs={6} id="pass">
          <FormattedMessage id="ui-ldp.settings.dbinfo.pass">
            {label => (
              <Field
                id="pass"
                name="pass"
                label={label}
                component={TextField}
                placeholder={intl.formatMessage({ id: 'ui-ldp.placeholder.hidden' })}
              />
            )}
          </FormattedMessage>
        </Col>
      </Row>
    </ConnectedConfigManager>
  );
}


DatabaseConfig.propTypes = {
  stripes: PropTypes.shape({
    connect: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.node.isRequired,
};


export default DatabaseConfig;
