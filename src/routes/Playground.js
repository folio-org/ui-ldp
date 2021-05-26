import React, { useState } from 'react';
import { Paneset, Pane, PaneHeader, Button, MultiColumnList } from '@folio/stripes/components';

export default function Coburn() {
  const [nrows, setNrows] = useState(10);

  const onClick = (e) => {
    e.preventDefault();
    const elem = document.getElementById('nrows');
    setNrows(parseInt(elem.value, 10));
  };

  const contentData = Array(nrows)
    .fill()
    .map((_val, index) => index + 1)
    .map(val => ({ Value: val, Squared: val * val, Cubed: val * val * val }));

  return (
    <Paneset>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ height: 'auto' }}>
          <Paneset nested static>
            <Pane defaultWidth="50%" paneTitle="Query">
              <form onSubmit={onClick}>
                Number of rows to display:
                {' '}
                <input id="nrows" defaultValue={nrows} />
                <br />
                <Button type="submit" onClick={onClick}>
                  Go!
                </Button>
              </form>
            </Pane>
            <Pane defaultWidth="fill" paneTitle="Debug info">
              nrows = {typeof nrows} {nrows}
              <pre>
                {JSON.stringify(contentData[contentData.length-1], null, 2)}
              </pre>
            </Pane>
          </Paneset>
        </div>
        <div style={{ height: '100%' }}>
          <div style={{ height: '100%' }}>
            <MultiColumnList contentData={contentData} virtualize autosize />
          </div>
        </div>
      </div>
    </Paneset>
  );
}
