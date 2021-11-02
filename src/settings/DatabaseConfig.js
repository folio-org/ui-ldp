import React from 'react';
import LdpConfig from './components/LdpConfig';

function DatabaseConfig(props) {
  return (
    <LdpConfig
      {...props}
      configKey="dbinfo"
      fields={[
        { name: 'url', xs: 12 },
        { name: 'user', xs: 6 },
        { name: 'pass', xs: 6 },
      ]}
    />
  );
}

export default DatabaseConfig;
