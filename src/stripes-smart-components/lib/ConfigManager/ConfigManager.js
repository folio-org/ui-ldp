import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import { Callout } from '@folio/stripes/components';

import ConfigReduxForm from './ConfigReduxForm';
import ConfigFinalForm from './ConfigFinalForm';

class ConfigManager extends React.Component {
  static manifest = Object.freeze({
    recordId: {},
    settings: {
      type: 'okapi',
      records: 'configs',
      path: (_q, _p, _r, logger, props) => {
        let res;
        if (props.moduleName) {
          res = `configurations/entries?query=(module==${props.moduleName} and configName==${props.configName})`;
          logger.log('action', 'returning mod-configuration path', res);
        } else {
          res = `settings/entries?query=(scope==${props.scope} and key==${props.key})`;
          logger.log('action', 'returning mod-settings path', res);
        }
        return res;
      },
      POST: {
        path: (_q, _p, _r, _l, props) => {
          return `${props.moduleName ? 'configurations' : 'settings'}/entries`;
        },
      },
      PUT: {
        path: (_q, _p, _r, _l, props) => {
          return `${props.moduleName ? 'configurations' : 'settings'}/entries`;
        },
      },
    },
  });

  static propTypes = {
    calloutMessage: PropTypes.node,
    children: PropTypes.node,
    configFormComponent: PropTypes.func,
    configName: PropTypes.string,       // either this or key is required
    formType: PropTypes.oneOf(['redux-form', 'final-form']),
    getInitialValues: PropTypes.func,
    key: PropTypes.string,              // either this or configName is required
    label: PropTypes.node.isRequired,
    moduleName: PropTypes.string,       // either this or scope is required
    mutator: PropTypes.shape({
      recordId: PropTypes.shape({
        replace: PropTypes.func,
      }),
      settings: PropTypes.shape({
        POST: PropTypes.func,
        PUT: PropTypes.func,
      }),
    }).isRequired,
    onAfterSave: PropTypes.func,
    onBeforeSave: PropTypes.func,
    resources: PropTypes.object.isRequired,
    scope: PropTypes.string,            // either this or moduleName is required
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }),
    validate: PropTypes.func,
  };

  static defaultProps = {
    calloutMessage: <FormattedMessage id="stripes-smart-components.cm.success" />,
    formType: 'redux-form',
  };

  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  onSave(data) {
    const { resources, mutator, moduleName, configName, scope, key, calloutMessage, onBeforeSave, onAfterSave } = this.props;
    const value = (onBeforeSave) ? onBeforeSave(data) : data[moduleName ? configName : key];
    // eslint-disable-next-line prefer-object-spread
    const setting = Object.assign(
      {},
      resources.settings.records[0],
      { value },
      (moduleName ?
        { module: moduleName, configName } :
        { scope, key })
    );

    const action = (setting.id) ? 'PUT' : 'POST';
    if (!moduleName && !setting.id) setting.id = uuidv4();

    if (setting.id) mutator.recordId.replace(setting.id);
    if (setting.metadata) delete setting.metadata;

    return mutator.settings[action](setting).then(() => {
      if (this.callout) {
        this.callout.sendCallout({ message: calloutMessage });
      }
      if (onAfterSave) onAfterSave(setting);
    });
  }

  getConfigForm() {
    const { label, children, formType } = this.props;
    const initialValues = this.getInitialValues();
    const ConfigForm = formType === 'redux-form' ? ConfigReduxForm : ConfigFinalForm;
    const ConfigFormComponent = (this.props.configFormComponent) ?
      this.props.configFormComponent : ConfigForm;

    return (
      <ConfigFormComponent
        onSubmit={this.onSave}
        validate={this.props.validate}
        initialValues={initialValues}
        label={label}
        stripes={this.props.stripes}
      >
        {children}
      </ConfigFormComponent>
    );
  }

  getInitialValues() {
    const { resources, moduleName, configName, key, getInitialValues } = this.props;
    const settings = (resources.settings || {}).records || [];

    if (getInitialValues) {
      return getInitialValues(settings);
    }

    const value = settings.length === 0 ? '' : settings[0].value;
    return { [moduleName ? configName : key]: value };
  }

  render() {
    const settings = (this.props.resources.settings || {});

    if (settings && settings.hasLoaded) {
      return (
        <div style={{ width: '100%' }}>
          {this.getConfigForm()}
          <Callout ref={(ref) => { this.callout = ref; }} />
        </div>
      );
    }

    return <div />;
  }
}

export default ConfigManager;
