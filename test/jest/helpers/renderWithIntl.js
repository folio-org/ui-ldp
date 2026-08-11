import React from 'react';
import { render } from '@folio/jest-config-stripes/testing-library/react';

import { Harness } from '../../helpers';

const renderWithIntl = (children, stripesCustomProps) => render(
  <Harness stripesCustomProps={stripesCustomProps}>
    {children}
  </Harness>
);

export default renderWithIntl;
