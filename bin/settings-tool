#!/usr/bin/env node

import Folio from '@indexdata/foliojs';

const op = process.argv[2];
const arg = process.argv[3];
if (process.argv.length < 3 || (op !== 'find' && op !== 'delete')) {
  console.error('Usage:', process.argv[1], '<find [<query>]|delete <id>');
  process.exit(1);
}

const [_, session] = await Folio.defaultSetup();

if (op === 'find') {
  let url = '/settings/entries?limit=100';
  if (arg !== undefined) {
    url = `${url}&query=${arg}`;
  }
  const body = await session.folioFetch(url);
  console.log(JSON.stringify(body, null, 2));
} else if (op == 'delete') {
  if (arg === undefined) {
    console.error(process.argv[1], '"delete" operation needs <id>');
    process.exit(1);
  }
  const body = await session.folioFetch(`/settings/entries/${arg}`, { method: 'DELETE' });
  console.log(JSON.stringify(body, null, 2));
}

session.close();
process.exit(0);
