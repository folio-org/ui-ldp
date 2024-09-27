#!/usr/bin/env node

// Run as: ./add-charts.js PASSWORD
// See also: foliojs/bin/folio-port-ldp-queries.js

// @indexdata/foliojs is required by ./package.json but not by ../package.json and this confuses ESLint
// eslint-disable-next-line import/no-unresolved
import Folio from '@indexdata/foliojs';

const jsons = [{
  id: '6db28306-bc1e-48f8-aca0-26aa489d958e',
  scope: 'ui-ldp.admin', // XXX should be changed to ui-ldp.dashboards when that exists
  key: 'chart-1',
  value: {
    name: 'Daily checkout counts through the year',
    query: {
      url: 'https://raw.githubusercontent.com/MikeTaylor/metadb-chart-queries/main/./checkins_by_date.sql',
      params: {
        start_date: '2023-09-01T05:00:00.000Z'
      },
      limit: 1000
    },
    chart: {
      // Params to say how to draw this using Chart.js
      type: 'line',
      labelsField: 'checkin_date',
    },
    datasets: [
      {
        label: 'Number of checkins',
        dataField: 'count',
      },
      {
        label: 'Incremented',
        dataField: 'more',
      },
      {
        label: 'Halved',
        dataField: 'less',
      },
    ],
  }
}, {
  id: '914e1299-2ddb-47f2-88a5-4e492f833c07',
  scope: 'ui-ldp.admin', // XXX should be changed to ui-ldp.dashboards when that exists
  key: 'chart-d06f9d68-6a39-4bc3-8263-4b1e06e5c5c1',
  value: {
    name: 'Daily checkout counts as a bar graph',
    query: {
      url: 'https://raw.githubusercontent.com/MikeTaylor/metadb-chart-queries/main/./checkins_by_date.sql',
      params: {
        start_date: '2023-09-01T05:00:00.000Z'
      },
      limit: 1000
    },
    chart: {
      // Params to say how to draw this using Chart.js
      type: 'bar',
      labelsField: 'checkin_date',
    },
    datasets: [
      {
        label: 'Number of checkins',
        dataField: 'count',
      },
      {
        label: 'Incremented',
        dataField: 'more',
      },
      {
        label: 'Halved',
        dataField: 'less',
      },
    ],
  }
}];

if (process.argv.length !== 3) throw new Error(`Usage: ${process.argv[1]} <password>`);
const password = process.argv[2];
const service = Folio.service('https://indexdata-test-okapi.folio.indexdata.com');
const session = await service.login('indexdata', 'id_admin', password);

for (const json of jsons) {
  try {
    await session.folioFetch('/settings/entries', { json });
  } catch (e) {
    if (e.status !== 403) throw e;
    // The setting already exists and must be overwritten
    await session.folioFetch(`/settings/entries/${json.id}`, { method: 'PUT', json });
  }
}

session.close();
