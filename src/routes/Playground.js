import React from 'react';
import { Paneset, Pane, PaneHeader, Button } from '@folio/stripes/components';
import ResultsList from '../components/QueryBuilder/ResultsList';

const queryResponse = {
  key: 123,
  resp: Array(30)
    .fill()
    .map((_val, index) => index + 1)
    .map(val => ({ Value: val, Squared: val * val, Cubed: val * val * val })),
};

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
          <ResultsList results={queryResponse} />
        </div>
      </div>
    </Paneset>
  );
}
