import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { ConfigManager } from '@folio/stripes/smart-components';
import { Col, Row, Select } from '@folio/stripes/components';
import { useLdp } from '../LdpContext';
import generateOptions from '../util/generateOptions';
import defaultConfig from '../util/defaultConfig';


function RecordLimits(props) {
  const ldp = useLdp();
  const [ConnectedConfigManager, setConfigManager] = useState();

  useEffect(() => {
    setConfigManager(props.stripes.connect(ConfigManager));
  }, [props.stripes]);

  if (!ConnectedConfigManager) return null;

  const getInitialValues = (settings) => {
    const value = settings.length === 0 ? '' : settings[0].value;
    let config;

    try {
      config = { ...defaultConfig, ...JSON.parse(value) };
    } catch (e) {
      config = defaultConfig;
    }

    return config;
  };

  const beforeSave = (data) => {
    ldp.defaultShow = data.defaultShow;
    ldp.maxShow = data.maxShow;
    ldp.maxExport = data.maxExport;
    return JSON.stringify(ldp);
  };

  const afterSave = (setting) => {
    beforeSave(JSON.parse(setting.value));
  };

  return (
    <ConnectedConfigManager
      formType="final-form"
      label={props.label}
      scope="ui-ldp.admin"
      configName="config"
      getInitialValues={getInitialValues}
      onBeforeSave={beforeSave}
      onAfterSave={afterSave}
    >
      <Row>
        <Col xs={12} id="select-default-show">
          <FormattedMessage id="ui-ldp.settings.record-limits.default-show">
            {label => (
              <Field
                id="defaultShow"
                name="defaultShow"
                label={label}
                component={Select}
                dataOptions={generateOptions(0, 3)}
                placeholder="---"
              />
            )}
          </FormattedMessage>
        </Col>
      </Row>
      <Row>
        <Col xs={12} id="select-max-show">
          <FormattedMessage id="ui-ldp.settings.record-limits.max-show">
            {label => (
              <Field
                id="maxShow"
                name="maxShow"
                label={label}
                component={Select}
                dataOptions={generateOptions(0, 4)}
                placeholder="---"
              />
            )}
          </FormattedMessage>
        </Col>
      </Row>
      <Row>
        <Col xs={12} id="select-max-export">
          <FormattedMessage id="ui-ldp.settings.record-limits.max-export">
            {label => (
              <Field
                id="maxExport"
                name="maxExport"
                label={label}
                component={Select}
                dataOptions={generateOptions(3, 3)}
                placeholder="---"
              />
            )}
          </FormattedMessage>
        </Col>
      </Row>
    </ConnectedConfigManager>
  );
}


RecordLimits.propTypes = {
  stripes: PropTypes.shape({
    connect: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.node.isRequired,
};


export default RecordLimits;
