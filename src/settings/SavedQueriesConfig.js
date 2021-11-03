import React from 'react';
import LdpConfig from './components/LdpConfig';

function SavedQueriesConfig(props) {
  return (
    <LdpConfig
      {...props}
      configKey="sqconfig"
      fields={[
        { name: 'owner', xs: 4 },
        { name: 'repo', xs: 4 },
        { name: 'branch', xs: 4 },
        { name: 'token', xs: 12 },
      ]}
    />
  );
}

export default SavedQueriesConfig;
