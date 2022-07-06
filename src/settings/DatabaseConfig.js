import React from 'react';
import { useIntl } from 'react-intl';
import LdpConfig from './components/LdpConfig';

function DatabaseConfig(props) {
  const intl = useIntl();

  return (
    <LdpConfig
      {...props}
      configKey="dbinfo"
      fields={[
        { name: 'url', xs: 12 },
        { name: 'user', xs: 6 },
        { name: 'pass', xs: 6, placeholder: intl.formatMessage({ id: 'ui-ldp.placeholder.hidden' }) },
      ]}
    />
  );
}

export default DatabaseConfig;
