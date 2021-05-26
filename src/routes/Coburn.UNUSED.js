import React from 'react';
import { Paneset, Pane, PaneHeader, Button } from '@folio/stripes/components';

export default function Coburn() {
  return (
    <Paneset>
      <Pane defaultWidth="100%">
        <Paneset>
          <Pane
            defaultWidth="20%"
            renderHeader={renderProps => <PaneHeader {...renderProps} paneTitle="Filters" />}
          >
            Pane Content
          </Pane>
          <Paneset>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div style={{ height: 'auto' }}>
                <Paneset nested static>
                  <Pane
                    defaultWidth="20%"
                    renderHeader={renderProps => <PaneHeader {...renderProps} paneTitle="Filters" />}
                  >
                    Pane Content
                  </Pane>
                  <Pane
                    defaultWidth="fill"
                    renderHeader={renderProps => <PaneHeader {...renderProps} paneTitle="Search Results" />}
                  >
                    Pane Content
                  </Pane>
                </Paneset>
              </div>
              <div>
                <Button fullWidth>Test</Button>
              </div>
            </div>
          </Paneset>
        </Paneset>
      </Pane>
    </Paneset>
  );
}
