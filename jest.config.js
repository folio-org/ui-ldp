const config = require('@folio/jest-config-stripes');

module.exports = {
  ...config,
  setupFiles: [...config.setupFiles, './test/jest/__mock__/index.js'],
};
