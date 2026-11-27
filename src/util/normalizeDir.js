// Normalizes the directory of a configured report repository, in the
// same way as the QueryRepo constructor in repoTypes.js and as
// normalizeDir() in mod-reporting's reporting/report-repo.go, so that
// the tests we make on directories agree with the filtering that is
// done when a whole repository is harvested, and with the checks that
// mod-reporting makes.
//
function normalizeDir(dir) {
  if (dir === undefined || dir === '' || dir === '/') return '.';
  return dir.replace(/\/+$/, '');
}

export default normalizeDir;
