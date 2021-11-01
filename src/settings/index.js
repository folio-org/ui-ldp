import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';
import RecordLimits from './RecordLimits';
import TableAvailability from './TableAvailability';
import DatabaseConfig from './DatabaseConfig';

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
    {
      route: 'dbconfig',
      label: <FormattedMessage id="ui-ldp.settings.database-configuration" />,
      component: DatabaseConfig,
    },
  ];

  render() {
    return (
      <Settings {...this.props} pages={this.pages} paneTitle={<FormattedMessage id="ui-ldp.meta.title" />} />
    );
  }
}
