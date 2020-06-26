import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

export default class FeatureSettings extends React.Component {
  static propTypes = {
    label: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Pane defaultWidth="fill" fluidContentWidth paneTitle={this.props.label}>
        <div data-test-application-settings-feature-message>
          <FormattedMessage id="ui-ldp.settings.some-feature.message" />
        </div>
      </Pane>
    );
  }
}
