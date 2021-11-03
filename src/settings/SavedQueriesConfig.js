import React from 'react';
import LdpConfig from './components/LdpConfig';

function SavedQueriesConfig(props) {
  return (
    <LdpConfig
      {...props}
      configKey="sqconfig"
      fields={[
        { name: 'repo', xs: 12 },
        { name: 'token', xs: 12 },
      ]}
    />
  );
}

export default SavedQueriesConfig;
