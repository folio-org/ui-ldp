#!/usr/bin/env node

// Run as: ./add-charts.js PASSWORD < charts.js
// See also: foliojs/bin/folio-port-ldp-queries.js

import fs from 'fs';
// @indexdata/foliojs is required by ./package.json but not by ../package.json and this confuses ESLint
// eslint-disable-next-line import/no-unresolved
import Folio from '@indexdata/foliojs';

var data = fs.readFileSync(process.stdin.fd, 'utf-8');
const jsons = JSON.parse(data);

if (process.argv.length !== 3) throw new Error(`Usage: ${process.argv[1]} <password>`);
const password = process.argv[2];
const service = Folio.service('https://indexdata-test-okapi.folio.indexdata.com');
const session = await service.login('indexdata', 'id_admin', password);

for (const json of jsons) {
  try {
    console.log(`trying to replace ${json.id} (${json.value.name})`);
    await session.folioFetch(`/settings/entries/${json.id}`, { method: 'PUT', json });
  } catch (e) {
    if (e.status !== 404) throw e;
    // The setting does not yet exist and must be created
    console.log(`trying to create ${json.id} (${json.value.name})`);
    await session.folioFetch('/settings/entries', { json });
  }
}

session.close();
