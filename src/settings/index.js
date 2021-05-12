import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';
import RecordLimits from './RecordLimits';
import TableAvailability from './TableAvailability';

export default class LdpSettings extends React.Component {
  pages = [
    {
      route: 'limits',
      label: <FormattedMessage id="ui-ldp.settings.record-limits" />,
      component: RecordLimits,
    },
    {
      route: 'tables',
      label: <FormattedMessage id="ui-ldp.settings.table-availability" />,
      component: TableAvailability,
    },
  ];

  render() {
    return (
      <Settings {...this.props} pages={this.pages} paneTitle={<FormattedMessage id="ui-ldp.meta.title" />} />
    );
  }
}
