import React from 'react';
import { render } from '@testing-library/react';

import { Harness } from '../../helpers';

const renderWithIntl = (children, translations = [], stripes) => render(
  <Harness
    translations={translations}
    stripes={stripes}
  >
    {children}
  </Harness>
);

export default renderWithIntl;
