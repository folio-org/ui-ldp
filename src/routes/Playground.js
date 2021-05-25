import React from 'react';
import { Paneset, Pane, PaneHeader, Button } from '@folio/stripes/components';

export default function Coburn() {
  return (
    <Paneset>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ height: 'auto' }}>
          <Paneset nested static>
            <Pane defaultWidth="50%" paneTitle="Query">
              Query content
            </Pane>
            <Pane defaultWidth="fill" paneTitle="Debug info">
              Debug content
            </Pane>
          </Paneset>
        </div>
        <div>
          <PaneHeader paneTitle="Results" />
          <Button fullWidth>Test</Button>
        </div>
      </div>
    </Paneset>
  );
}
