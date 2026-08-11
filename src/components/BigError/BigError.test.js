import React from 'react';
import { screen } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import renderWithIntl from '../../../test/jest/helpers/renderWithIntl';
import BigError from './BigError';

describe('BigError', () => {
  beforeEach(() => {
    window.location.reload.mockClear();
  });

  it('renders the translated headline', () => {
    renderWithIntl(<BigError message="Connection refused" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Something went wrong.');
  });

  it('renders the message it was given', () => {
    renderWithIntl(<BigError message="Connection refused" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Connection refused');
  });

  it('renders without a message', () => {
    // message is an optional prop, and several callers pass an
    // undefined error rather than checking first.
    renderWithIntl(<BigError />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Something went wrong.');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('');
  });

  it('renders a refresh button', () => {
    renderWithIntl(<BigError message="Connection refused" />);
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
  });

  it('reloads the page only once the refresh button is clicked', async () => {
    renderWithIntl(<BigError message="Connection refused" />);
    expect(window.location.reload).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button', { name: 'Refresh' }));
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
