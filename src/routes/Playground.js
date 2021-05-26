import React from 'react';
import { Paneset, Pane, PaneHeader, Button, MultiColumnList } from '@folio/stripes/components';

const contentData = Array(30)
  .fill()
  .map((_val, index) => index + 1)
  .map(val => ({ Value: val, Squared: val * val, Cubed: val * val * val }));

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
          <div style={{ height: 400 }}>
            <MultiColumnList contentData={contentData} virtualize autosize />
          </div>
        </div>
      </div>
    </Paneset>
  );
}
