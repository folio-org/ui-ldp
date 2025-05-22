import * as XLSX from 'xlsx';
import exportToSpreadsheet from './exportToSpreadsheet';

const XLSX_MIMETYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export default function exportToExcel(objectArray, opts) {
  function dataToExcel(_fields, _header) {
    // XXX `_fields` is not yet used
    // XXX `_header` is not yet used
    const worksheet = XLSX.utils.json_to_sheet(objectArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FOLIO Reporting export');
    const rawData = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx', compression: true });
    const blob = new Blob([rawData], { type: XLSX_MIMETYPE });
    return blob;
  }

  return exportToSpreadsheet(objectArray, opts, 'xlsx', 'Excel', dataToExcel);
}
