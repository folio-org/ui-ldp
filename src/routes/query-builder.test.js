import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch from 'cross-fetch';

import '../../test/jest/__mock__';
import { ldpColumnsResponse } from './__mock__/ldpColumnsResponse.mock';
import { ldpTablesResponse } from './__mock__/ldpTablesResponse.mock';
import { renderWithIntl } from '../../test/jest/helpers';
import QueryBuilderPage from './query-builder-page';

jest.mock('cross-fetch');

describe('App', () => {
  beforeEach(() => {
    fetch.mockResolvedValue(ldpTablesResponse);
    renderWithIntl(
      <QueryBuilderPage okapi={{
        url: 'dummy.com',
        tenant: 'dummyTenant',
        token: 'dummyToken'
      }}
      />
    );
  });

  test('renders Table component', async () => {
    const tableLabel = await screen.findByText('Table');
    expect(tableLabel).toBeInTheDocument();

    fetch.mockResolvedValue(ldpColumnsResponse);

    const tableSelectionButton = await screen.getByRole('button', { name: /table/i });

    userEvent.click(tableSelectionButton);
    await waitFor(() => screen.getByRole('option', { name: /user_users/i }));

    userEvent.click(screen.getByRole('option', { name: /user_users/i }));
    await waitFor(() => screen.getByRole('button', { name: /submit/i }));
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => screen.getByRole('button', { name: /submit/i })); // wait needed or jest complains about act()
  });
});
