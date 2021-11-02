import React from 'react';
import LdpConfig from './components/LdpConfig';

function SavedQueriesConfig(props) {
  return (
    <LdpConfig
      {...props}
      configKey="sqconfig"
      fields={[
        { name: 'repo', xs: 12 },
        { name: 'user', xs: 6 },
        { name: 'pass', xs: 6 },
        { name: 'privateKey', xs: 12 },
      ]}
    />
  );
}

export default SavedQueriesConfig;
