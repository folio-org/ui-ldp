import { Parser } from 'json2csv';
import exportToSpreadsheet from './exportToSpreadsheet';

const CSV_MIMETYPE = 'text/csv;charset=utf-8;';

export default function exportToCsv(objectArray, opts) {
  function dataToCsv(fields, header) {
    const parser = new Parser({ fields, flatten: true, header });
    const rawData = parser.parse(objectArray);
    const blob = new Blob(['\ufeff', rawData], { type: CSV_MIMETYPE });
    return blob;
  }

  return exportToSpreadsheet(objectArray, opts, 'csv', 'CSV', dataToCsv);
}
