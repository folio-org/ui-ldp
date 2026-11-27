// Determines whether the user with the specified ID may run the report
// described by `query`, mirroring the check that mod-reporting makes in
// checkAccess() (see reporting/report-repo.go). A report may be found in
// more than one of the configured repositories -- for example when one
// is in a subdirectory of another -- and the user may run it if any of
// those repositories permits it: that is, if any has no authorized users,
// and is therefore open to all, or lists the user among its authorized
// users.

import normalizeDir from './normalizeDir';

function sameRepo(a, b) {
  const lc = s => (s || '').toLowerCase();
  const type = c => c.type || 'github';
  const base = c => (type(c) === 'gitlab' ? lc(c.baseUrl || 'https://gitlab.com').replace(/\/+$/, '') : '');
  return type(a) === type(b) &&
    base(a) === base(b) &&
    lc(a.user) === lc(b.user) &&
    lc(a.repo) === lc(b.repo) &&
    a.branch === b.branch;
}

function containsFile(repo, filename) {
  const dir = normalizeDir(repo.dir);
  return dir === '.' || filename.startsWith(dir + '/');
}

function repoPermits(repo, userId) {
  const users = repo.authorizedUsers;
  return !users || users.length === 0 || (!!userId && users.includes(userId));
}

function canRunReport(query, repos, userId) {
  // This always includes query.config, from which the report was listed,
  // unless its directory is configured in some way that defeats matching,
  // in which case mod-reporting will also fail to match it, and so will
  // refuse to run the report.
  const matching = (repos || []).filter(r => sameRepo(r, query.config) && containsFile(r, query.filename));
  return matching.some(r => repoPermits(r, userId));
}

export default canRunReport;
