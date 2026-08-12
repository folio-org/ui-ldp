// Dummy ui-ldp translations for tests.
//
// We deliberately do NOT use translations/ui-ldp/en.json here: that file
// is regenerated from the translation service, so tests that asserted on
// real English text would break whenever a translator reworded a string.
// These messages are owned by the tests and never change.
//
// Each message keeps the same placeholders as the real one, so that
// interpolation is still exercised, but the surrounding text is a fixed
// marker. Adding a message id here is how a test declares that the code
// under test is expected to use it.
//
const translations = {
  // Used by components
  'something-went-wrong': 'SOMETHING-WENT-WRONG',
  'refresh': 'REFRESH',
  'more-records': 'MORE-RECORDS',

  // Used by the utility functions that take an intl
  'error.http': 'HTTP[{status}|{text}|{detail}]',
  'error.fetch-reject': 'FETCH-REJECT[{error}]',
  'error.load-config': 'LOAD-CONFIG[{error}]',
  'error.load-tables': 'LOAD-TABLES[{error}]',
  'error.load-columns': 'LOAD-COLUMNS[{error}]',
  'error.load-results': 'LOAD-RESULTS[{error}]',
  'error.load-report': 'LOAD-REPORT[{error}]',
  'error.load-tqrepos': 'LOAD-TQREPOS[{error}]',
  'error.load-templated-query': 'LOAD-TEMPLATED-QUERY[{url}|{error}]',
  'error.load-templated-queries': 'LOAD-TEMPLATED-QUERIES[{url}|{error}]',
  'error.parse-templated-query-json': 'PARSE-TEMPLATED-QUERY-JSON[{url}|{error}]',
  'error.no-such-query': 'NO-SUCH-QUERY[{qname}]',
  'error.no-such-repo': 'NO-SUCH-REPO[{qname}]',
};

export default translations;
