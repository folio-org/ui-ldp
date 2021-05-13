import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// import { Field } from 'redux-form'; // XXX DELETE THIS LINE TO PROVOKE ERROR
import { ConfigManager } from '@folio/stripes/smart-components';

export default class RecordLimits extends React.Component {
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

  render() {
    return (
      <this.configManager label={this.props.label} moduleName="LDP" configName="recordLimits">
        blah blah blah
      </this.configManager>
    );
  }
}
