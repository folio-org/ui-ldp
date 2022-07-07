import React from 'react';
import { useIntl } from 'react-intl';
import LdpConfig from './components/LdpConfig';

function SavedQueriesConfig(props) {
  const intl = useIntl();

  return (
    <LdpConfig
      {...props}
      configKey="sqconfig"
      fields={[
        { name: 'owner', xs: 4 },
        { name: 'repo', xs: 4 },
        { name: 'branch', xs: 4 },
        { name: 'token', xs: 12, fakeReadOnly: true, placeholder: intl.formatMessage({ id: 'ui-ldp.placeholder.hidden' }) },
      ]}
    />
  );
}

export default SavedQueriesConfig;
