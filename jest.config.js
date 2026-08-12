const config = require('@folio/jest-config-stripes');

module.exports = {
  ...config,
  setupFiles: [...config.setupFiles, './test/jest/__mock__/index.js'],
  // The shared config emits only lcov, for CI. Add a summary so that a
  // local `yarn test` says how much is covered without anyone having to
  // open artifacts/coverage-jest/lcov-report/index.html.
  coverageReporters: [...config.coverageReporters, 'text-summary'],
};
