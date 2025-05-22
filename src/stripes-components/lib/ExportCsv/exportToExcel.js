import * as XLSX from 'xlsx';
import exportToSpreadsheet from './exportToSpreadsheet';

const XLSX_MIMETYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export default function exportToExcel(objectArray, opts) {
  return exportToSpreadsheet(objectArray, opts, 'xlsx', 'Excel', (_fields, _header) => {
    // XXX `_fields` and `_header` are not yet used
    const worksheet = XLSX.utils.json_to_sheet(objectArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FOLIO Reporting export');
    const rawData = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx', compression: true });
    return new Blob([rawData], { type: XLSX_MIMETYPE });
  });
}
