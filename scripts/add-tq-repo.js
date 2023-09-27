#!/usr/bin/env node

// Run as: ./add-tq-repo.js PASSWORD
// See also: foliojs/bin/folio-port-ldp-queries.js

import Folio from '@indexdata/foliojs';

const id = 'bd76ccec-2942-41f2-9bde-38f562d41842';
const json = {
  id,
  scope: 'ui-ldp.admin',
  key: 'tqrepos',
  value: [
    {
      user: 'MikeTaylor',
      repo: 'dummy-ldp-queries',
      branch: 'main',
      dir: 'queries'
    },
    {
      user: 'folio-org',
      repo: 'folio-analytics',
      branch: 'count_loans_and_renewals_ldp',
      dir: 'reports/count_loans_and_renewals'
    },
  ],
};

if (process.argv.length !== 3) throw new Error(`Usage: ${process.argv[1]} <password>`);
const password = process.argv[2];
const service = Folio.service('https://folio-snapshot-okapi.dev.folio.org');
const session = await service.login('diku', 'diku_admin', password);

try {
  await session.folioFetch('/settings/entries', { json });
} catch (e) {
  if (e.status !== 403) throw e;
  // The setting already exists and must be overwritten
  await session.folioFetch(`/settings/entries/${id}`, { method: 'PUT', json });
}
session.close();
