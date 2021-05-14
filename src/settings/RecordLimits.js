import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field } from 'redux-form';
import { ConfigManager } from '@folio/stripes/smart-components';
import { Col, Row, Select } from '@folio/stripes/components';
import { LdpContext } from '../LdpContext';
import generateOptions from '../util/generateOptions';


class RecordLimits extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    label: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.configManager = props.stripes.connect(ConfigManager);
  }

  getInitialValues = (settings) => {
    const value = settings.length === 0 ? '' : settings[0].value;
    const defaultConfig = { defaultShow: 100, maxShow: 1000, maxExport: 10000 };
    let config;

    try {
      config = { ...defaultConfig, ...JSON.parse(value) };
    } catch (e) {
      config = defaultConfig;
    }

    return config;
  }

  beforeSave = (data) => {
    const { defaultShow, maxShow, maxExport } = data;
    return JSON.stringify({ defaultShow, maxShow, maxExport });
  }

  afterSave = (setting, ldp) => {
    const data = JSON.parse(setting.value);
    ldp.defaultShow = data.defaultShow;
    ldp.maxShow = data.maxShow;
    ldp.maxExport = data.maxExport;
  }

  render() {
    return (
      <LdpContext.Consumer>
        {ldp => (
          <this.configManager
            label={this.props.label}
            moduleName="LDP"
            configName="recordLimits"
            getInitialValues={this.getInitialValues}
            onBeforeSave={this.beforeSave}
            onAfterSave={setting => this.afterSave(setting, ldp)}
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
          </this.configManager>
        )}
      </LdpContext.Consumer>
    );
  }
}

export default injectIntl(RecordLimits);
