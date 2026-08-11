import { createReportRepo } from './repoTypes';
import stripesFetch from './stripesFetch';
import httpErrorMessage from './httpErrorMessage';

// The directory of a repository is normalized in the same way as in
// the QueryRepo constructor, so that the tests we make here agree with
// the filtering that is done when a whole repository is harvested.
//
function normalizeDir(dir) {
  if (dir === undefined || dir === '' || dir === '/') return '.';
  return dir.replace(/\/+$/, '');
}


// A query name is `user/repo/branch/path`, where the path is relative
// to the root of the repository and has had its extension removed: see
// templatedQueryName. The name says nothing about the type of the
// repository (GitHub, GitLab, ...) nor, for GitLab, the base URL of
// the instance: those live only in the tqrepos setting, so we must
// find the configured repository that the name refers to.
//
// Several configured repositories can match, when they differ only in
// their directory: we prefer the most specific, i.e. the one with the
// longest directory. (Two configurations that differ in type cannot be
// told apart by the name alone; we take the first, which is the best
// we can do, and which serves the same file unless the repositories
// have diverged.)
//
function findRepoConfig(gitRepos, qname) {
  const parts = qname.split('/');
  const [user, repo, branch] = parts;
  const path = parts.slice(3).join('/');
  if (!path) return {};

  const candidates = (gitRepos || [])
    .filter(c => c.user === user && c.repo === repo && c.branch === branch)
    .filter(c => {
      const dir = normalizeDir(c.dir);
      return dir === '.' || path.startsWith(`${dir}/`);
    })
    .sort((a, b) => normalizeDir(b.dir).length - normalizeDir(a.dir).length);

  return { config: candidates[0], path };
}


async function fetchGitRepos(intl, stripes) {
  const res = await stripesFetch(stripes, '/settings/entries?query=(scope==ui-ldp.admin%20and%20key==tqrepos)');
  if (!res.ok) {
    throw new Error(intl.formatMessage(
      { id: 'ui-ldp.error.load-tqrepos' },
      { error: await httpErrorMessage(intl, res) },
    ));
  }
  const json = JSON.parse(await res.text());
  return (json.resultInfo.totalRecords === 0) ? [] : json.items[0].value;
}


// Reconstructs a single templated query from its name, without
// harvesting the whole of any repository, so that a report can be
// reached by following a link into a freshly loaded web-app.
//
async function resolveTemplatedQuery(intl, stripes, qname) {
  const gitRepos = await fetchGitRepos(intl, stripes);
  const { config, path } = findRepoConfig(gitRepos, qname);
  if (!config) {
    throw new Error(intl.formatMessage({ id: 'ui-ldp.error.no-such-repo' }, { qname }));
  }

  const reportRepo = createReportRepo(config);
  const filename = `${path}.sql`;
  const [sqlRes, jsonRes] = await Promise.all([
    fetch(reportRepo.rawFilePath(filename)),
    fetch(reportRepo.rawFilePath(`${path}.json`)),
  ]);

  if (sqlRes.status === 404) {
    throw new Error(intl.formatMessage({ id: 'ui-ldp.error.no-such-query' }, { qname }));
  }
  if (!sqlRes.ok) {
    throw new Error(intl.formatMessage(
      { id: 'ui-ldp.error.load-templated-query' },
      { url: reportRepo.rawFilePath(filename), error: await httpErrorMessage(intl, sqlRes) },
    ));
  }
  const text = await sqlRes.text();

  // A query with no JSON is useless, but TemplatedQuery says so more
  // helpfully than we can, so we let it through rather than failing.
  let json;
  if (jsonRes.ok) {
    const jsonText = await jsonRes.text();
    try {
      json = JSON.parse(jsonText);
    } catch (e) {
      throw new Error(intl.formatMessage(
        { id: 'ui-ldp.error.parse-templated-query-json' },
        { url: reportRepo.urlBase(`${path}.json`), error: e.toString() },
      ));
    }
  }

  return { filename, config, text, json, name: qname, state: {} };
}


export { findRepoConfig };
export default resolveTemplatedQuery;
