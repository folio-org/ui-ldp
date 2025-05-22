import * as XLSX from 'xlsx';
import exportToSpreadsheet from './exportToSpreadsheet';

const XLSX_MIMETYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export default function exportToExcel(objectArray, opts) {
  return exportToSpreadsheet(objectArray, opts, 'xlsx', 'Excel', (fields, header) => {
    console.log('fields =', fields);
    // The mapping of our option names to those of XLSX is rather confusing!
    // See https://www.npmjs.com/package/xlsx#array-of-objects-input on inclusion of unspecified fields
    const worksheet = XLSX.utils.json_to_sheet(objectArray, { header: fields, skipHeader: !header });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FOLIO Reporting export');
    const rawData = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx', compression: true });
    return new Blob([rawData], { type: XLSX_MIMETYPE });
  });
}
